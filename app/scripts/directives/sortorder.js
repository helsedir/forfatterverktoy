'use strict';

/**
 * @ngdoc directive
 * @name webUiApp.directive:sortOrder
 * @description
 * # sortOrder
 */

angular.module('webUiApp')
  .directive('sortOrder', function () {
    return {
      template: '<button type="button" class="btn btn-default" ng-click="editOrderBtnClick()">Rediger rekkefølgen</button>',
      restrict: 'A',
      replace: true
      
    };
  });
