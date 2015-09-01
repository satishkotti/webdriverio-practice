/**
 * RMQ core will be an AMD module so let's first define it using RequireJS
 * RMQ sits on top of bxSlider core so we must require it
 * @constructor
 */
define(['bx_slider/1/bx_slider'], {

    // Define Tips object properties at the top for convention and convenience
    // IMPORTANT: If you add more properties put them here
    container: '#tips_slides',
    sSettings: {
        // GENERAL
        mode: 'horizontal', // fade produces the best functionality of all transition options
        infiniteLoop: true, // enable looping since the tips is not a true slider
        preloadImages: 'all', // preload every image before initializing the slider

        // TOUCH
        touchEnabled: false,

        // PAGER
        pager: true,
        pagerType: "short",
        pagerShortSeparator: ' of ',

        // CONTROLS
        controls: false, // tips uses its own custom controls

        // AUTO
        auto: true,
        pause: 5000,
        autoStart: true,
        autoDirection: 'next'
    },

    /**
     * Init function
     */
    init: function(settings) {
        var self = this;

        if (webmd.fundedEditorial.tocTiles.tocTips === "loaded") { // initializing masonry causes 2 instances
            webmd.fundedEditorial.tocTiles.tocTips = null; // allow multiple tips modules
            return;
        }

        self.slideInfo = [];

        // Add slide data and additional parameters to the Tips object
        // These settings are generated by the XSL
        $.extend(self, settings);

        // Show the quiz container once it is fully loaded and ready
        self.sSettings.onSliderLoad = function() {
            $('.wbmd-tips').css('visibility', 'visible');
            webmd.fundedEditorial.tocTiles.tocTips = "loaded";
        };

        // Create a bxSlider instance from the Tips slide container
        self.slider = $(self.container).css('display', 'block').bxSlider(self.sSettings);

        self.slides = $(self.container).find('.slide');

        self.bindSlideElem();

        $.each(self.slides, function(i) {
            $nextBtn = self._selectNextBtn(i);
        });

        return self;
    },

    bindSlideElem: function() {

        var self = this,
            windowWidth = $(window).width(),
            windowHeight = $(window).height();

        $('.wbmd-tips').find('.slide_controls .tips_prev').click(function(e) {
            e.preventDefault();
            self._goPrev();
        });

        $('.wbmd-tips').find('.slide_controls .tips_next').click(function(e) {
            e.preventDefault();
            self._goNext();
        });

        $(window).on('resize', function() {
            window.setTimeout(function() {
                // get the new window dimens (again, thank you IE)
                var windowWidthNew = $(window).width();
                var windowHeightNew = $(window).height();
                // make sure that it is a true window resize
                // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
                // are resized. Can you just die already?*
                if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
                    // set the new window dimens
                    windowWidth = windowWidthNew;
                    windowHeight = windowHeightNew;
                    // update all dynamic elements
                    self.slider.redrawSlider();
                }
            }, 500);
        });

        return self;
    },

    metrics: function(action, id) {

        var self = this,
            omniturePageURL = window.s_pagename,
            URLFull;

        switch (action) {
            case 'pageView':
                if (!omniturePageURL) {
                    URLFull = document.location.href.split('?')[0];
                    omniturePageURL = URLFull.split('#')[0];
                }

                omniturePageURL += '/' + id;
                wmdPageview(omniturePageURL);
                break;
            case 'pageClick':
                wmdTrack(id);
                break;
            case 'moduleClick':
                wmdPageLink(id);
                break;
            default:
                break;
        }

        return self;

    },

    /**
     * Perform necessary functionality when attempting to move to the previous slide
     */
    _goPrev: function() {

        var self = this,
            n = self.slider.getCurrentSlide(),
            $slide = $(self.slides.eq(n)),
            $nextBtn = self._selectNextBtn(n);

        self.metrics('pageClick', 'tips-prev');
        self.slider.stopAuto();
        self.slider.goToPrevSlide();
    },

    /**
     * Perform necessary functionality when attempting to move to the next slide
     */
    _goNext: function() {

        var self = this,
            n = self.slider.getCurrentSlide(),
            $slide = $(self.slides.eq(n)),
            $nextBtn = self._selectNextBtn(n);

        self.metrics('pageClick', 'tips-next');
        self.slider.stopAuto();
        self.slider.goToNextSlide();
    },

    /**
     * Show or hide the previous slide button based on the specified slide index
     * @param   {integer}   n       - index of slide in slider array
     * @return  {object}    jquery object containing the previous slide button of the corresponding slide index
     */
    _prevBtnToggle: function(n) {

        var self = this;

        if (n === 0) {
            self.slides.eq(n).find('.slide_controls .tips_prev').hide();
        } else {
            self.slides.eq(n).find('.slide_controls .tips_prev').show();
        }

        return self.slides.eq(n).find('.slide_controls .tips_prev');

    },

    /**
     * Finds the next button at a specified index from cached array of quiz slides
     * @param   {integer}   n       - index of slide in slider array
     * @return  {object}    jquery object containing the next button of the corresponding slide index
     */
    _selectNextBtn: function(n) {

        var self = this;

        return self.slides.eq(n).find('.slide_controls .tips_next');

    }
});
