/* jshint esnext:true */


var Database = (function() {

  var sqlite3 = require('sqlite3').verbose();
  var fs = require('fs');

  var database = {

    db: null,

    getDB: function() {
      return database.db;
    },

    open: function(filePath) {
      return new Promise(function(resolve, reject) {
        fs.exists(filePath, (exists) => {
          if (exists) {
            database.db = new sqlite3.Database(filePath);
            resolve(database.db);
          }
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
        "entidad TEXT, fvenc REAL, falta REAL, monto REAL, " +
        " FOREIGN KEY(iddonante) REFERENCES donante(id))");
    },

    close: function() {
      if (database.db)
        database.db.close();
    }
  };

  return database;

}());
