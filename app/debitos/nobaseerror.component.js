angular.
  module('debitos').
  component('nobaseError', {
    templateUrl: 'debitos/nobaseerror.template.html',
    controller: ['debitosService', '$location',
      function NoBaseErrorController(debitosService, $location) {
        var self = this;

        this.$onInit = function () {
          self.import = false;
          self.file = "";
        };

        this.createDB = function() {
          debitosService.create('BaseDebitos.db');
          $location.url('');
        };

        this.importDB = function() {
          self.import = true;
        };

        this.importFile = function (file) {
          debitosService.importDB(file)
            .then(function() {
              Database.open('app/BaseDebitos.db')
                .then(function(db) {
                  Database.db = db;
                  window.location.hash="#/add";
                })
                .catch(function() {
                  console.log('No abrio la nueva');
                });
            })
            .catch(function() {

            });
        };
    }]
  });
