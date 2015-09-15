var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.menuTab = {
    sliderOptions: {
        side: 'left', // panel side: left or right
        duration: 200, // Transition duration in miliseconds
        clickClose: true, // If true closes panel when clicking outside it
        onOpen: null // When supplied, function is called after the panel opens
    },

    panelElements: ['.article-list-container'], // List in order top to bottom

    init: function() {
        if (webmd.fundedEditorial.uaType !== 'mobile') {
            return;
        }

        /* Display Menu Tab */
        $('.wbmd-menutab').show();

        /* Initialize Panel Slider Plugin*/
        this.initPanelSlider();

        this.panel = 'wbmd-menutab-' + this.sliderOptions.side + '-panel';

        /* Position the Menu Tab on left or right (specified in options) */
        $('.wbmd-navbar').addClass(this.sliderOptions.side);

        $('#wbmd-panel-link').attr({ href : '#' + this.panel });
        //$('#wbmd-panel-close-link').attr({ href : '#' + this.panel });

        this.render();
    },

    initPanelSlider: function(id) {
        /*
         * jQuery Panel Slider plugin v1.0.0
         * https://github.com/eduardomb/jquery-panelslider
         */
        /* jshint ignore:start */
        (function(e){"use strict";function r(r){var i=r.data("ps-options");if(e("body").hasClass(i.bodyClass)||n)return;r.trigger("psBeforeOpen"),n=!0,r.addClass("ps-active-panel"),e("body").addClass(i.bodyClass).one(t,function(e){n=!1,r.trigger("psOpen"),typeof i.onOpen=="function"&&i.onOpen()})}var t=["transitionend","webkitTransitionEnd","oTransitionEnd","MSTransitionEnd"].join(" "),n=!1;e.panelslider=function(e,t){e.panelslider(t)},e.panelslider.close=function(r){var i=e(".ps-active-panel"),s=i.data("ps-options");if(!i.length||n)return;i.trigger("psBeforeClose"),n=!0,i.removeClass("ps-active-panel"),e("body").removeClass(s.bodyClass).one(t,function(e){n=!1,i.trigger("psClose"),r&&setTimeout(function(){r()},0)})},e(document).on("click keyup",function(t){var n=e(".ps-active-panel");if(t.type=="keyup"&&t.keyCode!=27)return;n.length&&n.data("ps-options").clickClose&&e.panelslider.close()}),e(document).on("click",".ps-active-panel",function(e){e.stopPropagation()}),e.fn.panelslider=function(t){var n={bodyClass:"ps-active",clickClose:!0,onOpen:null},i=e(this.attr("href"));return i.data("ps-options",e.extend({},n,t)),this.click(function(t){var n=e(".ps-active-panel");n.length?n[0]==i[0]?e.panelslider.close():e.panelslider.close(function(){r(i)}):r(i),t.preventDefault(),t.stopPropagation()}),this}})(jQuery);
        /* jshint ignore:end */

    },

    createPanel: function(side) {
        var $panel = $('<div></div>');

        $panel.attr({
            id: this.panel
        }).addClass(this.panel).addClass('scroll');

        $('body').append($panel);
    },

    addElementsToPanel: function() {
        var $panel = $('.' + this.panel),
            $el;

        for (var i = 0; i < this.panelElements.length; i++) {
            $el = $(this.panelElements[i]) || $(this.panelElements[i])[0];

            $el.addClass('transform');

            $panel.append($el);
            $el.show();
        }
    },

    positionElement: function(el) {
    	/* The menu tab is in a fixed position.
    	   The menu tab is positioned under the 'unsticky' masthead at the top of the page.
    	   This function will calculate the unsticky masthead and move the menu tab with it without creating a gap */

    	var mastheadBottom,
    		$el = $(el);

    	mastheadBottom = offsetBottom('.masthead');
    	mastheadBottom = (mastheadBottom === 0) ? 45 : mastheadBottom; // The bottom is 0 when switching between unsticky and sticky masthead (set to the new position which is 45)

    	$el.css({ 'top' : mastheadBottom + 'px' });

    	function offsetBottom(el, i) {
    		i = i || 0;
    		return $(el)[i].getBoundingClientRect().bottom;
    	}
    },

    bindEvents: function() {
        var self = this;

        $('#' + self.panel).on('psOpen', function(e) {
            console.log(e.type);
            $('.' + self.panel).show();
            $('#wbmd-panel-link').html('CLOSE');
        }).on('psClose', function(e) {
            console.log(e.type);
            $('#wbmd-panel-link').html('MENU');
        }).on('psBeforeOpen', function(e) {
            console.log(e.type);
            $('body').addClass('no-scroll');
            webmd.fundedEditorial.menuTab.display = true;
        }).on('psBeforeClose', function(e) {
            console.log(e.type);
            $('body').removeClass('no-scroll');
            $('.' + self.panel).hide();
            webmd.fundedEditorial.menuTab.display = false;
        });

        $(window).load(function() {
            self.positionElement('.wbmd-navbar');
            $('.' + self.panel).hide();
            self.positionElement('.' + self.panel);
        });

        $(window).bind('scrollEnd', function() {
            // do something, window hasn't changed size in 500ms
            self.positionElement('.wbmd-navbar');
            $('.' + self.panel).hide();
            self.positionElement('.' + self.panel);
        });

        $(window).scroll(function() {
            self.positionElement('.wbmd-navbar');
            $('.' + self.panel).hide();
            self.positionElement('.' + self.panel);

            if (this.scrollTO) {
                clearTimeout(this.scrollTO);
            }

            this.scrollTO = setTimeout(function() {
                $(this).trigger('scrollEnd');
            }, 250);
        });

        $(window).bind('resizeEnd', function() {
            // do something, window hasn't changed size in 500ms
            self.positionElement('.wbmd-navbar');
        });

        $(window).resize(function() {
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            }

            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 500);
        });
    },

    render: function() {
        this.createPanel();

        this.addElementsToPanel();

        $('a#wbmd-panel-link').panelslider(this.sliderOptions);

        this.bindEvents();
    }
};

$(function() {
    webmd.fundedEditorial.menuTab.init();
});
