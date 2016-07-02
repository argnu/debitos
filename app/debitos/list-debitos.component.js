angular.
  module('debitos').
  component('listDebitos', {
      templateUrl: 'debitos/list-debitos.template.html',
      controller: ['debitosService', '$location',
        function ListDebitosController(debitosService, $location) {
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
          $location.url('/edit/' + id);
        };

      }]
  });
