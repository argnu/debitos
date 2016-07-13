angular.
  module('debitos').
  component('editDebito', {
    templateUrl: 'debitos/add-debito.template.html',
    controller: ['debitosService', '$routeParams', '$location',
      function EditDebitoController(debitosService, $routeParams, $location) {
      var self = this;

      this.$onInit = function () {
        debitosService.getDebito($routeParams.id)
          .then(function(debito) {
            debito.fvenc = new Date(debito.fvenc);
            debito.falta = new Date(debito.falta);
            debito.cuil = parseInt(debito.cuil);
            debito.cbu = parseInt(debito.cbu);
            self.debito = debito;
          })
          .catch(function(error) {
            console.log(error);
          });

        self.title = "Modificar Débito";
        self.confirm = false;
        self.noBanco = false;
      };

      this.changeEntidad = function () {
        if (self.debito.cbu && self.debito.cbu.length>2) {
          if (self.bancos[self.debito.cbu.substring(0,3)]) {
            self.debito.entidad = self.bancos[self.debito.cbu];
            self.noBanco = false;
          }
          else {
            self.noBanco = true;
          }
        }
        else {
          self.debito.entidad = '';
          self.noBanco = false;
        }
      };      

      this.submitForm = function(isValid) {
        self.submitted = true;
        if (isValid && !self.noBanco)
          self.confirm = true;
      };

      this.confirm = function() {
        debitosService.updateDebito(self.debito)
          .then(function(response) {
            alert("El débito directo se ha modificado exitosamente!");
            $location.url('/list');
          })
          .catch(function(error) {
            alert(error);
          });
      };


    }]
  });
