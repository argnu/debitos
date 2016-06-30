angular.
  module('debitos').
  component('listDebitos', {
      templateUrl: 'debitos/list-debitos.template.html',
      controller: ['debitosBD', function ListDebitosController(debitosBD) {
        var self = this;

        this.$onInit = function() {
          debitosBD.getDebitos()
            .then(function(result) {
              self.debitos = result;
            })
            .catch(function(error) {
              console.log(error);
            });
        };

        this.contador = 0;

        this.sumar = function (param) {
          var param = (+param);
          if (param)
            self.contador = self.contador + param ;
          else
            self.error = "Te equivocaste!!!"
        }
      }]
  });
