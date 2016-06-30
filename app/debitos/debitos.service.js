angular.module('debitos').
  factory('debitosBD', function($q) {
    return {

      getDebitos: function() {
        return $q(function(resolve, reject) {
          var lista = [];
          Database.db.all(
            'SELECT * FROM debito INNER JOIN donante ON iddonante=donante.id',
            function (err, rows) {
              if (err) {console.log("Error en obtener los debitos"); reject(err);}
              lista = rows.map(function(elem) {
                return elem.id;
              });
              resolve(lista)
            }
          );
        });
      },

    create: function(path) {
        Database.create('BaseDebitos.db');
    }
  }
});
