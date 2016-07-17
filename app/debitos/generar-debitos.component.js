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
              FileAPI.copyDir('app/resources/tmp/', dir)
                .then(function () {
                    FileAPI.deleteDir('app/resources/tmp');
                    window.alert("Los archivos se han generado exitosamente!");
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
