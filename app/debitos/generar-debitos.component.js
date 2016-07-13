angular.
  module('debitos').
  component('generarDebitos', {
      templateUrl: 'debitos/generar-debitos.template.html',
      controller: ['debitosService', 'entidadService',
        function GenerarDebitosController(debitosService, entidadService) {
          var self = this;

          this.$onInit = function() {
            entidadService.getEntidad()
              .then(function(response){
                self.entidad = response;
                self.entidad.fecha = new Date(Date.now());
                console.log(self.entidad);
              })
          };

          this.generar = function() {
            debitosService.exportarArchivo(self.entidad)
              .then(function() {

                    alert("El archivo se ha generado exitosamente!");
                  })
              .catch(function(error) {
                    alert(error);
                 });
            /*
           var ncuit= cuit.value.replace(/-/g,"");
           debitosService.getDebitos()
            .then(function(result) {
                debitosService.exportarArchivo(self.entidad,)
                  .then(function(response) {
                        alert("El archivo se ha generado exitosamente!");
                      })
                  .catch(function(error) {
                        alert(error);
                     });
            })
            .catch(function(error) {
              alert("Error");
            });
            */




         };

      }]
  });
