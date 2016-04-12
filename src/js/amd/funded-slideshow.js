/*! funded slideshow module */

define(['bx_slider/1/bx_slider'], function(){

	var slideshow;

	/**
	 *
	 */
	slideshow = (function() {

		var $ss,
			slider,
			totalSlides,
			currentWidth,
			timeOut,
			interstitialNextSlideLink,
			settings = {
				slideSelector: '.slide',
				slidesSelector: '.slides',
				metricsModuleName: 'ss',
				adaptiveHeight: true,
				pager: false,
				nextText: '<label>Next Slide</label>',
				prevText: '<label>Previous Slide</label>',
				preloadImages: 'visible',
				infiniteLoop: false,
				slideMargin: 5
			};

		function init(selector, options) {
			if (options) {
				$.extend(settings, options);
			}

			$ss = $(selector);

			if (webmd.useragent.getType() === 'mobile') {
				swapMobileInterstitial();
			}

			$ss.show();

			setImageMaxWidths();

			attachEventHandlers();

			slider = $ss.find(settings.slidesSelector).bxSlider(settings);

			totalSlides = slider.getSlideCount();
			currentWidth = $(window).width();
			$ss.find('.slide-count .total').html(totalSlides);

			interstitialNextSlideLink = once(function() {
				var $nextSlideLink = $('<a href="#" class="nextslide">Continue to next slide</a>');

				$nextSlideLink.bind('click tap', function(e) {
					e.preventDefault();
                    e.stopPropagation();

					slider.goToNextSlide();
				});

				$ss.find('.slide.sponsored .image').after($nextSlideLink);
			});
		}

		function attachEventHandlers() {
			$ss.on('onSliderLoad', function(event) {
				positionArrows(0);
				$ss.find('.slide-count .current').html('1');
				if(typeof s_geo === 'undefined'){
					callMetrics();
				} else {
					if(typeof webmd.geoTargeting != 'undefined'){
						webmd.geoTargeting.dfd.done(function(){
							callMetrics();
						});
					}
				}
			});

			$ss.on('onSlideBefore', function(event) {
				$ss.find('.slide-count .current').html(event.newIndex + 1);
				positionArrows(event.newIndex);

				// check for interstitial slide
				if ($ss.find('.slide').eq(event.newIndex).hasClass('sponsored')) {
					interstitialNextSlideLink();
					doInterstitial(true);
				} else {
					doInterstitial(false);
				}
			});

			$ss.on('onSlideAfter', function(event) {
			});

			$ss.on('onSlidePrev', function(event) {
				callMetrics('prev');
			});

			$ss.on('onSlideNext', function(event) {
				callMetrics('next');
			});

			$ss.on('onSlideEnd', function(event) {
				doEnding();
			});

			$ss.find('.controls .prev').on('click tap', function(event) {
				event.preventDefault();
				slider.goToPrevSlide();
			});
			$ss.find('.controls .next, .slide .image').on('click tap', function(event) {
				event.preventDefault();
				slider.goToNextSlide();
			});

			$(window).on('resize', function() {
				var current = slider.getCurrentSlide();

				// prevent more than one at a time
				clearTimeout(timeOut);

				timeOut = setTimeout(function() {
					// only run if width changed to prevent it triggering on iPhone scroll
					if (currentWidth !== $(window).width()) {
						currentWidth = $(window).width();
						positionArrows(current);
					}
				}, 200);

			});

		}

		function positionArrows(index) {
			var imageHeight = $ss.find('.slide:not(.bx-clone) .image').eq(index).height(),
				arrowSize = (webmd.useragent.getType() === 'mobile') ? 45 : 60,
				arrowPadding = (imageHeight - arrowSize) / 2;

			if (index === 0) {
				$ss.find('.prev').hide();
			} else {
				$ss.find('.prev').show();
			}

			if (webmd.useragent.getTouch()) {
				$ss.find('.controls a').css({
					'top' : arrowPadding + "px"
				});
			} else {
				$ss.find('.controls a').css({
					'padding' : arrowPadding + "px 10px " + arrowPadding + "px 10px",
					'height' : imageHeight + "px"
				});
			}

		}

		function doInterstitial(isInterstitial) {
			var $elements = $('.sources, .ed_disclaimer, .attrib_right_fmt, .toolbar .share-open');
			if (isInterstitial) {
				$elements.css('visibility', 'hidden');
			} else {
				$elements.css('visibility', 'visible');
			}
		}

		function swapMobileInterstitial() {
			var $sponImg = $ss.find('.slide.sponsored .image img'),
				orgImgSrc = $sponImg.attr('src'),
				imgSrc = orgImgSrc,
				imgSplit,
				imgType;

			if (imgSrc) {
				imgSplit = imgSrc.split('.');
				imgType= imgSplit.pop();
				imgSrc = imgSplit.join('.') + '_mobile.' + imgType;

				// attach error handler to swith back to original image if mobile doesn't exist
				$sponImg.error(function() {
					$(this).attr('src', orgImgSrc);
				}).attr('src', imgSrc).load(function() {
					setImageMaxWidths();
				});
			}
		}

		function doEnding() {
			var nextArt = webmd.fundedEditorial.articleData.articles[webmd.fundedEditorial.articleData.nextArticle],
				url,
				title;

			if (settings.seamless) {
				url = settings.seamless.link;
				title = settings.seamless.title;
			} else if (nextArt) {
				url = nextArt.link;
				title = nextArt.title;
			}

			$ss.find('.bx-prev, .bx-next').hide();
			$ss.find('.slide-end').show().find('.next-art').html(title);

			callMetrics('next', true);

			setTimeout(function(){
				window.location = url;
			}, 1000);

		}

		function setImageMaxWidths() {
			$ss.find('.image img').each( function() {
				$(this).css('max-width', getNaturalWidth(this));
			});
		}

		function getNaturalWidth(img) {
			var $img = $(img);
			if ($img.prop('naturalWidth') === undefined) {
				var $tmpImg = $('<img/>').attr('src', $img.attr('src'));
				$img.prop('naturalWidth', $tmpImg[0].width);
			}
			return $img.prop('naturalWidth');
		}

		function callMetrics(clickId, isLink) {
			if (isLink) {
				wmdTrack(settings.metricsModuleName + '-' + clickId);
			} else if (clickId) {
				webmd.metrics.dpv({
					moduleName: settings.metricsModuleName + '-' + clickId,
					pageName: window.s_pagename + "#" + (slider.getCurrentSlide() + 1),
					iCount: slider.getCurrentSlide() + 1
				});
			} else {
				webmd.metrics.dpv({
					pageName: window.s_pagename + "#1",
					iCount: 1,
					refresh: false
				});
			}
		}

		function once(fn, context) {
			var result;

			return function() {
				if (fn) {
					result = fn.apply(context || this, arguments);
					fn = null;
				}
				return result;
			};
		}

		// only expose init
		return {
			init : init
		};

	})();

	return slideshow;
});
