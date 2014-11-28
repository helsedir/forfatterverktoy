'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('responsiveTabs', function () {
    return {
      restrict: 'A',
      /*jshint unused: false */
      link: function(scope, element, attrs){
        var options = {
          type: 'default',
          width: 'auto',
          fit: 'true',
          closed: true,
          slideSpeed: 200
        };
        
        var changeFunction = function(){
          element.easyResponsiveTabs({
       type: 'default', //Types: default, vertical, accordion           
       closed: true,// Start closed if in accordion view
       slideSpeed: 200,
       activate: function(event) { // Callback function if tab is switched  
        $(this).closest("ul").addClass("open");
        }
   });

        };
        scope.$watch(element, changeFunction);
      }
    };
  });
