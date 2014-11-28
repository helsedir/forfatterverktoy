'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('explanationClick', function () {
    return {
      restrict: 'A',
      /*jshint unused: false */
      link: function(scope, element, attrs){
      	var clickHandler = function (){
          var animationSpeed= 300;
          element.find('.explainingtext').slideToggle(animationSpeed);
          element.toggleClass('open');
          element.find('i').toggleClass('open');

          var height = element.find("p").first();
          if(height.hasClass("ng-hide")){
            height = height.next();
        }
          height = height[0].scrollHeight;

          var pulse = element.parent().find(".pulse");
          if(pulse.hasClass("closed")){
            pulse.animate({"top" : height+50+"px"}, animationSpeed);
            pulse.removeClass("closed");
          }
          else{
            pulse.animate({"top" : "40px"}, animationSpeed);
            pulse.addClass("closed");
          }

        };
        element.bind('click', clickHandler);
      }
    };
  });
