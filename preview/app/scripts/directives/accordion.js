'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:aboutSection
 * @description
 * # aboutSection
 */
angular.module('guidelinePreviewApp')
  .directive('accordions', function () {
    return {
      restrict: 'A',
      /*jshint unused: false */
      link: function(scope, element, attrs){

      	element.find('.explainingtext').hide();

      	var slider = function(accordion, areaToExpand) {
      	  if(accordion.hasClass('open')){
      		  areaToExpand.slideUp('fast', function () {
      			  areaToExpand.addClass('visuallyhidden').slideDown(0);
      		  });
      		  accordion.removeClass('open');
      		  accordion.addClass('closed');
      	  } else {
      		  areaToExpand.slideUp(0, function () {
      			  areaToExpand.removeClass('visuallyhidden').slideDown(500);
      		  });
      		  accordion.removeClass('closed');
      		  accordion.addClass('open');
      	  }
      	};

      	var clickHandler = function (){
      		element.find('header').toggleClass('gradingBlank');
      		element.closest('section').toggleClass('open');
      		element.find('h2').toggleClass('clicked');
      		var wrapper = element.find(".recommendationheader");
      		slider(wrapper, wrapper.siblings('.recommendationcontent, .background_information, .button-close'));
      	};

      	element.find('h2').bind('click', clickHandler);
      	element.find('.button-close').bind('click', clickHandler);
        element.find('.button-close').click(function(event) {
          event.preventDefault();
        });
      }
    };
  });
