/**
 * @file		Core functionality for WebMD Rich Media Quiz
 * @version		2.0a
 * @copyright	WebMD 2014
 */

/**
 * RMQ core will be an AMD module so let's first define it using RequireJS
 * RMQ sits on top of bxSlider core so we must require it
 * @constructor
 */
define(['bx_slider/1/bx_slider'], {

    // Define RMQ object properties at the top for convention and convenience
    // IMPORTANT: If you add more properties put them here
    adObj: {
        params: {},
        selector: '#bannerAd_fmt, #leftAd_fmt, #rightAd_fmt, #slideshow_ad_300x250, #cw_btm_ad_300x250, #rmqAd_fmt'
    },
    adSeg: false,
    ansrTotal: 0,
    container: '#rmq_slides',
    displayScore: true,
    qstnTotal: 0,
    sSettings: {
        mode: 'fade', // fade produces the best functionality of all transition options
        infiniteLoop: false, // disable looping since the quiz is not a true slider
        adaptiveHeight: true, // quiz slides usually have variable/different heights per slide
        adaptiveHeightSpeed: 200, // sets the speed at which the container resizes to fit slide content
        preloadImages: 'all', // preload every image before initializing the slider
        touchEnabled: false, // these touch events are not true swipe functionality so they must be disabled
        pager: false, // no pagination is needed for quizzes
        controls: false // quiz uses its own custom controls
    },
    scoreRanks: [{
        pct: 33,
        resultMsgId: 3
    }, {
        pct: 67,
        resultMsgId: 2
    }, {
        pct: 100,
        resultMsgId: 1
    }],
    scoreTotal: 0,
    scoreType: 'percent',
    userScore: {
        correct: 0,
        incorrect: 0,
        pct: 0
    },

    /**
     * Init function
     */
    init: function(settings) {

        var self = this,
            curData = {},
            paramsObj,
            adParams,
            $nextBtn,
            inputVal;

        // Remove quiz image on mobile devices, display on tablet/desktop
        if (webmd.fundedEditorial.uaType === 'mobile') {
            $('.rich_media_quiz .slide_media img.rsImg').remove();
        } else {
            $('.rich_media_quiz .slide_media img.rsImg').css({
                'display': 'block',
                'visibility': 'visible'
            });
        }

        self.slideInfo = [];

        // Add slide data and additional parameters to the RMQ object
        // These settings are generated by the XSL
        $.extend(self, settings);

        // Show the quiz container once it is fully loaded and ready
        self.sSettings.onSliderLoad = function() {
            $('.rich_media_quiz').css('visibility', 'visible');
        };

        // Callbacks must be defined here so that internal RMQ methods are accessible to them
        self.sSettings.onSlideBefore = function($slideElement, oldIndex, newIndex) {

            var curData = self.slideInfo[newIndex];

            switch (curData.type) {

                case 'interstitial':

                    $(".ed_disclaimer").hide();
                    $('.rmq_footer').hide();
                    $("#rmq_scorebox").find(".score_text").children().hide();

                    break;

                case 'results':

                    $(".ed_disclaimer").show();
                    $('.rmq_footer').show();
                    $('#rmq_scorebox').find('.score_text').children().hide();
                    $('#resource_rdr').fadeIn(300);
                    self.calcResults($slideElement);

                    break;

                default:

            }

        };

        self.sSettings.onSlideAfter = function($slideElement, oldIndex, newIndex) {

            var curData = self.slideInfo[newIndex],
                id = '';

            if (typeof webmd.fundedEditorial.rmqSlide !== 'undefined') {
            	webmd.fundedEditorial.rmqSlide.type = curData.type;
            }

            switch (curData.type) {

                case 'question':

                    id = 'quest' + curData.num;

                    break;

                case 'answer':

                    id = 'answer' + curData.num;

                    break;

                case 'interstitial':

                    id = 'transition';

                    $slideElement.find('slide_controls').hide();

                    if (curData.delay) {

                        setTimeout(function() {
                            self.slider.goToNextSlide();
                        }, curData.delay * 1000);

                    }

                    if (curData.adType && (curData.adType === 'static')) {
                        self.setAdSegment();
                    }

                    if (curData.adType && (curData.adType === 'preroll')) {

                        $(document).bind('userAction', function(userAction) {

                            if (userAction.video.status === 'start') {
                                self.slider.goToNextSlide();
                            }

                            $(document).unbind('userAction');

                        });

                    }

                    break;

                case 'results':

                    id = 'quizresult';

                    $slideElement.find('slide_controls').hide();

                    //Looking for survey writer market research script
                    if (typeof(triggerSW) !== 'undefined') {
                        triggerSW();
                    }

                    break;

                default:

                    id = 'slide' + newIndex;

            }

            if (newIndex !== 0) {

                if (curData.type === 'interstitial') {
                    webmd.ads.refresh(self.adObj);
                } else if (curData.type === 'results') {
                    webmd.ads.refresh();
                } else {
                    webmd.ads.refresh();
                }

            }

            self.metrics('pageView', id);
            //$(self.container).trigger('fAfter', [curData, $(self.slides.eq(self.slider.getCurrentSlide()))]);

        };

        // Create a bxSlider instance from the RMQ slide container
        self.slider = $(self.container).css('display', 'block').bxSlider(self.sSettings);

        self.slides = $(self.container).find('.slide');

        $.each(self.slides, function(i) {

            if (typeof self.slideData[i] !== 'undefined') {

                curData = self.slideData[i];

                switch (curData.type) {

                    case 'question':

                        self.qstnTotal += 1;
                        curData.num = self.qstnTotal;

                        if (curData.scored) {

                            self.scoreTotal += 1;

                            curData.correctText = $(this).find('a[data-selected-answer="' + curData.correct + '"]').find('p').html();

                        }

                        break;

                    case 'answer':

                        self.ansrTotal += 1;
                        curData.num = self.ansrTotal;

                        break;

                    case 'interstitial':

                        if (curData.adType) {

                            switch (curData.adType) {

                                case 'static':

                                    $('#rmq_media').find('#rightAd_rdr').remove();

                                    // If the new ad system (DFP) is available use it, otherwise use the old system (DE)
                                    if (webmd.ads2 && webmd.ads2.isInitialized()) {

                                        // Set up the ad and configure it as 300x250 with a pos value of 121 (new value for DFP changed from 207) then fetch and display it
                                        // Refer to scripts.js ads2 branch for detailed documentation on the methods used
                                        $('#rmq_ad_placeholder').html('<div id="rmqAd_fmt"><div class="ad_placeholder" id ="ads2-pos-121" style="height:250px;"></div></div>');
                                        webmd.ads2.defineAd({
                                            id: 'ads2-pos-121',
                                            pos: '121',
                                            sizes: [300, 250]
                                        });
                                        webmd.ads2.display();

                                    } else {

                                        if (webmd.ads.params) {

                                            if ($.isEmptyObject(webmd.ads.params)) {
                                                webmd.ads.init();
                                            }

                                            paramsObj = $.extend({}, webmd.ads.params);
                                            paramsObj.pos = '207';
                                            adParams = '';

                                            $.each(paramsObj, function(k1, v1) {

                                                if (adParams) {
                                                    adParams += '&';
                                                }

                                                adParams += k1 + '=' + v1.replace(/\//g, '%2f');

                                            });

                                            $('#rmq_ad_placeholder').html('<div class="ad_label">Advertisement</div><div id="rmqAd_fmt"><div class="ad_placeholder" style="height:250px;"></div></div><div class="ad_label">Advertisement</div>');
                                            webmd.ads.refresh.defaults.src.rmqAd_fmt = document.createElement('iframe');

                                            $(webmd.ads.refresh.defaults.src.rmqAd_fmt).attr({
                                                src: location.protocol + '//as.webmd.com/html.ng/' + adParams,
                                                width: '300',
                                                height: '250',
                                                id: 'rmqAd_Iframe',
                                                title: 'RMQ Advertisement Frame',
                                                marginwidth: 0,
                                                marginheight: 0,
                                                style: 'margin:0;',
                                                frameborder: 0,
                                                scrolling: 'no'
                                            });

                                        }

                                    }

                                    break;

                                case 'preroll':

                                    break;

                            }

                        }

                        break;

                    case 'results':

                        $('#results_controls').find('.rmq_retake').click(function(e) {

                            e.preventDefault();
                            
                            if (typeof webmd.fundedEditorial.rmqSlide !== 'undefined') {
                                webmd.fundedEditorial.rmqSlide.type = 'reset';
                            }

                            self.metrics('pageClick', 'rmq-strt-ovr');
                            self.resetQuiz();
                            //self.topBannerAd();

                            return false;

                        });

                        break;

                    default:

                }

            } else {

                curData.type = 'editorial';

            }

            $(this).addClass(curData.type);
            self.slideInfo.push(curData);

            var $resources = $('<div id="resource_rdr"/>').insertAfter('.rich_media_quiz').hide();
            $('.td_related').remove();

            var $topPicks = $('.top_picks').parent('.module');
            $topPicks.siblings('h2.lrgTitle').appendTo($resources);
            $topPicks.show().appendTo($resources).find('.top_picks').show();

        });

        self.setupSDC();

        // resets s_package_name, prop31 to friendly url to allow better tracking of RMQs
        s_md.eVar31 = s_md.prop31 = s_package_name = window.s_pagename.split('/').slice(-1)[0].indexOf('default') === -1 ? window.s_pagename.split('/').slice(-1)[0] : window.s_pagename.split('/').slice(-2)[0];

        if (!self.processDeeplinks()) {
            self.metrics('pageView', 'quest1');
        }

        self._prevBtnToggle(self.slider.getCurrentSlide());

        self.bindSlideElem();

        $.each(self.slides, function(i) {

            if (self.slideData[i].type === 'question') {

                $nextBtn = self._selectNextBtn(i);
                inputVal = $(this).find('input').val();

                if (inputVal && inputVal !== '') {
                    self.scoreSlide(i);
                    self._selectAnswer($(this).find('.radio_inputs a[data-selected-answer="' + inputVal + '"]'));
                } else {
                    $nextBtn.addClass('disabled');
                }

            }

        });

        if ($('#thirdCol_ctr').find('.attrib_right_fmt').length) {
            $('#thirdCol_ctr').find('.attrib_right_fmt').clone().appendTo('#rmq_header');
        }

        self.calcScore();

        $('#rmq_progress').find('.tot_prog_num').html(self.qstnTotal);

        // bind footer toggles
        $('.rmq_footer .toggle').click(function(e) {
            e.preventDefault();
            $(this.hash).toggle();
        });

        return self;

    },

    // move page to top of banner ad
    topBannerAd: function() {
        // for desktop/tablet
        if ($('#bannerAd_rdr').length) {
            $('html, body').animate({
                scrollTop: $('#bannerAd_rdr').offset().top
            }, 'slow');
        }
    },

    bindSlideElem: function() {

        var self = this,
            windowWidth = $(window).width(),
            windowHeight = $(window).height();

        $('.rich_media_quiz').find('.radio_inputs a').click(function(e) {

            e.preventDefault();

            self._selectAnswer(this);
            self._goNext();

            //self.topBannerAd();
        });

        $('.rich_media_quiz').find('.slide_controls .rmq_prev').click(function(e) {

            e.preventDefault();

            self._goPrev();

            //self.topBannerAd();
        });

        $('.rich_media_quiz').find('.slide_controls .rmq_next').click(function(e) {

            e.preventDefault();

            self._goNext();

            //self.topBannerAd();
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

    showScore: function() {

        var self = this;

        if ((self.displayScore) && (self.userScore.correct > 0 || self.userScore.incorrect > 0)) {

            $('#rmq_scorebox').find('.score_num_correct').html(self.userScore.correct);
            $('#rmq_scorebox').find('.score_num_incorrect').html(self.userScore.incorrect);
            $('#rmq_scorebox').find('.score_text').children().show();

        }

        return self;

    },

    scoreSlide: function(i) {

        var self = this,
            curData = self.slideInfo[i];

        curData.userChoice = $(self.slides[i]).find('input').val();

        curData.userText = $(self.slides[i]).find('a[data-selected-answer="' + curData.userChoice + '"]').find('p').html();

        self.fillAnswer(curData);

        self.slideInfo[i] = curData;

        if (curData.scored) {
            self.calcScore();
        }

        if (self.sdc) {
            $(self.container).closest('form').get(0).submit();
        }

        return self;

    },

    fillAnswer: function(curData) {

        var self = this;

        for (var i = self.slider.getCurrentSlide() + 1, l = self.slider.getSlideCount(); i < l; i++) {

            var tempData = self.slideInfo[i];

            if (tempData.type === 'answer') {

                var userDiv = $(self.slides.eq(i)).find('.user_answer'),
                    correctDiv = $(self.slides.eq(i)).find('.correct_answer'),
                    answerDivs = $(self.slides.eq(i)).find('.answer_expl');

                if (answerDivs.length > 1) {

                    answerDivs.hide();

                    var explDiv = '#answer_q' + curData.num + curData.userChoice;

                    if ($(self.slides.eq(i)).find(explDiv).length) {
                        $(explDiv).show();
                    } else {
                        $(answerDivs[0]).show();
                    }


                } else {

                    answerDivs.show();

                }

                $(userDiv).find('.answer_text').html(curData.userText);

                if (curData.scored) {

                    $(correctDiv).find('.answer_text').html(curData.correctText);

                    if (curData.correct === curData.userChoice) {

                        $(userDiv).addClass('correct icon-check');
                        $(userDiv).removeClass('incorrect icon-close');
                        $(correctDiv).hide();

                    } else {

                        $(userDiv).addClass('incorrect icon-close');
                        $(userDiv).removeClass('correct icon-check');
                        $(correctDiv).show();

                    }

                }

                break;

            } else if (tempData.type === 'question' || tempData.type === 'results') {

                break;

            }

        }

        return self;

    },

    calcScore: function() {

        var self = this;

        self.userScore.correct = 0;
        self.userScore.incorrect = 0;

        $.each(self.slides, function(i) {

            var tempData = self.slideInfo[i];

            if (tempData && (tempData.type === 'question') && tempData.scored && tempData.userChoice) {

                if (tempData.correct === tempData.userChoice) {
                    self.userScore.correct += 1;
                } else {
                    self.userScore.incorrect += 1;
                }

            }

        });

        self.showScore();

        return self;

    },

    setAdSegment: function() {

        var self = this,
            adScore = Math.round((self.userScore.correct / self.scoreTotal) * 100),
            segObj = (self.adSeg) ? self.adSeg : self.scoreRanks;

        for (var i = 0, l = segObj.length; i <= l; i++) {

            if (adScore <= segObj[i].pct) {

                if (segObj[i].segVal) {
                    self.adObj.params.segm = segObj[i].segVal;
                } else {
                    self.adObj.params.segm = i + 1;
                }

                break;

            }

        }

        return self;

    },

    calcResults: function(resultSlide) {

        var userRank,
            resultDiv,
            self = this;

        $('.more_reading_rdr').show();

        self.userScore.pct = Math.round((self.userScore.correct / self.scoreTotal) * 100);

        for (var i = 0, l = self.scoreRanks.length; i <= l; i++) {

            if (self.userScore.pct <= self.scoreRanks[i].pct) {

                userRank = self.scoreRanks[i];
                userRank.segNum = i + 1;

                break;

            }

        }

        s_md.prop40 = s_package_name + '_' + userRank.segNum;

        var resultTextDivs = $(resultSlide).find('.rmq_results');

        resultTextDivs.hide();

        if ((resultTextDivs.length > 1) && userRank.resultMsgId) {
            $('#results_' + userRank.resultMsgId).show();
        } else {
            $(resultTextDivs[0]).show();
        }

        switch (self.scoreType) {

            case 'percent':

                resultDiv = $('#rmq_total_pct', resultSlide);

                $(resultDiv).find('.score_pct').html(self.userScore.pct + '%');
                $(resultDiv).find('.score_num_correct').html(self.userScore.correct);
                $(resultDiv).find('.score_num_total').html(self.scoreTotal);
                $(resultDiv).show();

                break;

            case 'ranked':

                resultDiv = $('#rmq_total_rank', resultSlide);

                if (userRank.rankText) {
                    $(resultDiv).find('.score_rank').html(userRank.rankText);
                }

                $(resultDiv).find('.score_num_correct').html(self.userScore.correct);
                $(resultDiv).find('.score_num_total').html(self.scoreTotal);
                $(resultDiv).show();

                break;

            default:

        }

        return self;

    },

    resetQuiz: function() {

        var self = this;

        $(self.container).closest('form').get(0).reset();

        self.userScore = {
            correct: 0,
            incorrect: 0,
            pct: 0
        };

        $('#rmq_scorebox').find('.score_num_correct').html(self.userScore.correct);
        $('#rmq_scorebox').find('.score_num_incorrect').html(self.userScore.incorrect);

        $.each(self.slides, function(i) {

            var curData = self.slideInfo[i];

            self._selectNextBtn(i).addClass('disabled');

            if (curData.type === 'question') {

                curData.userChoice = null;
                curData.userText = null;

                $(this).find('.radio_inputs .active').removeClass('active');
                $(this).find('input').val('');
                self._selectNextBtn(i).addClass('disabled');

            } else {

                self._selectNextBtn(i).removeClass('disabled');

            }

            self.slideInfo[i] = curData;

        });

        if (self.sdc) {

            var time, hostname, sdcString, sdcExpire;

            time = new Date().getTime();
            hostname = location.host;

            if ((hostname.indexOf('preview') !== -1) || (hostname.indexOf('datlap01') !== -1) || (hostname === '')) {

                sdcString = 'http://sdcstaging.webmd.com/sdclive/SdcForm.aspx?FormId=' + self.sdc.form + '&mode=staging&time=' + time;
                sdcExpire = 'http://sdcstaging.webmd.com/sdclive/SdcForm.aspx?FormId=SessionExpire&mode=staging&formname=' + self.sdc.project;

            } else if (hostname.indexOf('staging') !== -1) {

                sdcString = 'https://data.webmd.com/sdclive/SdcForm.aspx?FormId=' + self.sdc.form + '&mode=staging&time=' + time;
                sdcExpire = 'https://data.webmd.com/sdclive/SdcForm.aspx?FormId=SessionExpire&mode=staging&formname=' + self.sdc.project;

            } else {

                sdcString = 'https://data.webmd.com/sdclive/SdcForm.aspx?FormId=' + self.sdc.form + '&cobrand=mywebmd&time=' + time;
                sdcExpire = 'https://data.webmd.com/sdclive/SdcForm.aspx?FormId=SessionExpire&cobrand=mywebmd&formname=' + self.sdc.project;

            }

            $('#sdc_iframe').get(0).contentWindow.location.replace(sdcExpire);

            $('#sdc_iframe').load(function() {

                $('#sdc_iframe').get(0).contentWindow.location.replace(sdcString);
                $('#sdc_iframe').unbind('load');

            });

        }

        $('.more_reading_rdr').hide();
        self.slider.goToSlide(0);
        self.adObj.params.segm = '';
        webmd.ads.refresh(self.adObj);

        self._selectNextBtn(0).addClass('disabled');
        self._prevBtnToggle(0);
        $('#rmq_scorebox').find('.score_text').children().show();

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

        }

        return self;

    },

    processDeeplinks: function() {

        var self = this,
            hashParams = webmd.url.getHash(),
            answer;

        if (hashParams.length) {

            hashParams = '?' + hashParams;
            answer = webmd.url.getParam('rmq_answer', hashParams);

            if (typeof answer !== 'undefined') {

                $.each(self.slides, function(i) {

                    var curData = $.extend({}, self.slideData[i]);

                    if (curData.type === 'question') {

                        self._selectAnswer($(this).find('.radio_inputs a[data-selected-answer="' + answer + '"]'));
                        self.scoreSlide(i);
                        self.slider.goToSlide(i + 1);

                        return true;

                    }

                });

            }

            location.hash = '';

        }

        return false;

    },

    setupSDC: function() {

        var self = this,
            $rmqForm = $('form[name="rmq"]'),
            time,
            hostname,
            sdcString,
            actionURL;

        if (typeof webmd.p.rmq !== 'undefined' && typeof webmd.p.rmq.sdc !== 'undefined') {

            self.sdc = webmd.p.rmq.sdc;

            time = new Date().getTime();
            hostname = location.host;
            $rmqForm.find('input[name="system_formId"]').val(self.sdc.form);

            if ((hostname.indexOf('preview') !== -1) || (hostname.indexOf('datlap01') !== -1) || (hostname === '')) {

                actionURL = 'http://sdcstaging.webmd.com/sdclive/processor.aspx';
                sdcString = 'http://sdcstaging.webmd.com/sdclive/SdcForm.aspx?FormId=' + self.sdc.form + '&mode=staging&time=' + time;

            } else if (hostname.indexOf('staging') !== -1) {

                actionURL = 'https://data.webmd.com/sdclive/processor.aspx';
                sdcString = 'https://data.webmd.com/sdclive/SdcForm.aspx?FormId=' + self.sdc.form + '&mode=staging&time=' + time;

            } else {

                actionURL = 'https://data.webmd.com/sdclive/processor.aspx';
                sdcString = 'https://data.webmd.com/sdclive/SdcForm.aspx?FormId=' + self.sdc.form + '&cobrand=mywebmd&time=' + time;

            }

            self._setSDC($rmqForm, actionURL, sdcString);
            $('#sdc_iframe').get(0).contentWindow.location.replace(sdcString);

        } else {

            $rmqForm.attr({
                action: 'about:blank'
            });
            $('#sdc_iframe').remove();

        }

        return self;

    },

    _setSDC: function($rmqForm, actionURL, sdcString) {

        $rmqForm.attr('action', actionURL);
        $rmqForm.find('input[name="system_firstLandingPage"]').val(sdcString);

        return;

    },

    /**
     * Perform necessary functionality when attempting to move to the previous slide
     */
    _goPrev: function() {

        var self = this,
            n = self.slider.getCurrentSlide(),
            $slide = $(self.slides.eq(n)),
            $nextBtn = self._selectNextBtn(n);

        self.scoreSlide(n);
        self.metrics('pageClick', 'rmq-prev');
        self.slider.goToPrevSlide();
        self._prevBtnToggle(n);

        if ($slide.hasClass('question')) {
            if ($slide.find('input').val()) {
                $nextBtn.removeClass('disabled');
            } else {
                $nextBtn.addClass('disabled');
            }
        } else {
            $nextBtn.removeClass('disabled');
        }

    },

    /**
     * Perform necessary functionality when attempting to move to the next slide
     */
    _goNext: function() {

        var self = this,
            n = self.slider.getCurrentSlide(),
            $slide = $(self.slides.eq(n)),
            $nextBtn = self._selectNextBtn(n);

        if (!$nextBtn.hasClass('disabled')) {

            self.scoreSlide(n);
            self.metrics('pageClick', 'rmq-next');
            self.slider.goToNextSlide();
            self._prevBtnToggle(n);

            if ($slide.hasClass('question')) {
                if ($slide.find('input').val()) {
                    $nextBtn.removeClass('disabled');
                } else {
                    $nextBtn.addClass('disabled');
                }
            } else {
                $nextBtn.removeClass('disabled');
            }

        }

    },

    /**
     * Show or hide the previous slide button based on the specified slide index
     * @param	{integer}	n		- index of slide in slider array
     * @return	{object}	jquery object containing the previous slide button of the corresponding slide index
     */
    _prevBtnToggle: function(n) {

        var self = this;

        if (n === 0) {
            self.slides.eq(n).find('.slide_controls .rmq_prev').hide();
        } else {
            self.slides.eq(n).find('.slide_controls .rmq_prev').show();
        }

        return self.slides.eq(n).find('.slide_controls .rmq_prev');

    },

    /**
     * Finds the next button at a specified index from cached array of quiz slides
     * @param	{integer}	n		- index of slide in slider array
     * @return	{object}	jquery object containing the next button of the corresponding slide index
     */
    _selectNextBtn: function(n) {

        var self = this;

        return self.slides.eq(n).find('.slide_controls .rmq_next');

    },

    /**
     * Perform actions necessary for an answer selection
     * @param	{object}	el		- DOM node of a selected answer link
     * @return	{object}	return the answer value
     */
    _selectAnswer: function(el) {

        var self = this,
            $el = $(el),
            answerLetter = $el.data('selected-answer');

        if (!$el.parent().hasClass('active')) {

            $el.parents('.radio_inputs').children('li').removeClass('active').parents('.slide_text').find('input').val('');
            $el.parent().addClass('active').parents('.slide_text').find('input').val(answerLetter);

            self._selectNextBtn(self.slider.getCurrentSlide()).removeClass('disabled');

        }

        return answerLetter;

    }

});
