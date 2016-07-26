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
                if (self.entidad.fecha.getDate() > 10){
                  self.entidad.vencimiento = new Date((self.entidad.fecha.getFullYear()),(self.entidad.fecha.getMonth())+1,10, 0, 0,0,0);
                }
                else {
                  self.entidad.vencimiento = new Date((self.entidad.fecha.getFullYear()),(self.entidad.fecha.getMonth()),10, 0, 0,0,0);
                }

              });

            document.getElementById("upload").addEventListener('change', function () {
              var dir = this.value;
              if (dir) {
                debitosService.exportarArchivo(self.entidad)
                  .then(function() {
                      FileAPI.copyDir('app/resources/tmp/', dir)
                        .then(function () {
                            FileAPI.deleteDir('app/resources/tmp');
                            window.alert("Los archivos se han generado exitosamente!");
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                  })
                  .catch(function(error) {
                        alert(error);
                  });
              }
            });
          };

          this.generar = function() {
            document.getElementById('upload').click();
         };

      }]
  });
