'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('responsiveTable', function () {
    return {
      restrict: 'EA',
      /*jshint unused: false */
      link: function(scope, element, attrs){
        //console.log(scope.recommendation);
        var breakAt = attrs.responsiveTable;

        var watchFunction = function () {
          var tables = $(element).find('table');
          console.log($(element).find('table'));
          angular.forEach(tables, function(table, index) { //Loop through all tables in element
            console.log('index: '+ index);

            var headers = [];
            console.log($(table).width());
            if($(table).width() > breakAt) {
              $(table).addClass('breakTable');
            }
            //console.log($(table).css('width'));
            var rows = $(table).find('tr');
            angular.forEach(rows, function (element, yindex) {
              var cols;
              if (yindex == 0 && $(element).find('th').length > 0) {
                cols = $(element).find('th'); //If th is used
              }
              else {
                cols = $(element).find('td');
              }

              angular.forEach(cols, function (element, xindex) {
                if (yindex == 0) {
                  headers.push($(element).text()); //If we are at the first row of the table
                }
                else {
                  $(element).attr('data-th', headers[xindex]);
                  console.log(element);
                }
              });
            });

          });
        };
        scope.$watch(element, watchFunction);
      }
    };
  });
