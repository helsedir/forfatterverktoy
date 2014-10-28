'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:deleteAuthorBtn
 * @description
 * # deleteAuthorBtn
 */
angular.module('webUiApp')
  .directive('deleteAuthorBtn', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the deleteAuthorBtn directive');
      }
    };
  });
