// Define the `phonecatApp` module
var debitoApp = angular.module('debitoApp', [
  'ngRoute', 'debitos'],
  function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):|data:image\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
});
