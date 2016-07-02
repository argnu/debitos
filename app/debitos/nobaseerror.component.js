angular.
  module('debitos').
  component('nobaseError', {
    templateUrl: 'debitos/nobaseerror.template.html',
    controller: ['debitosService', function NoBaseErrorController(debitosService) {
      this.createDB = function() {
        debitosService.create('BaseDebitos.db');
        window.location.hash = '#/add';
      }
    }]
  });
