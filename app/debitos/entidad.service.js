angular.
  module('debitos').
  factory('entidadService', function($http, $q) {
    return {
      getEntidad: function() {
        return $q(function(resolve, reject) {
          $http.get('datosEntidad.json').success(function(data){
            resolve(data);
          });
        });
  		}
    }
});
