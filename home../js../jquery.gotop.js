/**
 * jQuery Plugin to show up the button which scroll the page up to top.
 * @author	Tommaso Simeone
 * @link https://github.com/tomaggio83/Scroll-to-Top
 * @version 1.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 */
(function($){
    'use strict';
    
    var defaults = {
        background : 'transparent', // Background color
        color: 'rgba(0, 0, 0, 0.4)', // Icon color
        rounded: true, // if true make the button rounded
        width: '65px',
        height: '65px',
        bottom : '25px', // Button bottom position
        left: '5%',
        windowScrollShow: '5', // Window height after which show the button
        speed: 800,
        customHtml: '', // Set custom html for icon
        mobileOnly: false // Show button only on mobile device
    }
    
    // ----------------------------------
    
    $.fn.gotop = function( options ){
        
        var opts = $.extend(true, {}, defaults, options)
        ,   isMobile = $.fn.gotop.isMobile()
        ,   $el = this;
        

        return this.each(function(){
            // Hide the element
            $el.hide();

            // ----------------------------------

            // Make the button rounded
            if(opts.rounded == true) {
                $el.css('border-radius', '50%');
            }

            // ----------------------------------

            // CSS 
            $el.css({
                cursor: 'pointer',
                position: 'fixed',
                'align-items': 'center',
                'justify-content': 'center',
                background: opts.background,
                color: opts.color,
                width: opts.width,
                height: opts.height,
                bottom: opts.bottom, 
                left: opts.left
            });

            // ----------------------------------

            // Set default icon if customHtml option is empty
            if(opts.customHtml != '') {
                $el.append(opts.customHtml);            
            } else {
                $el.append('&uarr;');
            }

            // ----------------------------------
            
            // Back to top
            $el.click(function (e) {
              e.preventDefault();
              $('html, body').animate({scrollTop: 0}, opts.speed);
            });
            
            // ----------------------------------
            
            // Show the scroll to top button only on mobile devices
            if (opts.mobileOnly == true) {
                if(isMobile) {
                    $(window).scroll(function() {
                        $.fn.gotop.showButton($el, opts.windowScrollShow);
                    });                    
                } else {
                    return false;
                }
            }
            else
            {
                // Show the scroll to top button on all devices
                $(window).scroll(function() {
                    $.fn.gotop.showButton($el, opts.windowScrollShow);
                }); 
            }            
            
            // ----------------------------------
            
        });
    };
    
    // --------------------------------------------------------------------------
    
    $.fn.gotop.isMobile = function() { 
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
    }
    
    // --------------------------------------------------------------------------
    
    $.fn.gotop.showButton = function(element, windowScrollHeight) {
        
        if( $(window).scrollTop() > windowScrollHeight ) {
            element.fadeIn(400)
                .css('display', 'flex');
        } else {
            element.fadeOut(400);
        }
    }
    
    // --------------------------------------------------------------------------
    
}(jQuery));
