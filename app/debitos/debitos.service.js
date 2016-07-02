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
              resolve(rows)
            }
          );
        });
      },

      create: function(path) {
          Database.create('BaseDebitos.db');
      },

      addDebito: function (debito) {
        return $q(function(resolve, reject) {
          var sql = " INSERT INTO donante (nombre, apellido, cuil) " +
            ` VALUES ("${debito.nombre}", "${debito.apellido}", "${debito.cuil}") `;
          Database.db.run(sql, [], function(error) {
            if (error) {
              reject(error);
              return;
            }
            else {
              var fvenc = debito.fvenc.getDate() +
                  "-" + debito.fvenc.getMonth() +
                  "-" + debito.fvenc.getYear();
              var sql = " INSERT INTO debito (cbu, activo, iddonante, entidad, fvenc) " +
              ` VALUES ("${debito.cbu}", 1, ${this.lastID}, "${debito.entidad}", "${fvenc}") `;
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
  }
});
