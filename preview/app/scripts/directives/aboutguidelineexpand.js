'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('aboutGuidelineExpand', function () {
    return {
      restrict: 'A',
      /*jshint unused: false */
      link: function(scope, element, attrs){
        $(element).click(function(event) {
          event.preventDefault();
          element.toggleClass('open');
          element.parent().parent().parent().find('.aboutexpand').slideToggle();          
        });
      }
    };
  });
