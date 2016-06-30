angular.
  module('debitos').
  component('addDebito', {
    templateUrl: 'debitos/add-debito.template.html',
    controller: function AddDebitoController() {
      var self = this;

      this.debito = {
        nombre: '',
        apellido: ''
      };

      this.submitForm = function(isValid) {
        self.submitted = true;
        if (isValid) {
          alert('our form is amazing');
        }
      };

    }
  });
