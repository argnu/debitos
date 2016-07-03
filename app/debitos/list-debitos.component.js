//jshint esnext:true
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
              alert("Error");
            });
        };

        this.editDebito = function(id) {
          $location.url('/edit/' + id);
        };

        this.deleteDebito = function(id) {
          if (confirm("Esta seguro que quiere eliminar dicho débito?")) {
            var debitosAux = self.debitos.filter(x => !(x.id==id)); //jshint ignore:line
            self.debitos = debitosAux;
            debitosService.deleteDebito(id)
              .then(function(response){

              })
              .catch(function(error) {
                alert("Error");
              });
          }
        };

      }]
  });
