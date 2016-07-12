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
    }

  };

});
