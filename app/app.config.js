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
        when('/edit', {
          template: '<edit-debito></edit-debito>'
        }).
        when('/export', {
          template: '<export-debitos></export-debitos>'
        }).
        when('/nobaseerror', {
          template: '<nobase-error></nobase-error>'
        }).
        otherwise('/add');
    }
  ]);
