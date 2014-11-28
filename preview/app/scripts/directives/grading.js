'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:grading
 * @description
 * # grading
 */
angular.module('guidelinePreviewApp') 
.directive('grading', function() {
    return{
        restrict: 'A',
        
        link: function (scope, element, attrs) {
            attrs.$observe('grading', function(grading) {
                if (grading == "strong"){
                    element.addClass("gradingStrong");
                    element.removeClass("gradingWeak");
                    element.removeClass("gradingNone");
                }
                else if (grading == "weak"){
                    element.addClass("gradingWeak");
                    element.removeClass("gradingNone");
                    element.removeClass("gradingStrong");
                }
                else if (grading == "null"){
                    element.addClass("gradingNone");
                    element.removeClass("gradingWeak");
                    element.removeClass("gradingStrong");
                }
                else if (grading == null){
                    element.addClass("gradingNone");
                    element.removeClass("gradingWeak");
                    element.removeClass("gradingStrong");
                }
                else {
                    element.addClass("gradingNone");
                    element.removeClass("gradingWeak");
                    element.removeClass("gradingStrong");
                }
            });
        }
    };
});

      