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
              });

            document.getElementById("upload").addEventListener('change', function () {
              var dir = this.value;
              FileAPI.import('app/resources/tmp/archivo1', dir + '/archivo1')
                .then(function () {
                    FileAPI.import('app/resources/tmp/archivo2', dir + '/archivo2')
                      .then(function () {
                        FileAPI.delete('app/resources/tmp/archivo1');
                        FileAPI.delete('app/resources/tmp/archivo2');
                        window.alert("Los archivos se han generado exitosamente!");
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          };

          this.generar = function() {
            debitosService.exportarArchivo(self.entidad)
              .then(function() {
                      document.getElementById('upload').click();
                  })
              .catch(function(error) {
                    alert(error);
                 });

         };

      }]
  });
