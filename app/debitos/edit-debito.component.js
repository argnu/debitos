angular.
  module('debitos').
  component('editDebito', {
    templateUrl: 'debitos/add-debito.template.html',
    controller: ['debitosService', '$routeParams',
      function EditDebitoController(debitosService, $routeParams) {
      var self = this;

      this.$onInit = function () {
        debitosService.getDebito($routeParams.id)
          .then(function(debito) {
            debito.fvenc = Date.parse(debito.fvenc);
            debito.cuil = parseInt(debito.cuil);
            debito.cbu = parseInt(debito.cbu);
            console.log(debito);
            self.debito = debito;
          })
          .catch(function(error) {
            console.log(error);
          });

        self.title = "Modificar Débito";

      };
    }]
  });
