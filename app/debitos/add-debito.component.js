angular.
  module('debitos').
  component('addDebito', {
    templateUrl: 'debitos/add-debito.template.html',
    controller: ['debitosService', function AddDebitoController(debitosService) {
      var self = this;


      this.$onInit = function() {
        self.iniciarDebito();
        self.title = 'Agregar Débito';
        self.confirm = false;
      };

      this.iniciarDebito = function () {
        self.debito = {
          nombre: '',
          apellido: '',

          cuil: '',
          direccion: '',
          entidad: '',
          cbu: '',
          fvenc: '',
          falta: '',
          monto: ''
        };
      };

      this.submitForm = function(isValid) {
        self.submitted = true;
        if (isValid)
          self.confirm = true;
      };

      this.confirmar = function() {
        debitosService.addDebito(self.debito)
          .then(function(response) {
            alert("El débito directo se ha agregado exitosamente!");
            self.iniciarDebito();
            self.submitted = false;
            self.confirm = false;
          })
          .catch(function(error) {
            alert(error);
          });
      };

    }]
  });
