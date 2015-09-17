var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.menuTab = {
    side: 'left', // left or right
    panelElements: ['.article-list-container', '.branded-nav-container'], // List in order top to bottom

    init: function() {
        if (webmd.fundedEditorial.uaType !== 'mobile') {
            return;
        }

        this.panel = 'wbmd-menutab-' + this.side + '-panel';

        /* Position the Menu Tab on left or right (specified in options) */
        $('.wbmd-navbar').addClass(this.side);

        $('#wbmd-panel-link').attr({ href : '#' + this.panel });
        //$('#wbmd-panel-close-link').attr({ href : '#' + this.panel });

        this.render();
    },

    createPanel: function(side) {
        var $panel = $('<div></div>');

        $panel.attr({
            id: this.panel
        }).addClass(this.panel);

        $('body').append($panel);
    },

    addElementsToPanel: function() {
        var $panel = $('.' + this.panel),
            $panelContent = $('<div></div>'),
            $el;

        $panelContent.addClass('wbmd-panel-content').addClass('scroll');

        for (var i = 0; i < this.panelElements.length; i++) {
            $el = $(this.panelElements[i]) || $(this.panelElements[i])[0];

            if (!$el.hasClass('hide')) {
                $el.show();
                $panelContent.append($el);
            }
        }

        if (!$panelContent.is(':empty')) {
            $panel.append($panelContent);
        } else {
            $('.wbmd-menutab').hide(); // Nothing will appear in the menu tab, so hide it completely
        }

        return;
    },

    positionElement: function(el) {
    	/* The menu tab is in a fixed position.
    	   The menu tab is positioned under the 'unsticky' masthead at the top of the page.
    	   This function will calculate the unsticky masthead and move the menu tab with it without creating a gap */

    	var mastheadBottom,
    		$el = $(el);

    	mastheadBottom = offsetBottom('.masthead');
        if (mastheadBottom < 0) {
            mastheadBottom = 0;
        } else if (mastheadBottom === 0) {
            mastheadBottom = 45;
        }

    	$el.css({ 'top' : mastheadBottom + 'px' });

        $('.wbmd-panel-content').css({ height : 'calc(100% - ' + mastheadBottom + 'px)' });

    	function offsetBottom(el, i) {
    		i = i || 0;
    		return $(el)[i].getBoundingClientRect().bottom;
    	}
    },

    bindEvents: function() {
        var self = this,
            panelClass = '.' + this.panel,
            $window = $(window),
            $body = $('body'),
            $panel = $(panelClass),
            $menuTab = $('.wbmd-menutab'),
            $menuTabBtn = $('#wbmd-panel-link');

        $('html').click(function() {
            resetPanel();
        });

        $menuTab.click(function(e) {
            e.stopPropagation();
        });

        $menuTabBtn.click(function(e) {
            var tabLabel;

            e.preventDefault();
            e.stopPropagation();

            $body.toggleClass('menu-panel-active');
            $body.toggleClass('no-scroll');
            $panel.toggleClass('active-panel');

            
            tabLabel = ($panel.hasClass('active-panel')) ? 'CLOSE' : 'MENU';
            $menuTabBtn.html(tabLabel);
        });

        $body.on('change', function() {
            if (this.hasClass('menu-panel-active')) {
                webmd.fundedEditorial.menuTab.display = false;
            } else {
                webmd.fundedEditorial.menuTab.display = true;
            }
        });

        $window.load(function() {
            //self.positionElement('.wbmd-navbar');
            self.positionElement(panelClass);
            
            /* Display Menu Tab */
            $menuTab.show();
            resetPanel();
        });

        $window.bind('scrollEnd', function() {
            // do something, window hasn't changed size in 500ms
            //self.positionElement('.wbmd-navbar');
            self.positionElement(panelClass);
        });

        $window.scroll(function() {
            //self.positionElement('.wbmd-navbar');
            //self.positionElement('.' + self.panel);

            if (this.scrollTO) {
                clearTimeout(this.scrollTO);
            }

            this.scrollTO = setTimeout(function() {
                $(this).trigger('scrollEnd');
            }, 500);
        });

        function resetPanel() {
            $body.removeClass('menu-panel-active');
            $body.removeClass('no-scroll');
            $panel.removeClass('active-panel');
            $menuTabBtn.html('MENU');
        }
    },

    render: function() {
        this.createPanel();

        this.addElementsToPanel();

        //$('a#wbmd-panel-link').panelslider(this.sliderOptions);

        this.bindEvents();
    }
};

$(function() {
    webmd.fundedEditorial.menuTab.init();
});
