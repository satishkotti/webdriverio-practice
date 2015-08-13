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
			});

			$ss.on('onSlideBefore', function(event) {
				$ss.find('.slide-count .current').html(event.newIndex + 1);
				positionArrows(event.newIndex);
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

			return self;
		}

		function positionArrows(index) {
			var imageHeight = $ss.find('.slide:not(.bx-clone) .image').eq(index).height();

			$ss.find('.bx-prev, .bx-next').css('top', imageHeight/2 - 24);

			return this;
		}

		function doEnding() {
			var nextArt = webmd.fundedEditorial.articleData.nextArticle,
				url,
				title;

			if (settings.seamless) {
				url = settings.seamless.link;
				title = settings.seamless.title;
			} else if (nextArt) {
				url = webmd.fundedEditorial.articleData.articles[nextArt].link;
				title = webmd.fundedEditorial.articleData.articles[nextArt].title;
			}

			$ss.find('.slide-end').show().find('.next-art').html(title);

			// setTimeout(function(){
			// 	window.location = url; 
			// }, 1000);

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
