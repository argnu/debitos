//jshint esnext:true

angular.module('debitos').
  factory('debitosService', function($q) {
    return {

      getDebitos: function() {
        return $q(function(resolve, reject) {
          var lista = [];
          Database.db.all(
            'SELECT * FROM debito INNER JOIN donante ON iddonante=donante.id',
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
          Database.create('BaseDebitos.db');
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
              var fvenc = debito.fvenc.getDate() +
                  "-" + debito.fvenc.getMonth() +
                  "-" + debito.fvenc.getYear();
              var falta = debito.falta.getDate() +
                  "-" + debito.falta.getMonth() +
                  "-" + debito.falta.getYear();
              var sql = " INSERT INTO debito (cbu, activo, iddonante, entidad, fvenc, falta, monto) " +
              ` VALUES ("${debito.cbu}", 1, ${this.lastID}, ` +
              `"${debito.entidad}", "${fvenc}", "${falta}", ${debito.monto}) `;
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
      }
  };
});
