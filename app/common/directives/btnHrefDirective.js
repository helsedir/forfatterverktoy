'use strict';
angular.module('webUiApp')
.directive( 'btnHref', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'btnHref', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
});