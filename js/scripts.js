(function ($) { 

	/*** Page Load Animation */
	const load = document.querySelector("#load");
    window.addEventListener("load", (event) => {
        setTimeout(function(){ 
        	load.parentElement.removeChild(load);
    		
    		/*** AOS */
    		AOS.init({
    			once: true,
    			offset: 100,
    			duration: 900,
    		});
		}, 3000);
    });

    /*** Scroll To Top */
    $(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('#scrollToTop').css({ bottom: "20px" });
		} else {
			$('#scrollToTop').css({ bottom: "-100%" });
		}
	});

    $('#scrollToTop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		return false;
	});

	var ua = window.navigator.userAgent;
	var isIE = /MSIE|Trident/.test(ua);

	if ( !isIE ) {
		//IE specific code goes here
		"use strict";
	}

    /*** Sticky header */
	$(window).scroll(function(){
		if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
			$(".header").addClass("stop");
		} else {
			$(".header").removeClass("stop");
		}
	});

	/*** Sticky header */
	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = 100;

	window.addEventListener("scroll", () => {
	  	const currentScroll = window.pageYOffset;
	  	if (currentScroll <= 0) 
	  	{
	    	body.classList.remove(scrollUp);
	    	return;
	  	}

	  	if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) 
	  	{
	    	// down
	    	body.classList.remove(scrollUp);
	    	body.classList.add(scrollDown);
	  	} 
	  	else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) ) 
	  	{
	    	// up
	    	body.classList.remove(scrollDown);
	    	body.classList.add(scrollUp);
	  	}

	  	lastScroll = currentScroll;
	});

	/*** Navbar Menu */
    $('.navbar-toggle').sidr({
        name: 'sidr',
        side: 'right',
        source: '#sidr',
        displace: false,
        renaming: false,
    });

    $('.navbar-toggle.in').on('click', function(){
        $.sidr('close', 'sidr');
    });

    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
           $.sidr('close', 'sidr');
           $('.navbar-toggler').removeClass('in');
        }
    });  

	/*** Header height = gutter height */
	function setGutterHeight(){
		var header = document.querySelector('.header'),
			  gutter = document.querySelector('.header-gutter');
		if (gutter) {
			gutter.style.height = header.offsetHeight + 'px';
		}
	}
	window.onload = setGutterHeight;
	window.onresize = setGutterHeight;
	
	/*** onclick change porfolio items */
	$(".client-project").click(function(){
		$(".our-products, .our-products-filter").removeClass("active");
		$(".client-project, .client-project-filter").addClass("active");
		$("button[data-filter='*']").click();
	});

	$(".our-products").click(function(){
		$(".client-project, .client-project-filter").removeClass("active"); 
		$(".our-products, .our-products-filter").addClass("active");
		$("button[data-filter='*']").click();
	});

	/*** Hoverdir */
    $('.portfolio__item').hoverdir({
        hoverDelay: 75
    });

    /*** init Isotope */
    var $grid = $('.portfolio__filter').isotope({
        itemSelector: '.item'
    });

    var filters = {}; /*** store filter for each group */

    $('.portfolio__filter-button').on( 'click', '.button', function( event ) {
        var $button = $( event.currentTarget );
        var $buttonGroup = $button.parents('.filter-items');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        filters[ filterGroup ] = $button.attr('data-filter');
        var filterValue = concatValues( filters );
        $grid.isotope({ filter: filterValue });
    });

    $('.filter-items').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );

        $buttonGroup.on( 'click', 'button', function( event ) {
        $buttonGroup.find('.active').removeClass('active');
            var $button = $( event.currentTarget );
            $button.addClass('active');
        });
    }); /*** change is-checked class on buttons */
    
    function concatValues( obj ) {
        var value = '';
        for ( var prop in obj ) {
          value += obj[ prop ];
        }
        return value;
    } /*** flatten object by concatting values */

	/*** Image to SVG */
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    $.get(imgURL, function(data) {
	        /*** Get the SVG tag, ignore the rest */
	        var $svg = $(data).find('svg');
	
	        /*** Add replaced image's ID to the new SVG */
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        /*** Add replaced image's classes to the new SVG */
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        /*** Remove any invalid XML tags as per http://validator.w3.org */
	        $svg = $svg.removeAttr('xmlns:a');
	        
	        /*** Check if the viewport is set, else we gonna set it if we can. */
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	
	        /*** Replace image with new SVG  */
	        $img.replaceWith($svg);
	
	    }, 'xml');
	});

	/*** Number Counter */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

    /*** how-works Slider */
    var testimonials__slider;

	testimonials__slider = $('.our-testimonials__slider');

	testimonials__slider.slick({
		speed: 300, 
  		dots: true,
  		arrows: false,
		autoplay: true,
  		infinite: true,
		slidesToShow: 1, 
	  	initialSlide: 1, 
	  	slidesToScroll: 1, 
        dotsClass: "slick-dots list-inline",
        appendDots: $(".slider-controls"),
	}) 

	/*** BrowserDetect */
	var BrowserDetect = {
	    init: function () {
	        this.browser = this.searchString(this.dataBrowser) || "Other";
	        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	    },
	    searchString: function (data) {
	        for (var i = 0; i < data.length; i++) {
	            var dataString = data[i].string;
	            this.versionSearchString = data[i].subString;

	            if (dataString.indexOf(data[i].subString) !== -1) {
	                return data[i].identity;
	            }
	        }
	    },
	    searchVersion: function (dataString) {
	        var index = dataString.indexOf(this.versionSearchString);
	        if (index === -1) {
	            return;
	        }

	        var rv = dataString.indexOf("rv:");
	        if (this.versionSearchString === "Trident" && rv !== -1) {
	            return parseFloat(dataString.substring(rv + 3));
	        } else {
	            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	        }
	    },

	    dataBrowser: [
	        {string: navigator.userAgent, subString: "Edge", identity: "MSEdge"},
	        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
	        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
	        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

	        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
	        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
	    ]
	};
	
	BrowserDetect.init();
	document.body.classList.add( BrowserDetect.browser );

}(jQuery));
