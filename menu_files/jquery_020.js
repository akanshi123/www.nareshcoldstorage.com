(function ($) {
	"use strict";
    $.fn.meanmenu = function (options) {
        var defaults = {
            meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
            meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
            meanMenuClose: "X", // single character you want to represent the close menu button
            meanMenuCloseSize: "20px", // set font size of close button
            meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
            meanRevealPosition: "right", // left right or center positions
            meanRevealPositionDistance: "0", // Tweak the position of the menu
            meanRevealColour: "", // override CSS colours for the reveal background
            meanRevealHoverColour: "", // override CSS colours for the reveal hover
            meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
            meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
            meanShowChildren: true, // true to show children in the menu, false to hide them
            meanExpandableChildren: true, // true to allow expand/collapse children
            meanExpand: "+", // single character you want to represent the expand for ULs
            meanContract: "-", // single character you want to represent the contract for ULs
            meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
            onePage: false, // set to true for one page sites
            removeElements: "" // set to hide page elements
        };
        var options = $.extend(defaults, options);
        var currentWidth = window.innerWidth || document.documentElement.clientWidth;

        return this.each(function () {
            var meanMenu = options.meanMenuTarget;
            var meanContainer = options.meanMenuContainer;
            var meanReveal = options.meanReveal;
            var meanMenuClose = options.meanMenuClose;
            var meanMenuCloseSize = options.meanMenuCloseSize;
            var meanMenuOpen = options.meanMenuOpen;
            var meanRevealPosition = options.meanRevealPosition;
            var meanRevealPositionDistance = options.meanRevealPositionDistance;
            var meanRevealColour = options.meanRevealColour;
            var meanRevealHoverColour = options.meanRevealHoverColour;
            var meanScreenWidth = options.meanScreenWidth;
            var meanNavPush = options.meanNavPush;
            var meanRevealClass = ".meanmenu-reveal";
            var meanShowChildren = options.meanShowChildren;
            var meanExpandableChildren = options.meanExpandableChildren;
            var meanExpand = options.meanExpand;
            var meanContract = options.meanContract;
            var meanRemoveAttrs = options.meanRemoveAttrs;
            var onePage = options.onePage;
            var removeElements = options.removeElements;
                        
            if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
                var isMobile = true;
            }
            
            if ( (navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i)) ) {
                jQuery('html').css("overflow-y" , "scroll");
            }
                        
            function meanCentered() {
            	if (meanRevealPosition == "center") {
	            	var newWidth = window.innerWidth || document.documentElement.clientWidth;
	            	var meanCenter = ( (newWidth/2)-22 )+"px";
	            	meanRevealPos = "left:" + meanCenter + ";right:auto;";
	            	
	            	if (!isMobile) {	            	
	            		jQuery('.meanmenu-reveal').css("left",meanCenter); 
	            	} else {
		            	jQuery('.meanmenu-reveal').animate({
		            	    left: meanCenter
		            	});
	            	}
            	}
            }
            
            var menuOn = false;
            var meanMenuExist = false;
            
            if (meanRevealPosition == "right") {
                meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
            }
            if (meanRevealPosition == "left") {
                var meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
            } 
            meanCentered();
            
            var meanStyles = "background:"+meanRevealColour+";color:"+meanRevealColour+";"+meanRevealPos;
			var $navreveal = "";
			
            function meanInner() {
                if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
                    $navreveal.html(meanMenuClose);
                } else {
                    $navreveal.html(meanMenuOpen);
                }
            }
            
            function meanOriginal() {
            	jQuery('.mean-bar,.mean-push').remove();
            	jQuery(meanContainer).removeClass("mean-container");
            	jQuery(meanMenu).show();
            	menuOn = false;
            	meanMenuExist = false;
            	jQuery(removeElements).removeClass('mean-remove');
            }
            
            function showMeanMenu() {
                if (currentWidth <= meanScreenWidth) {
		            jQuery(removeElements).addClass('mean-remove');        
                	meanMenuExist = true;
                	jQuery(meanContainer).addClass("mean-container");
                	jQuery('.mean-container').prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+meanStyles+'">Show Navigation</a><nav class="mean-nav"></nav></div>');
                    
                    var meanMenuContents = jQuery(meanMenu).html();
                    jQuery('.mean-nav').html(meanMenuContents);
            		
            		if(meanRemoveAttrs) {
            			jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {
            				jQuery(this).removeAttr("class");
            				jQuery(this).removeAttr("id");
            			});
            		}
                    
                    jQuery(meanMenu).before('<div class="mean-push" />');
                    jQuery('.mean-push').css("margin-top",meanNavPush);
                    
                    jQuery(meanMenu).hide();
                    jQuery(".meanmenu-reveal").show();
                    
                    jQuery(meanRevealClass).html(meanMenuOpen);
                    $navreveal = jQuery(meanRevealClass);
                    
                    jQuery('.mean-nav ul').hide();
                    
	                   if(meanShowChildren) {
	                       if(meanExpandableChildren){
		                       jQuery('.mean-nav ul ul').each(function() {
		                           if(jQuery(this).children().length){
		                               jQuery(this,'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: '+ meanMenuCloseSize +'">'+ meanExpand +'</a>');                               
		                           }
		                       });
		                       jQuery('.mean-expand').on("click",function(e){
		                       		e.preventDefault();
		                       	   if (jQuery(this).hasClass("mean-clicked")) {
		                       	   		jQuery(this).text(meanExpand);
		                               jQuery(this).prev('ul').slideUp(300, function(){});
		                           } else {
		                           		jQuery(this).text(meanContract);
		                           		jQuery(this).prev('ul').slideDown(300, function(){});
		                           }   
		                           jQuery(this).toggleClass("mean-clicked"); 
		                       });     
	                       } else {
	                           jQuery('.mean-nav ul ul').show();   
	                       }
	                   } else {
	                       jQuery('.mean-nav ul ul').hide();
	                   }
	                   
                    jQuery('.mean-nav ul li').last().addClass('mean-last');
                
                    $navreveal.removeClass("meanclose");
                    jQuery($navreveal).click(function(e){
                    	e.preventDefault();
	            		if( menuOn == false ) {
	                        $navreveal.css("text-align", "left");
	                        $navreveal.css("text-indent", "0");
	                        $navreveal.css("font-size", meanMenuCloseSize);
	                        jQuery('.mean-nav ul:first').slideDown(); 
	                        menuOn = true;
	                    } else {
	                    	jQuery('.mean-nav ul:first').slideUp();
	                    	menuOn = false;
	                    }    
                        $navreveal.toggleClass("meanclose");
                        meanInner();
                        jQuery(removeElements).addClass('mean-remove');
                    });
                    
                    if ( onePage ) {
                    
						jQuery('.mean-nav ul > li > a:first-child').on( "click" , function () {
							jQuery('.mean-nav ul:first').slideUp();
							menuOn = false;
							jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);
						
						});
                    
                    }
                    
                } else {
                	meanOriginal();
                }	
            } 
            
            if (!isMobile) {
                jQuery(window).resize(function () {
                    currentWidth = window.innerWidth || document.documentElement.clientWidth;
                    if (currentWidth > meanScreenWidth) {
                        meanOriginal();
                    } else {
                    	meanOriginal();
                    }	
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
                    } else {
                    	meanOriginal();
                    }	
                });
            }

            window.onorientationchange = function() {
            	meanCentered();
            	currentWidth = window.innerWidth || document.documentElement.clientWidth;
            	if (currentWidth >= meanScreenWidth) {
            		meanOriginal();
            	}
            	if (currentWidth <= meanScreenWidth) {
            		if (meanMenuExist == false) {
            			showMeanMenu();
            		}
            	}
            }
           showMeanMenu(); 
        });
    };
})(jQuery);