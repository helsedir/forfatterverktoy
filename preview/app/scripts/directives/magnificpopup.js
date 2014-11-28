'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('magnificPopup', function () {
    return {
      restrict: 'A',
      /*jshint unused: false */
      link: function(scope, element, attrs){

       element.magnificPopup({
        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        closeBtnInside: false
       });
       
      }
    };
  });
