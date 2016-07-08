angular.
  module('debitos').
  component('generarDebitos', {
      templateUrl: 'debitos/generar-debitos.template.html',
      controller: ['debitosService',
        function GenerarDebitosController(debitosService) {
          var self = this;

          this.$onInit = function() {

          };

      }]
  });
