//jshint esnext:true

angular.module('debitos').
  factory('debitosService', function($q) {
    return {

      getDebitos: function() {
        return $q(function(resolve, reject) {
          var lista = [];
          var sql = 'SELECT nombre,apellido,direccion,cuil,iddonante, ' +
                    ' debito.id as iddebito,cbu,activo,entidad,fvenc,falta,monto ' +
                    ' FROM debito INNER JOIN donante ON iddonante=donante.id ' +
                    ' WHERE activo=1';
          Database.db.all(
            sql,
            function (err, rows) {
              if (err) {console.log("Error en obtener los debitos"); reject(err);}
              resolve(rows);
            }
          );
        });
      },

      getDebito: function(id) {
        return $q(function(resolve, reject) {
          var sql = 'SELECT nombre,apellido,direccion,cuil,iddonante ' +
                    ',debito.id as iddebito,cbu,activo,entidad,fvenc,falta,monto ' +
                    ' FROM debito INNER JOIN donante ON iddonante=donante.id ' +
                    ` WHERE activo=1 AND debito.id=${id} `;
          Database.db.get(sql,
            function (err, row) {
              if (err) {console.log("Error en obtener los debitos"); reject(err);}
              resolve(row);
            }
          );
        });
      },

      create: function(path) {
          Database.create('app/BaseDebitos.db');
      },

      addDebito: function (debito) {
        return $q(function(resolve, reject) {
          var sql = " INSERT INTO donante (nombre, apellido, cuil, direccion) " +
            ` VALUES ("${debito.nombre}", "${debito.apellido}", "${debito.cuil}", "${debito.direccion}") `;
          Database.db.run(sql, [], function(error) {
            if (error) {
              reject(error);
              return;
            }
            else {
              var sql = " INSERT INTO debito (cbu, activo, iddonante, entidad, fvenc, falta, monto) " +
              ` VALUES ("${debito.cbu}", 1, ${this.lastID}, "${debito.entidad}", ` +
              ` ${debito.fvenc.valueOf()}, ${debito.falta.valueOf()}, ${debito.monto}) `;
              Database.db.run(sql, [], function(error) {
                if (error) {
                  reject(error);
                  return;
                }
                else {
                  resolve(this.lastID);
                }
              });
            }
          });

        });
      },

      updateDebito: function(debito) {
        return $q(function(resolve, reject) {
          var sql = " UPDATE donante SET " +
          ` nombre="${debito.nombre}", apellido="${debito.apellido}", ` +
          ` cuil="${debito.cuil}", direccion="${debito.direccion}" ` +
          ` WHERE id=${debito.iddonante}`;
          Database.db.run(sql, [], function(error) {
            if (error) {
              reject(error);
              return;
            }
            else {
              var sql = " UPDATE debito SET " +
              ` cbu="${debito.cbu}", entidad="${debito.entidad}", ` +
              ` fvenc=${debito.fvenc.valueOf()}, falta=${debito.falta.valueOf()}, monto=${debito.monto} ` +
              ` WHERE id=${debito.iddebito}`;
              console.log(sql);
              Database.db.run(sql, [], function(error) {
                if (error) {
                  reject(error);
                  return;
                }
                else {
                  resolve(this.lastID);
                }
              });
            }
          });
        });
      },

      deleteDebito: function (id) {
        return $q(function(resolve, reject) {
          var sql = `UPDATE debito SET activo=0 WHERE id=${id}`;
          Database.db.run(sql, [], function(error) {
            if (error) {
              reject(error);
              return;
            }
            resolve(this.lastID);
        });
      });
    },

    importDB: function (src) {
      return $q(function(resolve, reject) {
        FileAPI.import(src, 'app/BaseDebitos.db')
          .then(function() {
            resolve();
          })
          .catch(function() {
            reject();
          });
      });
    },

    exportarArchivo: function (entidad) {
      var self = this;
      return $q(function(resolve,reject) {
        self.getDebitos()
          .then(function(listadebitos) {

            var inicial = "D"+entidad.cuit.replace(/-/g,"")+"   "+" ".repeat(10-(entidad.prestacion.length))+entidad.prestacion,
                importeTotalBPN = 0,
                importeTotalOtros = 0,
                cantRegBPN = 0,
                cantRegOtros = 0,
                fechaProceso = moment(new Date(entidad.fecha)),
                nombreArchivo = 'app/resources/tmp/' + 'ORI' + fechaProceso.format('DDMMYYYY'),
                fecha = moment(new Date(entidad.vencimiento)),
                fechaVto= fecha.format('DDMMYYYY');

            //Se crean los dos archivos
            FileAPI.create(nombreArchivo + '1'); //Archivo BPN
            FileAPI.create(nombreArchivo + '2'); //Archivo Otras entidades

            for(var i=0,l;i< listadebitos.length;i++)  {
           console.log(listadebitos[i]);
              var
                  cbubloque1 = listadebitos[i].cbu.substring(0,8),
                  cbubloque2 = listadebitos[i].cbu.substring(8,22),
                  doc = listadebitos[i].cuil.replace(/-/g,""),
                  idCliente = " ".repeat(22-(doc.length)) + doc,
                  idDebito = listadebitos[i].iddebito.toString(),
                  refdebito = " ".repeat(15-(idDebito.length)) + idDebito,
                  importe = parseFloat(listadebitos[i].monto).toFixed(2),
                  importeStr = ((importe.toString().replace(".",'')).replace(",",'')),
                  importeDebito = ("0".repeat(10-(importeStr.length))) + importeStr,
                  campo13 = "80",
                  campo19 = "   ", // Código de rechazo de tabla de BCRA
                  campoFinal =  " ".repeat(22) + campo19 + "0".repeat(10) + "0".repeat(10) + " ".repeat(54);

              var linea = inicial + fechaVto + cbubloque1 + "000" + cbubloque2 + idCliente + fechaVto +
                         refdebito + importeDebito + campo13 + fechaVto + importeDebito + fechaVto +
                         importeDebito + campoFinal + "\n";

              if (listadebitos[i].cbu.substring(0,3) == "097") {
                   //Se trata de un debito del BPN
                   console.log(listadebitos[i].cbu.substring(0,3));
                   cantRegBPN= cantRegBPN + 1;
                   importeTotalBPN = importeTotalBPN + importe;
                   //Escribo la línea en el archivo correspondiente del BPN
                   FileAPI.append(nombreArchivo + '1', linea);
              }
              else {
                  cantRegOtros = cantRegOtros +1;
                  importeTotalOtros = importeTotalOtros + importe;
                  //Escribo la línea en el archivo correspondiente
                  FileAPI.append(nombreArchivo + '2', linea);
              }


            }

            var trailer = "",
                cantRegStr = "",
                totalImporteStr;

                if (cantRegBPN>0){
                  //Se escribe el trailer para el archivo BPN
                    cantRegStr = parseInt(cantRegBPN).toString();
                    totalImporteStr = parseFloat(importeTotalBPN).toFixed(2);
                    totalImporteStr = ((totalImporteStr.toString().replace(".",'')).replace(",",''));
                    trailer = "T" + (("0".repeat(10-(cantRegStr.length))) + cantRegStr) +
                              (("0".repeat(7-(cantRegStr.length))) + cantRegStr) +  "0".repeat(7) +
                              fechaProceso.format('DDMMYYYY') + " ".repeat(70) +
                              (("0".repeat(10-(totalImporteStr.length))) + totalImporteStr) +
                              " ".repeat(137) + "\n";

                    FileAPI.append(nombreArchivo + '1', trailer);
                }

                if (cantRegOtros>0){
                  //Se escribe el trailer para el archivo de otra entidad
                  cantRegStr = parseInt(cantRegOtros).toString();
                  totalImporteStr = parseFloat(importeTotalOtros).toFixed(2);
                  totalImporteStr = ((totalImporteStr.toString().replace(".",'')).replace(",",''));
                  trailer = "T" + (("0".repeat(10-(cantRegStr.length))) + cantRegStr) +
                            (("0".repeat(7-(cantRegStr.length))) + cantRegStr) +  "0".repeat(7) +
                            fechaProceso.format('DDMMYYYY') + " ".repeat(70) +
                            (("0".repeat(10-(totalImporteStr.length))) + totalImporteStr) +
                            " ".repeat(137) + "\n" ;

                  FileAPI.append(nombreArchivo + '2', trailer);

                }



            resolve();
          })
          .catch(function(error) {
            reject(error);
          });
      });

    }

  };

});
