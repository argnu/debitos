angular.
  module('debitos').
  component('exportDebitos', {
      templateUrl: 'debitos/export-debitos.template.html',
      controller: ['debitosBD', function ListDebitosController(debitosBD) {
        var self = this;

        this.$onInit = function() {

        };

      }]
  });
