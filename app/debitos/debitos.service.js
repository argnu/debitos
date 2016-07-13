//jshint esnext:true

angular.module('debitos').
  factory('debitosService', function($q) {
    return {

      getDebitos: function() {
        return $q(function(resolve, reject) {
          var lista = [];
          Database.db.all(
            'SELECT * FROM debito INNER JOIN donante ON iddonante=donante.id WHERE debito.activo=1',
            function (err, rows) {
              if (err) {console.log("Error en obtener los debitos"); reject(err);}
              resolve(rows);
            }
          );
        });
      },

      getDebito: function(id) {
        return $q(function(resolve, reject) {
          var sql = 'SELECT * FROM debito INNER JOIN donante ON iddonante=donante.id' +
                    ` AND debito.id=${id} `;
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
              ` "${debito.fvenc}", "${debito.falta}", ${debito.monto}) `;
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
          `nombre="${debito.nombre}", apellido="${debito.apellido}", ` +
          `cuil="${debito.cuil}", direccion="${debito.direccion}"`;
          Database.db.run(sql, [], function(error) {
            if (error) {
              reject(error);
              return;
            }
            else {
              var sql = " UPDATE debito SET " +
              `cbu="${debito.cbu}", entidad="${debito.entidad}", ` +
              `fvenc="${debito.fvenc}", falta="${debito.falta}", monto="${debito.monto}"`;
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

            var inicial="D"+cuit+"   "+" ".repeat(10-(prestacion.length))+prestacion,
                importeTotal=0;

            for(var i=0,l;i< listadebitos.length;i++)  {
              var fecha = moment(new Date(listadebitos[i].fvenc));
              var fechaVto= fecha.format('DDMMYYYY');
              var cbubloque1 = listadebitos[i].cbu.substring(0,7);
              var doc = listadebitos[i].cuil.replace("-","");
              var idCliente = " ".repeat(22-(doc.length)) + doc ;
              var idDebito = (new String(listadebitos[i].id));
              var refdebito = " ".repeat(15-(idDebito.length))+idDebito;
              var importe = parseFloat(listadebitos[i].monto).toFixed(2);
              var importeStr = ((importe.toString().replace(".",'')).replace(",",''));
              var campo12 = ("0".repeat(10-(importeStr.length))) + importeStr;
              console.log(campo12);

            }


            resolve();
          })
          .catch(function(error) {
            reject(error);
          });
      });

      /*
      //Se genera el buffer
      //Se escribe el buffer en el archivo
      return $q(function(resolve, reject) {
      //Se obtienen los datos generales
      var blanco=" ";

      var inicial="D"+cuit+"   "+blanco.repeat(10-(prestacion.length))+prestacion;
      var importeTotal=0;
      console.log(inicial);
      //Se recorre cada uno de los débitos para formar una línea del archivo
      for(var i=0,l;i< listaDebitos.length;i++)
      {
           console.log(listaDebitos[i].fvenc);

      }
      resolve();


    });*/

    }

  };

});
