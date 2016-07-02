angular.
  module('debitos').
  component('exportDebitos', {
      templateUrl: 'debitos/export-debitos.template.html',
      controller: ['debitosService', function ListDebitosController(debitosService) {
        var self = this;

        this.$onInit = function() {

        };

      }]
  });
