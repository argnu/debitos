angular.
  module('debitos').
  component('addDebito', {
    templateUrl: 'debitos/add-debito.template.html',
    controller: ['debitosService', 'entidadService',
      function AddDebitoController(debitosService, entidadService) {

      var self = this;


      this.$onInit = function() {
        self.iniciarDebito();
        self.title = 'Agregar Débito';
        self.confirm = false;
        self.entidad = '';
        self.noBanco = false;
        entidadService.getBancosCBU()
          .then(function(bancos) {
            self.bancos = bancos;
          })
          .catch(function(error) {
            console.log(error);
          });
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

      this.changeEntidad = function () {
        if (self.debito.cbu && self.debito.cbu.length>2) {
          if (self.bancos[self.debito.cbu.substring(0,3)]) {
            self.debito.entidad = self.bancos[self.debito.cbu.substring(0,3)];
            self.noBanco = false;
          }
          else {
            self.noBanco = true;
          }
        }
        else {
          self.debito.entidad = '';
          self.noBanco = false;
        }
      };

      this.submitForm = function(isValid) {
        self.submitted = true;
        if (isValid && !self.noBanco)
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
