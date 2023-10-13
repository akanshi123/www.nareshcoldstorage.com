jQuery(document).ready(function($){
	function megaMenu() {
		var screenWidth = $(document).width(),
		containerWidth = $("#header .container").width(),
		containerMinuScreen = (screenWidth - containerWidth)/2;
		if( containerWidth == screenWidth ){
			$px = mytheme_urls.scroll == "disable" ? 45 : 25;
			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){
			var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();
				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > screenWidth ){
					var SwMinuOffset = screenWidth - ParentLeftPosition;
					var marginFromLeft = MegaMenuChildContainerWidth - SwMinuOffset;
					var marginFromLeftActual = (marginFromLeft) + $px;
					var marginLeftFromScreen = "-"+marginFromLeftActual+"px";
					$(this).css('left',marginLeftFromScreen);
				}
			});
		} else {
			$px = mytheme_urls.scroll == "disable" ? 40 : 20;
			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){
				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();
				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > containerWidth ){
					var marginFromLeft = ( ParentLeftPosition + MegaMenuChildContainerWidth ) - screenWidth;
					var marginLeftFromContainer = containerMinuScreen + marginFromLeft + $px;
					if( MegaMenuChildContainerWidth > containerWidth ){
						var MegaMinuContainer	= ( (MegaMenuChildContainerWidth - containerWidth)/2 ) + 10;
						var marginLeftFromContainerVal = marginLeftFromContainer - MegaMinuContainer;
						marginLeftFromContainerVal = "-"+marginLeftFromContainerVal+"px";
						$(this).css('left',marginLeftFromContainerVal);
					} else {
						marginLeftFromContainer = "-"+marginLeftFromContainer+"px";
						$(this).css('left',marginLeftFromContainer);
					}
				}
			});
		}
	}
	megaMenu();
	$(window).smartresize(function(){
		megaMenu();
	});
	$("li.menu-item-depth-0,li.menu-item-simple-parent ul li" ).hover(function(){
		//mouseover 
		if( $(this).find(".megamenu-child-container").length  ){
			$(this).find(".megamenu-child-container").stop(true, true).slideDown('slow', 'easeOutQuad');
		} else {
			$(this).find("> ul.sub-menu").stop(true, true).slideDown('slow', 'easeOutQuad');
		}
	},function(){
			//mouseout
		if( $(this).find(".megamenu-child-container").length ){
			$(this).find(".megamenu-child-container").stop(true, true).hide();
		} else {
			$(this).find('> ul.sub-menu').stop(true, true).hide(); 
		}
	});

	if( navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) || 
		navigator.userAgent.match(/Android/i)|| 
		navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || 
		navigator.userAgent.match(/iPod/i) ) {
			
		if( mytheme_urls.mobilestickynav === "enable") {
			$("#header-wrapper").sticky({ topSpacing: 0 });
		}
			
	} else {
		if( mytheme_urls.stickynav === "enable") {
			$("#header-wrapper").sticky({ topSpacing: 0 });
		}
	}
	//Menu Ends Here
	
	var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
	if( mytheme_urls.scroll === "enable" && !isMacLike ) {
		jQuery("html").niceScroll({zindex:99999,cursorborder:"1px solid #424242"});
	}

	//Menu
	if( mytheme_urls.isResponsive === "enable" ) {
		$('nav#main-menu').meanmenu({ meanMenuContainer :  $('header #primary-menu'), meanRevealPosition:  'left', meanScreenWidth : 1135 , meanRemoveAttrs: true });
	}
	
	/* To Top */
	$().UItoTop({ easingType: 'easeOutQuart' });

	/* Portfolio Lightbox */
	if($(".gallery").length) {
		$(".gallery a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});		
	}


	//Portfolio Single page Slider
	if( ($(".portfolio-slider").length) && ($(".portfolio-slider li").length > 1) ) {
		$('.portfolio-slider').bxSlider({ auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true });
	}//Portfolio Single page Slider

    if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
	  	$("ul.entry-gallery-post-slider").bxSlider({auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true});
    }	
    
	/* Placeholder Script */
  if(!Modernizr.input.placeholder){
    $('[placeholder]').focus(function() {
      
      var input = $(this);
      if( input.val() == input.attr('placeholder') ) {
        input.val('');
        input.removeClass('placeholder');
      }
      }).blur(function() {
      
      var input = $(this);
      if (input.val() === '' || input.val() === input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
      }).blur();
    
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
       });
     });
  }

  $("div.dt-video-wrap").fitVids();
	$(window).smartresize(function(){
		if( $(".apply-isotope").length ) {
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 20} });
		}
	});
	
	if( $(".apply-isotope").length ) {
		$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 20} });
	}	

	$(window).load(function() {

		//Portfolio isotope
		var $container = $('.dt-sc-portfolio-container');
		if( $container.length) {
			
			$width = $container.hasClass("no-space") ? 0 : 20;

			$(window).smartresize(function(){
				$container.css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { gutterWidth: $width } });
			});
			
			$container.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}
		if($("div.dt-sc-sorting-container").length){
			$("div.dt-sc-sorting-container a").click(function(){
				$width = $container.hasClass("no-space") ? 0 : 20;				
				$("div.dt-sc-sorting-container a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");
				$container.isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});
			return false;	
			});
		}
	
		$("ul.products li .product-wrapper").each(function(){
			var liHeight = $(this).height(); 
			$(this).css("height", liHeight);
	  	});

		if( $(".apply-isotope").length ){
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 20} });
		}
	});

	
});