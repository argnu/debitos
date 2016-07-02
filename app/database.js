/* jshint esnext:true */


var Database = (function() {

  var sqlite3 = require('sqlite3').verbose();
  var fs = require('fs');

  var database = {

    db: null,

    open: function(filePath) {
      return new Promise(function(resolve, reject) {
        fs.exists(filePath, (exists) => {
          if (exists)
            resolve(new sqlite3.Database(filePath));
          else
            reject("No existe la base");
        });
      });
    },

    create: function(filePath) {
        database.db = new sqlite3.Database(filePath);
        database.db.run("CREATE TABLE donante (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "nombre TEXT, apellido TEXT, cuil TEXT, direccion TEXT)");
        database.db.run("CREATE TABLE debito (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "cbu TEXT, activo BOOLEAN, iddonante INTEGER," +
        "entidad TEXT, fvenc TEXT, falta TEXT, monto REAL" +
        "FOREIGN KEY(iddonante) REFERENCES donante(id))");
    }
  };

  return database;

}());
