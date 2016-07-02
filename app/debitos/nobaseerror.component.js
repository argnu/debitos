angular.
  module('debitos').
  component('nobaseError', {
    templateUrl: 'debitos/nobaseerror.template.html',
    controller: ['debitosService', '$location',
      function NoBaseErrorController(debitosService, $location) {
      this.createDB = function() {
        debitosService.create('BaseDebitos.db');
        $location.url('');
      };
    }]
  });
