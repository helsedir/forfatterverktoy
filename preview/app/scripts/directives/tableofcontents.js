'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:tableOfContents
 * @description
 * # tableOfContents
 */
angular.module('guidelinePreviewApp')
.directive('tableOfContents', function(){
    return {
        restrict:'A',
        link : function(scope, elm, attrs) {
            function updateHeadlines() {
                scope.headlines=[];
                angular.forEach(elm[0].querySelectorAll('h1,h2,h3,h4,h5,h6'), function(e){
                    scope.headlines.push({ 
                        level: e.tagName[1], 
                        label: angular.element(e).text(),
                        element: e
                    });
                });
            }
            // avoid memoryleaks from dom references
            scope.$on('$destroy',function(){
                scope.headlines=[];
            });
            // scroll to one of the headlines
            scope.scrollTo=function(headline){
                headline.element.scrollIntoView();
            }
            // when the html updates whe update the headlines
            scope.$watch(elm, function (){
            	updateHeadlines();
            })
            
        }
    }
})