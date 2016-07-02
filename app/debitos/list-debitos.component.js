angular.
  module('debitos').
  component('listDebitos', {
      templateUrl: 'debitos/list-debitos.template.html',
      controller: ['debitosService', function ListDebitosController(debitosService) {
        var self = this;

        this.$onInit = function() {
          debitosService.getDebitos()
            .then(function(result) {
              self.debitos = result;
            })
            .catch(function(error) {
              console.log(error);
            });
        };

        this.editDebito = function(id) {
          window.location.hash = `#/edit/${id}`;  //jshint ignore:line
        };

      }]
  });
