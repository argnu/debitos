angular.module('debitoApp')
.directive('bsActiveLink', ['$location', function ($location) {
return {
    restrict: 'A', //use as attribute
    replace: false,
    link: function (scope, elem) {
        //after the route has changed
        scope.$on("$routeChangeSuccess", function () {
            var hrefs = ['/#' + $location.path(),
                         '#' + $location.path(), //html5: false
                         $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                if (-1 !== hrefs.indexOf(a.attr('href'))) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');
                }
            });
        });
    }
};
}]);

angular.module('debitoApp')
.directive('menuActive', ['$location', function ($location) {
return {
    restrict: 'A', //use as attribute
    replace: false,
    link: function (scope, elem) {
        //after the route has changed
        scope.$on("$routeChangeSuccess", function () {
          if ($location.path()=="/nobaseerror") {
            elem.addClass('hide');
          }
          else {
            elem.removeClass('hide');
          }
        });
    }
};
}]);

var INTEGER_REGEXP = /^\-?\d+$/;
angular.module('debitoApp')
.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
