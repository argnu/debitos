angular.
  module('debitos').
  component('nobaseError', {
    templateUrl: 'debitos/nobaseerror.template.html',
    controller: ['debitosBD', function NoBaseErrorController(debitosBD) {
      this.createDB = function() {
        debitosBD.create('BaseDebitos.db');
        window.location.hash = '#/add';
      }
    }]
  });
