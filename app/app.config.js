angular.
  module('debitoApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider.
        when('/add', {
          template: '<add-debito></add-debito>'
        }).
        when('/list', {
          template: '<list-debitos></list-debitos>'
        }).
        when('/edit/:id', {
          template: '<edit-debito></edit-debito>'
        }).
        when('/generar', {
          template: '<generar-debitos></generar-debitos>'
        }).
        when('/nobaseerror', {
          template: '<nobase-error></nobase-error>'
        }).
        otherwise('/add');
    }
  ]);
