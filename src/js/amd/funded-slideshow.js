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
			settings = {
				slideSelector: '.slide',
				slidesSelector: '.slides',
				metricsModuleName: 'ss',
				adaptiveHeight: true,
				pager: false,
				nextText: 'Next Slide',
				prevText: 'Previous Slide',
				preloadImages: 'visible',
				infiniteLoop: false
			};

		function init(selector, options) {
			if (options) {
				$.extend(settings, options);
			}

			$ss = $(selector);
			$ss.show();

			attachEventHandlers();

			slider = $ss.find(settings.slidesSelector).bxSlider(settings);

			totalSlides = slider.getSlideCount();
			$ss.find('.slide-count .total').html(totalSlides);

		}

		function attachEventHandlers() {
			$ss.on('onSliderLoad', function(event) {
				positionArrows(0);
				$ss.find('.slide-count .current').html('1');

				if (webmd.useragent.getType() === 'mobile') {
					swapMobileInterstitial();
				}
			});

			$ss.on('onSlideBefore', function(event) {
				$ss.find('.slide-count .current').html(event.newIndex + 1);
				positionArrows(event.newIndex);

				// check for interstitial slide
				if ($ss.find('.slide').eq(event.newIndex).hasClass('sponsored')) {
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

			$(window).on('resize', function() {
				var current = slider.getCurrentSlide();

				slider.reloadSlider();
				slider.goToSlide(current);
			});

			return self;
		}

		function positionArrows(index) {
			var imageHeight = $ss.find('.slide:not(.bx-clone) .image').eq(index).height();

			if (index === 0) {
				$ss.find('.bx-prev').hide();
			} else {
				$ss.find('.bx-prev').show();
			}

			$ss.find('.bx-prev, .bx-next').css('top', imageHeight/2 - 24);

			return this;
		}

		function doInterstitial(isInterstitial) {
			var $elements = $('.sources, .ed_disclaimer, .attrib_right_fmt, .toolbar .share-open');
			if (isInterstitial) {
				$elements.hide();
			} else {
				$elements.show();
			}
		}

		function swapMobileInterstitial() {
			var $sponImg = $ss.find('.slide.sponsored .image img'),
				imgSrc = $sponImg.attr('src'),
				imgSplit,
				imgType;
			
			if (imgSrc && imgSrc.indexOf('_mobile') === -1) {
				imgSplit = imgSrc.split('.');
				imgType= imgSplit.pop();
				
				$sponImg.attr('src', imgSplit.join('.') + '_mobile.' + imgType);
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

			setTimeout(function(){
				window.location = url; 
			}, 1000);

		}

		function callMetrics(clickId, isLink) {
/*			if (isLink) {

			} else {
				webmd.metrics.dpv({
					moduleName: settings.metricsModuleName + '_' + clickId,
					iCount: slider.getCurrentSlide()
				});
			}*/
		}

		// only expose init
		return {
			init : init
		};

	})();

	return slideshow;
});
