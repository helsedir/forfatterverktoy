$(runJqueryUIStuff());
$(runJqueryUIRecommendationStuff());

function runJqueryUIRecommendationStuff(){
	$(function () {
	    //creates collapsible headings. The tag wrapping this class will get an angle icon
	    $(".accordion h2, .accordion h3, .accordion h4, .accordion h5").each(function () {
	        var collapseElement = $(this);
	        var contentToHide = collapseElement.next();
	        var parentTag = collapseElement.parent();
	        contentToHide.addClass(' visuallyhidden');
	        parentTag.addClass(' has-hidden-content');
	    });

	    //handles click events on collapsible headings
	    $(".accordion h2, .accordion h3, .accordion h4, .accordion h5").click(function () {
	        var collapseElement = $(this);
	        var contentToHide = collapseElement.next();
	        var parentTag = collapseElement.parent();

	        if (!contentToHide.hasClass("visuallyhidden")) {
	            contentToHide.slideUp('fast', function () {
	                contentToHide.addClass('visuallyhidden')
	                    .slideDown(0);
	            });
	            parentTag.removeClass("has-visible-content");
	            parentTag.addClass("has-hidden-content");
	        } else {
	            contentToHide.slideUp(0, function () {
	                contentToHide.removeClass('visuallyhidden')
	                    .slideDown(500);
	            });
	            parentTag.addClass("has-visible-content");
	            parentTag.removeClass("has-hidden-content");

	        }
	    });

	    //creates collapsible headings based on screen size
	    $(window).on('load resize', function () {
	        var windowWidth = $(window).width();

	        if (windowWidth <= 599) {
	            $(".accordion_mobile h2").each(function () {
	                var $collapseElement = $(this);
	                var $contentToHide = $collapseElement.next();
	                var $parentTag = $collapseElement.parent();
	                if (!$contentToHide.hasClass('visuallyhidden') && !$parentTag.hasClass('has-visible-content') && !$parentTag.is('a')) {
	                    $contentToHide.addClass(' visuallyhidden');
	                    $parentTag.addClass(' has-hidden-content');
	                }
	            });
	            //stretch search field in header to window width on mobile screens
	            $('#mainsearch').css('width', windowWidth);
	        } else {
	            $(".accordion_mobile h2").each(function () {
	                var $collapseElement = $(this);
	                var $contentToHide = $collapseElement.next();
	                var $parentTag = $collapseElement.parent();
	                if (($contentToHide.hasClass('visuallyhidden') || $parentTag.hasClass('has-hidden-content')) && !$collapseElement.hasClass('accordion') && !$parentTag.is('a')) {
	                    $contentToHide.removeClass('visuallyhidden');
	                    $parentTag.removeClass('has-hidden-content');
	                } else if ($parentTag.hasClass('has-visible-content')) {
	                    $parentTag.removeClass('has-visible-content');
	                }
	            });
	        }
	    });
	    //handles click events on collapsible mobile headings
	    $(".accordion_mobile h2").click(function () {
	        var windowWidth = $(window).width();

	        if (windowWidth <= 599) {
	            var $header = $(this);
	            var $content = $header.next();
	            var $parent = $header.parent();
	            if (!$header.hasClass('accordion')) {
	                if ($parent.hasClass("has-hidden-content")) {
	                    $parent.addClass("has-visible-content");
	                    $parent.removeClass("has-hidden-content");
	                    $content.slideUp(0, function () {
	                        $content.removeClass('visuallyhidden')
	                            .slideDown(500);
	                    });
	                } else {
	                    $parent.removeClass("has-visible-content");
	                    $parent.addClass("has-hidden-content");
	                    $content.slideUp('fast', function () {
	                        $content.addClass('visuallyhidden')
	                            .slideDown(0);
	                    });
	                }
	            }
	        }
	    });

	});
		
	  
	  
	 /* jQuery('.Recommendation').on('click', 'h2', function() {
	  	//make left border dissappear
	  	$(this).parent().toggleClass("gradingBlank", 300);
	  	$(this).closest("section").toggleClass("open");
	  	$(this).toggleClass("clicked"); //make element same background as page
	  	var wrapper = $(this).closest(".recommendationheader");
	  	slider(wrapper, wrapper.siblings('.recommendationcontent, .background_information, .button-close'));

	  });

	  //hide recommendation explanation text
	  $(".recommendationexplanation").find(".explainingtext").hide();

	  //show recommendation explanation text on click
	  $(".recommendationexplanation").on("click", function(){
	  	var animationSpeed = 300;
	  	$(this).find(".explainingtext").slideToggle(animationSpeed);
	  	$(this).toggleClass("open");
	  	$(this).find("i").toggleClass("open");
	  	
	  	var height = $(this).find("p").first();
	  	if(height.hasClass("ng-hide"))
	  		height = height.next();

	  	height = height[0].scrollHeight;
	  	
	  	//make ekg move on expand
	  	var pulse = $(this).parent().find(".pulse");
	  	if(pulse.hasClass("closed")){
	  		pulse.animate({"top" : height+50+"px"}, animationSpeed);
	  		pulse.removeClass("closed");
	  	}
	  	else{
	  		pulse.animate({"top" : "40px"}, animationSpeed);
	  		pulse.addClass("closed");
	  	}
	  });*/


	 
	 //Button to close dropdown
	 /*$(".Recommendation").find(".button-close").on("click", function(e){
	 	e.preventDefault();
	 	var wrapper = $(this).closest(".Recommendation").find(".recommendationheader");
	 	var areaToExpand = wrapper.siblings('.recommendationcontent, .button-close');
	 	if(wrapper.hasClass('open')){
	 		$(wrapper).find(".resp-tab-content-active").removeClass(".resp-tab-content-active");
	 		$(wrapper).find(".resp-tab-active").removeClass(".resp-tab-active");
	 		areaToExpand.slideUp('fast', function () {
			areaToExpand.addClass('visuallyhidden').slideDown(0);
			$(wrapper).removeClass("gradingBlank", 300);
			$(wrapper).find(".recommendationtitle").removeClass("clicked");
			wrapper.removeClass('open');
			wrapper.closest(".Recommendation").removeClass("open");
			wrapper.addClass('closed');

		});
	 }	});*/

	 //responsive tabs
	 $('.tabs').easyResponsiveTabs({
	     type: 'default', //Types: default, vertical, accordion           
	     closed: true,// Start closed if in accordion view
	     slideSpeed: 200,
	     activate: function(event) { // Callback function if tab is switched  
	     	$(this).closest("ul").addClass("open");
	      }
	 });

	/*$('.open-popup-link').magnificPopup({
	  type:'inline',
	  midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	  closeBtnInside: false,

	}); */
	$(document).on('click', '.closemodalbutton', function (e) {
			e.preventDefault();
			$.magnificPopup.close();
		});


}

function runJqueryUIStuff(){
	
	 //i button functionality

	 $('.aboutguidelineicon').on("click", function(e){
	 	e.preventDefault();
	 	$(this).toggleClass("open");
	 	$(".aboutexpand").slideToggle("fast");

	 });


	 //$("#picoEvidensprofil").modal({
	 	//escapeClose: false,
	 	//clickClose: false,
	 //	showClose: false
	 //});

		
}

function slider(accordion, areaToExpand) {
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
}

