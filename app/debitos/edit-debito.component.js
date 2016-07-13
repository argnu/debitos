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
      };

      this.submitForm = function(isValid) {
        self.submitted = true;
        if (isValid)
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
