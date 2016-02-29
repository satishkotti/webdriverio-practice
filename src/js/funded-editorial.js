// $.fn.imagesLoaded - THIS IS USED WITH MASONRY PLUGIN
// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// Modified with a two-pass approach to changing image
// src. First, the proxy imagedata is set, which leads
// to the first callback being triggered, which resets
// imagedata to the original src, which fires the final,
// user defined callback.

// modified by yiannis chatzikonstantinou.

// original:
// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`

$.fn.imagesLoaded = function(callback) {
	var elems = this.find('img'),
		elems_src = [],
		self = this,
		len = elems.length;

	if (!elems.length) {

		callback.call(this);
		return this;
	}

	elems.one('load error', function() {
		if (--len === 0) {
			// Rinse and repeat.
			len = elems.length;
			elems.one('load error', function() {
				if (--len === 0) {
					callback.call(self);
				}
			}).each(function() {
				this.src = elems_src.shift();
			});
		}
	}).each(function() {
		elems_src.push(this.src);
		// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
		// data uri bypasses webkit log warning (thx doug jones)
		this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
	});

	return this;
};

webmd.object.set('webmd.fundedEditorial');

webmd.fundedEditorial = {

	uaType: webmd.useragent.ua.type,

	mobileNoFlag: false,

	init: function() {

		var self = this,
			artObjParam = webmd.url.getParam('artObj');

		if (self.hasStorage()) {
			self.visitedPages = JSON.parse(sessionStorage.getItem('visited')) || {};
			self.addToVisitedPages();
		}

		self.bindEvents();

		if(typeof self.articleData !== 'undefined'){
			self.updateArticleObj();
		}

		if ($('#attribution_rdr').length) {
			//self.moveAttribution();
		}

		if (s_sponsor_program !== 'undefined' && s_sponsor_program !== '') {
			// Funded Editorial Specific Method
			self.fundedPages();
		}

		/*if(this.uaType !== 'mobile'){
			this.stickIt();
		}*/

		if (artObjParam == 1) {
			self.showArticleObj();
		}

		if (self.segments && self.segments.length > 0) {
			self.getSegmentArticleData();
		}

		if (window.s_business_reference === "TOC") {
			self.tocTiles.init();
		}
	},

	hasStorage: function() {
		try {
			sessionStorage.setItem('test', '1');
			sessionStorage.removeItem('test');
			return true;
		} catch (e) {
			return false;
		}
	},

	addToVisitedPages: function() {
		var self = this,
			chronId = window.s_unique_id;

		if (chronId && !self.visitedPages[chronId]) {
			self.visitedPages[chronId] = 1;
		}

		sessionStorage.setItem('visited', JSON.stringify(self.visitedPages));
	},

	updateArticleObj: function() {
		var self = this,
			articles = self.articleData ? self.articleData.articles : {},
			current_url = window.location.href.split("?")[0].split("#")[0]; // remove querystring and hash from url

		if (self.visitedPages[self.articleData.program.tocId]) {
			self.articleData.program.tocVisited = true;
		}

		if (webmd.fundedEditorial.mobileNoFlag) {
			articles = articles.filter(function (el) {
				return el.sponsored !== true;
			});
		}

		$.each(articles, function(index) {
			this.isCurrent = false;

			if (self.visitedPages[this.id]) {
				this.visited = true;
			}

			if (this.link === current_url || this.id === window.s_unique_id) {
				self.articleData.currentArticle = index;
				this.isCurrent = true;
				this.visited = true;

				if (index === 0) {
					self.articleData.prevArticle = articles.length - 1;
				} else {
					self.articleData.prevArticle = index - 1;
				}

				if (index === articles.length - 1) {
					self.articleData.nextArticle = 0;
				} else {
					self.articleData.nextArticle = index + 1;
				}
			}
		});

		return self;
	},

	showArticleObj: function() {
		render();

		function injectButtons() {
			var self = this,
				$div = $('<div></div>'),
				newline = '\n'; //allows readability using inspector

			$div
				.attr({
					'class': 'article-obj-button-cont'
				})
				.html(
					'<button>Show Article Object</button>'
				);

			$('#ContentPane14').prepend($div);
		}

		function injectHBtemplateJS() {
			var self = this,
				$script = $('<script></script>'),
				newline = '\n'; //allows readability using inspector

			$script
				.attr({
					'id': 'article-sequence',
					'type': 'text/x-handlebars-template'
				})
				.html(
					'<table class="art-seq">' + newline +
						'<thead>' + newline +
							'<tr>' + newline +
								'<th width="40px">Id</th>' + newline +
								'<th>DCTM Id</th>' + newline +
								'<th>Title</th>' + newline +
								//'<th>Description</th>' + newline +
								'<th>URL</th>' + newline +
								//'<th>Image</th>' + newline +
								'<th>Stand</th>' + newline +
								'<th>Spon</th>' + newline +
								'<th>Type</th>' + newline +
							'</tr>' + newline +
						'</thead>' + newline +
						'<tbody>' + newline +
							'{{#each articles}}' + newline +
							'<tr>' + newline +
								'<td width="40px" class="dctm cnt-mid">{{math @index "+" 1}}</td>' + newline +
								'<td class="dctm cnt-mid">{{id}}</td>' + newline +
								'<td class="title mid">{{title}}</td>' + newline +
								//'<td class="desc mid">{{description}}</td>' + newline +
								'<td class="link mid"><a href="{{link}}" target="_blank">{{link}}</a></td>' + newline +
								//'<td class="img cnt-mid"><img src="' + window.image_server_url + '{{images.image79x79}}" alt=""></td>' + newline +
								'<td class="fund cnt-mid">' + newline +
									'{{#unless sponsored}}' + newline +
									'<span class="icon-check"></span>' + newline +
									'{{/unless}}' + newline +
								'</td>' + newline +
								'<td class="spon cnt-mid">' + newline +
									'{{#if sponsored}}' + newline +
									'<span class="icon-check"></span>' + newline +
									'{{/if}}' + newline +
								'</td>' + newline +
								'<td class="typ cnt-mid">{{type}}</td>' + newline +
							'</tr>' + newline +
							'{{/each}}' + newline +
						'</tbody>' + newline +
					'</table>'
				);

			$('head').append($script);
		}

		function render() { // uses handlebars template above
			var self = this;

			if (typeof webmd.fundedEditorial.articleData !== 'undefined') {
				injectButtons();

				injectHBtemplateJS();

				require(['handlebars/1/handlebars'], function(Handlebars) {
					Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
						lvalue = parseFloat(lvalue);
						rvalue = parseFloat(rvalue);

						return {
							"+": lvalue + rvalue,
							"-": lvalue - rvalue,
							"*": lvalue * rvalue,
							"/": lvalue / rvalue,
							"%": lvalue % rvalue
						}[operator];
					});

					/* jshint ignore:start */
					!function(a,b){"use strict";function c(c,g){var h=this;h.$el=a(c),h.el=c,h.id=e++,h.$el.bind("destroyed",a.proxy(h.teardown,h)),h.$clonedHeader=null,h.$originalHeader=null,h.isSticky=!1,h.hasBeenSticky=!1,h.leftOffset=null,h.topOffset=null,h.init=function(){h.setOptions(g),h.$el.each(function(){var b=a(this);b.css("padding",0),h.$originalHeader=a("thead:first",this),h.$clonedHeader=h.$originalHeader.clone(),b.trigger("clonedHeader."+d,[h.$clonedHeader]),h.$clonedHeader.addClass("tableFloatingHeader"),h.$clonedHeader.css("display","none"),h.$originalHeader.addClass("tableFloatingHeaderOriginal"),h.$originalHeader.after(h.$clonedHeader),h.$printStyle=a('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'),h.$head.append(h.$printStyle)}),h.updateWidth(),h.toggleHeaders(),h.bind()},h.destroy=function(){h.$el.unbind("destroyed",h.teardown),h.teardown()},h.teardown=function(){h.isSticky&&h.$originalHeader.css("position","static"),a.removeData(h.el,"plugin_"+d),h.unbind(),h.$clonedHeader.remove(),h.$originalHeader.removeClass("tableFloatingHeaderOriginal"),h.$originalHeader.css("visibility","visible"),h.$printStyle.remove(),h.el=null,h.$el=null},h.bind=function(){h.$scrollableArea.on("scroll."+d,h.toggleHeaders),h.isWindowScrolling||(h.$window.on("scroll."+d+h.id,h.setPositionValues),h.$window.on("resize."+d+h.id,h.toggleHeaders)),h.$scrollableArea.on("resize."+d,h.toggleHeaders),h.$scrollableArea.on("resize."+d,h.updateWidth)},h.unbind=function(){h.$scrollableArea.off("."+d,h.toggleHeaders),h.isWindowScrolling||(h.$window.off("."+d+h.id,h.setPositionValues),h.$window.off("."+d+h.id,h.toggleHeaders)),h.$scrollableArea.off("."+d,h.updateWidth)},h.toggleHeaders=function(){h.$el&&h.$el.each(function(){var b,c=a(this),e=h.isWindowScrolling?isNaN(h.options.fixedOffset)?h.options.fixedOffset.outerHeight():h.options.fixedOffset:h.$scrollableArea.offset().top+(isNaN(h.options.fixedOffset)?0:h.options.fixedOffset),f=c.offset(),g=h.$scrollableArea.scrollTop()+e,i=h.$scrollableArea.scrollLeft(),j=h.isWindowScrolling?g>f.top:e>f.top,k=(h.isWindowScrolling?g:0)<f.top+c.height()-h.$clonedHeader.height()-(h.isWindowScrolling?0:e);j&&k?(b=f.left-i+h.options.leftOffset,h.$originalHeader.css({position:"fixed","margin-top":h.options.marginTop,left:b,"z-index":3}),h.leftOffset=b,h.topOffset=e,h.$clonedHeader.css("display",""),h.isSticky||(h.isSticky=!0,h.updateWidth(),c.trigger("enabledStickiness."+d)),h.setPositionValues()):h.isSticky&&(h.$originalHeader.css("position","static"),h.$clonedHeader.css("display","none"),h.isSticky=!1,h.resetWidth(a("td,th",h.$clonedHeader),a("td,th",h.$originalHeader)),c.trigger("disabledStickiness."+d))})},h.setPositionValues=function(){var a=h.$window.scrollTop(),b=h.$window.scrollLeft();!h.isSticky||0>a||a+h.$window.height()>h.$document.height()||0>b||b+h.$window.width()>h.$document.width()||h.$originalHeader.css({top:h.topOffset-(h.isWindowScrolling?0:a),left:h.leftOffset-(h.isWindowScrolling?0:b)})},h.updateWidth=function(){if(h.isSticky){h.$originalHeaderCells||(h.$originalHeaderCells=a("th,td",h.$originalHeader)),h.$clonedHeaderCells||(h.$clonedHeaderCells=a("th,td",h.$clonedHeader));var b=h.getWidth(h.$clonedHeaderCells);h.setWidth(b,h.$clonedHeaderCells,h.$originalHeaderCells),h.$originalHeader.css("width",h.$clonedHeader.width())}},h.getWidth=function(c){var d=[];return c.each(function(c){var e,f=a(this);if("border-box"===f.css("box-sizing")){var g=f[0].getBoundingClientRect();e=g.width?g.width:g.right-g.left}else{var i=a("th",h.$originalHeader);if("collapse"===i.css("border-collapse"))if(b.getComputedStyle)e=parseFloat(b.getComputedStyle(this,null).width);else{var j=parseFloat(f.css("padding-left")),k=parseFloat(f.css("padding-right")),l=parseFloat(f.css("border-width"));e=f.outerWidth()-j-k-l}else e=f.width()}d[c]=e}),d},h.setWidth=function(a,b,c){b.each(function(b){var d=a[b];c.eq(b).css({"min-width":d,"max-width":d})})},h.resetWidth=function(b,c){b.each(function(b){var d=a(this);c.eq(b).css({"min-width":d.css("min-width"),"max-width":d.css("max-width")})})},h.setOptions=function(b){h.options=a.extend({},f,b),h.$window=a(h.options.objWindow),h.$head=a(h.options.objHead),h.$document=a(h.options.objDocument),h.$scrollableArea=a(h.options.scrollableArea),h.isWindowScrolling=h.$scrollableArea[0]===h.$window[0]},h.updateOptions=function(a){h.setOptions(a),h.unbind(),h.bind(),h.updateWidth(),h.toggleHeaders()},h.init()}var d="stickyTableHeaders",e=0,f={fixedOffset:0,leftOffset:0,marginTop:0,objDocument:document,objHead:"head",objWindow:b,scrollableArea:b};a.fn[d]=function(b){return this.each(function(){var e=a.data(this,"plugin_"+d);e?"string"==typeof b?e[b].apply(e):e.updateOptions(b):"destroy"!==b&&a.data(this,"plugin_"+d,new c(this,b))})}}(jQuery,window);
					/* jshint ignore:end */

					var sequence = $('#article-sequence'),
						container = $('.article-sequence-shell'),
						source = sequence.html(),
						template = Handlebars.compile(source),
						context = webmd.fundedEditorial.articleData || {},
						html = template(context);

					$('.article-obj-button-cont button').click(function() {
						webmd.overlay.open({
							html: html,
							width: '980px',
							height: '70%',
							onComplete: function() {
								$('.art-seq').stickyTableHeaders({
									scrollableArea: $('#webmdHoverLoadedContent')[0]
								});
							}
						});
					});
				});
			}
		}
	},

	getSegmentArticleData: function() {
		var self = this,
			segments = webmd.fundedEditorial.segments;


		function validSegments(segment, index, segments) {
			if ('currentSeg' in segment) {
				if (segment.currentSeg === true) {
					// segment index needed for pre-roll ad call in premium video
					webmd.fundedEditorial.articleData.program.segIndex = index;

					return false;
				} else {
					// segment index needed for pre-roll ad call in premium video
					segment.segIndex = index;

					return segment.currentSeg !== true;
				}
			} else {
				webmd.debug('SEGMENT MODULE NOT DRAWN: fix data for entry ' + (index+1) + ' in segment data module');
				return false;
			}
		}

		// remove current segment from array
		webmd.fundedEditorial.segments = segments.filter(validSegments);

		getSegmentsByAjax();

		function getSegmentsByAjax() {
			var total = webmd.fundedEditorial.segments.length;

			//Loop through each segment
			$.each(webmd.fundedEditorial.segments, function(index, data) {
				// this is very similar to using Object.watch()
				// instead we attach multiple listeners
				webmd.fundedEditorial.segments[index].data = (function() {
					var initVal,
						interceptors = [];

					function callInterceptors(newVal) {
						for (var i = 0; i < interceptors.length; i += 1) {
							interceptors[i](newVal);
						}
					}

					return {
						get ready() {
							// user never has access to the private variable "initVal"
							// we can control what they get back from saying "webmd.fundedEditorial.rmqSlide.type"
							return initVal;
						},

						set ready(newVal) {
							callInterceptors(newVal);
							initVal = newVal;
						},

						listen: function(fn) {
							if (typeof fn === 'function') {
								interceptors.push(fn);
							}
						}
					};
				}());

				if ('dctmIds' in data && typeof data.dctmIds !== 'undefined') {
					var dctmIdArr = data.dctmIds.replace(/\s/g,'').split(',');

					for (var i=0; i<dctmIdArr.length; i++) {
						ajaxMe(dctmIdArr[i], index);
					}
				}
			});
		}

		function ajaxMe(dctmId, segIndex) {
			//Perform an AJAX 'get' on documentum ID
			$.ajax({
				url: 'http://www' + webmd.url.getLifecycle() + webmd.url.getEnv() + '.webmd.com/modules/ajax',
				type: 'GET',
				data: 'id=' + dctmId,
				dataType: 'html',
				cache: false,
				success: function(data) {
					var cx = {},
						html = $.parseHTML(data, document, true), //Parse HTML (returns array of nodes, including <script> nodes)
						articleData = findInParsed(html, 'script#articleData'),
						playlistData = findInParsed(html, 'script#videoPlaylistData'),
								el;

					if (articleData) {
						webmd.fundedEditorial.segments[segIndex].artDataId = dctmId;

						cx.el = articleData['0'].innerHTML;
						cx.data = cleanData(cx.el, 'webmd.fundedEditorial.articleData');

						//Store parsed JSON articleData in segment as new key/value
						webmd.fundedEditorial.segments[segIndex].articleData = $.extend(false, {}, cx.data);

						webmd.fundedEditorial.segments[segIndex].data.ready = true;
					}

					if (playlistData) {
						webmd.fundedEditorial.segments[segIndex].playlistDataId = dctmId;

						cx.el = playlistData['0'].innerHTML;
						cx.data = cleanData(cx.el, 'webmd.fundedEditorial.articleData.program.videoPlaylistData');

						if ('articleData' in webmd.fundedEditorial.segments[segIndex]) {
							// article data exists, it is safe to append without risk of data loss
							webmd.fundedEditorial.segments[segIndex].articleData.program.videoPlaylistData = $.extend(true, {}, cx.data);
						} else {
							// wait for article data before appending, otherwise there is risk of video data being overwritten
							webmd.fundedEditorial.segments[segIndex].data.listen(function(passedValue) {
								if (passedValue === 'true') {
									webmd.fundedEditorial.segments[segIndex].articleData.program.videoPlaylistData = $.extend(true, {}, cx.data);
								}
							});
						}
					}
				}
			});
		}

		function cleanData(el, objStr) {
			var data;
			
			//Cleanup string found in segmentedData (need to parse as JSON)
			data = el.replace(objStr, '');
			data = data.replace(/=/g, '');
			data = data.replace(/;/g, '');
			data = $.trim(data);
			data = $.parseJSON(data);

			return data;
		}

		function findInParsed(html, selector) {
			// Look for the selector 'script#articleData' inside the parsed HTML array
			// return the HTML DOM element if found
			var check = $(selector, html).get(0);

			if (check) {
				return $(check);
			}

			check = $(html).filter(selector).get(0);

			return (check) ? $(check) : false;
		}
	},

	bindEvents: function() {
		var self = this,
			marquee = $('.marquee').length > 0,
			$htmlTag = $('html'),
			oldY = 0;

		$(window).load(function() {
			self.centerAds(['.bottom_ad_rdr', '#rightAd_rdr']); //pass specific ad identifiers for centering as array

			self.scrollTo(true, null, 90, true, true, false); // scroll using URL hash
		});

		$(window).on('scroll touchstart touchmove touchend', function() {
			var y = $(this).scrollTop();

			if (y > oldY){
				// downscroll
				$htmlTag.removeClass('scroll-up').addClass('scroll-down');
			} else if (y < oldY) {
				// upscroll code
				$htmlTag.removeClass('scroll-down').addClass('scroll-up');
			}
			oldY = y;

			if (!marquee) {
				setTimeout(function() {
					self.doStickyToolbar();
				}, 10);
			}
		});

		return self;
	},

	doStickyToolbar: function() {
		var self = this,
			y = $(document).scrollTop(),
			$toolBarContentPane = $('.attrib_right_fmt').length ? $('.attrib_right_fmt') : $('#fed-sharebar'),
			$toolbar = $('.wbmd-toolbar-menu'),
			paddles = $('.wbmd-paddles .show').length > 0,
			isi = $('.isi').not('.isi.hide').length > 0;

		if (y > $toolBarContentPane.closest('div.pane').offset().top && !paddles && !isi) {
			$toolbar.css('top',0);
		} else {
			$toolbar.css('top',-54);
		}

		return self;
	},

	centerAds: function(identifiers) {
		var self = this,
			$ads;

		if (window.s_business_reference !== "TOC" && !$('html.move-ad').length) { // do not center ads on TOC or Infinite Article
			for (var i=0; i<identifiers.length; i++) {
				$ads = $(identifiers[i]);
				centerMe($ads);
			}
		}

		function centerMe(adArr) {
			$.each(adArr, function() {
				var $ad = $(this),
					adWidth = $ad.outerWidth();

				$ad.closest('.section').addClass('center-ad');

				$ad.css({
					'position' : 'relative',
					'width' : adWidth + 'px',
					'left' : '50%',
					'marginLeft' : (adWidth / -2) + 'px',
					'marginBottom' : '10px'
				});
			});
		}

		return;
	},

	scrollTo: function(urlHash, domEl, extPad, desktop, tablet, mobile) {
		/*
		 * Scrolls to the specified element on page
		 * @param {Boolean} on Indicates whether to use the URL hash value to scroll to (overrides elem param when on)
		 * @param {String} elem The element on which to scroll to
		 * @param {Number} value specifies extra padding (i.e. account fixed masthead or menu that may cover element)
		 * @param {Boolean} on Indicates scrolling will be enabled on desktop
		 * @param {Boolean} on Indicates scrolling will be enabled on tablet
		 * @param {Boolean} on Indicates scrolling will be enabled on mobile
		 *
		 * Examples ---
		 * URL Hash : scrollTo(true, null, 90, true, true, false);
		 * DOM Element : scrollTo(false, '.element', 90, true, true, false);
		 */

		var scrollInt,
			element = (urlHash) ? (location.hash || window.location.hash) : domEl;

		if (typeof element === 'string') {
			scrollInt = setInterval(function() {
				if ($(element).length > 0) {
					var position = $(element).offset().top - extPad;

					if ((desktop && (webmd.useragent.ua.type === 'desktop')) ||
						(tablet  && (webmd.useragent.ua.type === 'tablet' )) ||
						(mobile  && (webmd.useragent.ua.type === 'mobile' ))) {
						$('html, body').animate({ scrollTop: position }, 10);
					}

					clearInterval(scrollInt);
				}
			}, 100);
		}

		return false;
	},

	setupListener: function(objKey, fn) {
		objKey = (function() {
			var initVal,
				interceptors = [];

			function callInterceptors(newVal) {
				for (var i = 0; i < interceptors.length; i += 1) {
					interceptors[i](newVal);
				}
			}

			return {
				get value() {
					// user never has access to the private variable "initVal"
					// we can control what they get back from saying "webmd.fundedEditorial.rmqSlide.type"
					return initVal;
				},

				set value(newVal) {
					callInterceptors(newVal);
					initVal = newVal;
				},

				listen: function(fn) {
					if (typeof fn === 'function') {
						interceptors.push(fn);
					}
				}
			};
		}());

		objKey.listen(fn);

		return objKey;
	},

	stickMasthead: function(mastheadH) {
		$('body').addClass('masthead-stuck');
		$('body').css('padding-top', mastheadH);
	},

	unstickMasthead: function() {
		$('body').removeClass('masthead-stuck');
		$('body').css('padding-top', '');
	},

	moveAttribution: function() {
		$('#attribution_rdr').detach().appendTo('.masthead-right').addClass('animate-in');
	},

	fundedPages: function() {
		var social = $('#sharebar');

		this.setClass();

		if(social.length < 1){
			this.noSocial();
		}

		// Hide Elements
		$('.healthSolutions').hide();
	},

	noSocial: function(){
		$('html').addClass('funded-no-social');
	},

	setClass: function(){
		var busRef = window.s_business_reference || '',
			htmlClass;

		switch (busRef){
			case 'TOC':
				htmlClass = 'funded-editorial-toc';
				break;

			case 'Feature':
				htmlClass = 'funded-editorial-feature';
				break;

			case 'Medical Reference':
				htmlClass = 'funded-editorial-med-ref';
				break;

			case 'Tool - Slide Show':
				htmlClass = 'funded-editorial-slideshow';
				break;

			case 'Tool - RMQ':
				htmlClass = 'funded-editorial-rmq';
				break;

			case 'Feature - Video':
				htmlClass = 'funded-editorial-video';
				break;

			default:
				htmlClass = 'funded-editorial-no-bus-ref';
		}

		// Set Global Class
		$('html').addClass(htmlClass + ' funded-editorial');
	},

	stickIt: function() {
		$('#ContentPane30').hcSticky({
			wrapperClassName: 'wmd-sidebar-sticky',
			className: 'wmd-sticky',
			responsive: true,
			offResolutions: [-736],
			//followScroll : false,
			top: 60
		});
	},

	mobileNo : function(){
		// Add Mobile No class to HTML tag
		$('html').addClass('mobile_no');

		// Stop Pageview Call
		window.s_not_pageview = "y";

		/**
		 * If Brand Page we want to redirect them to a Restricted Page and Suppress Pageview calls
		 */
		if(s_topic === "4121"){

			// Stop Ads Call
			window.ads2_ignore = {all:true};

			// Redirect to Email Page
			var url = "http://www" + webmd.url.getLifecycle() + ".webmd.com/alerts/restricted",
				dctmId = window.s_unique_id;

			window.location.replace(url + "?dctmId=" + dctmId);
		}
		/**
		 * If it was our WebMD content and we dont want to show attribution or pass package names in omniture
		 */
		else {
			// Add Hide Branding class to HTML tag
			$('html').addClass('hide_branding');

			// Fire off Pageview once the document is done loading.
			// Also Reset some global variables
			$(function () {
				// Reset Global Vars
				window.s_sponsor_program = "";
				window.s_sponsor_brand = "";

				// Prop28
				s_md.prop28 = "";

				// Prop29
				s_md.prop29 = "";

				// Prop30
				var sPackageType = window.s_package_type.replace(/\-.*/,'').toLowerCase();
				s_md.prop30 = sPackageType += " - nosp";

				// Fire Pageview
				wmdPageview();
			});

		}

	},

	createSeeAllLink: function(selector) {
		var self = this,
			link = (self.articleData && self.articleData.program && self.articleData.program.seeAllLink) ? self.articleData.program.seeAllLink : 'see-all',
			text = (self.articleData && self.articleData.program && self.articleData.program.seeAllText) ? self.articleData.program.seeAllText : "See All",
			html = '<div class="see-all-link" data-metrics-module="ed-rspsvseeall"><a href="' + link + '">' + text + '</a></div>';

		$(selector).last().append(html);
	},

	tocTiles: {

		gridItemClass: 'wbmd-grid-item', // class name on each <div> provided by the XSL
		contentPanes: {},
		masonryGutter: 10, // space between tiles
		numPanes_layoutComplete: 0, // counter

		init: function() {
			var self = this;

			if (typeof webmd.fundedEditorial.articleData !== 'undefined') {

				self.article_data = $.extend(false, {}, webmd.fundedEditorial.articleData);

				if (webmd.fundedEditorial.segments && webmd.fundedEditorial.segments.length > 0) {
					self.createTocSegment();
				} else {
					if(webmd.useragent.getType() == 'mobile'){
						$('.no-mobile').remove();
					} else {
						$('.no-desktop').remove();
					}
					self.start();
				}

				self.bind_tocEvents();
			}

			return self;
		},

		start: function() {
			var self = this,
				$nodes = $('.' + self.gridItemClass);

			// Setup keys in self.contentPanes object
			$.each($nodes, function() {
				var $node = $(this), // use the node from XSL
					contentPaneId = $node.closest('div.pane')[0].id, // get the id of the parent content pane
					$childNodes,
					articlePos = 0;

				// Continue to setup key and nodes if not already in object
				if (!(contentPaneId in self.contentPanes)) {
					self.contentPanes[contentPaneId] = {
						'nodes': [],
						'msnry': null
					}; // Set content pane id as key in self.contentPanes

					$childNodes = $('#' + contentPaneId).children('div');

					$.each($childNodes, function() {
						var $child = $(this),
							childId = $child.attr('id');

						if (!$child.hasClass('moduleSpacer_rdr')) {
							if (!$child.hasClass('promoted-segment-article')) { // promoted segment setup separately
								if ($child.hasClass('msnry-article')) {
									articlePos = articlePos + 1;
									self.setupChild($child, articlePos);
								} else {
									self.setupChild($child, false);
								}
							}

							self.contentPanes[contentPaneId].nodes.push({
								'node': $child
							});
						}
					});
				}
			});

			self.createGridWrapper();
		},

		createTocSegment: function() {
			var self = this,
				$tocSegmentContentPane = $('.wbmd-toc-segments').closest('div.pane'),
				$tocSegmentGridWrapper = $('<div></div>'),
				metricsModuleName = $('.wbmd-toc-segments').data('metricsModule'),
				complete = 0,
				segmentModules = new Array(webmd.fundedEditorial.segments.length);

			if (!$tocSegmentContentPane) {
				return;
			}

			$tocSegmentContentPane.html('').addClass('scaling'); // remove everything from content pane to avoid masonry bugs

			$.each(webmd.fundedEditorial.segments, function(index, data) {
				var segmentNumber = index + 1;

				segmentModules[index] = [];

				this.data.listen(function(passedValue) {
					if (passedValue === true) {
						// Store segment in array (keep layout of segments in correct order)
						segmentModules[index] = createSegmentTiles(data, segmentModules[index], segmentNumber);
						complete++;

						if (complete === webmd.fundedEditorial.segments.length) {
							// Add segments to DOM before updating DOM (prevents undefined)
							$.each(segmentModules, function(index, nodes) {
								for (var i=0; i<nodes.length; i++) {
									$tocSegmentContentPane.append(segmentModules[index][i]);
								}
							});

							// Update DOM (classes, layouts, sizes, margins, etc.)
							self.start();
						}
					}
				});
			});

			function createSegmentTiles(segmentData, moduleArray, segmentNumber) {
				var $segmentTitle = $('<div></div>'),
					articles = segmentData.articleData.articles,
					promotedArticles = segmentData.promotedArticles;

				$segmentTitle.html(segmentData.articleData.program.title).addClass('wbmd-promo-seg-title');
				moduleArray.push($segmentTitle);

				$.each(promotedArticles, function(index, value) {
					var position = index + 1,
						articleNum = value + 1,
						$segmentTile = $('<div></div>'),
						$a = $('<a></a>'),
						$img = $('<img/>'),
						$p = $('<p></p>');

					for (var key in articles) {
						article = articles[key];
						articleIndex = articles.indexOf(article) + 1;

						if (articleIndex === articleNum) {
							$a.attr('href', article.link).attr('data-metrics-link', position);
							$img.attr({
								'src' : image_server_url + article.images.image493x335,
								'alt' : article.imageAlt
							});
							$p.html(article.title);

							$segmentTile
								.addClass(self.gridItemClass)
								.addClass('wbmd-promo-seg-tile')
								.attr({ 'data-metrics-module' : metricsModuleName + segmentNumber });

							if (article.visited) {
								$segmentTile.addClass('visited');
							}

							$segmentTile.append($a.append($img).append($p));

							moduleArray.push($segmentTile);
						}
					}
				});

				return moduleArray;
			}
		},

		setupChild: function($node, position) {
			var self = this,
				articles = self.article_data.articles,
				nodeId = $node.attr('id'),
				nodeArticleNum = $node.data('articleNum'),
				regEx_1col = new RegExp('1-col'),
				regEx_2col = new RegExp('2-col'),
				regEx_3col = new RegExp('3-col'),
				newline = '\n',
				articleId,
				article,
				articlePrefix,
				$a = $('<a></a>'),
				$img = $('<img/>'),
				$p = $('<p></p>');


			$node.addClass(self.gridItemClass); // adds the masonry grid item class to node

			if (!$node.hasClass('icm_wrap') && !$node.hasClass('dbm_wrap')) {
				$node.addClass('tile-width'); // default size for all editorial tiles in TOC that are not ICM or DBM

				if ($node.find('.poll').length) {
					$node.addClass('msnry-poll');
				}
			} else {
				if (typeof nodeId !== 'undefined' && nodeId !== null) {
					if (regEx_3col.test(nodeId)) {
						$node.addClass('tile-width-x3');
					} else if (regEx_2col.test(nodeId)) {
						$node.addClass('tile-width-x2');
					} else if (regEx_1col.test(nodeId)) {
						$node.addClass('tile-width');
					}
				}
			}

			for (var key in articles) {
				article = articles[key];
				articleIndex = articles.indexOf(article) + 1;
				articlePrefix = (article.sponsored) ? "From Our Sponsor" : "";

				if (articleIndex === nodeArticleNum) {
					$a.attr({ 'href' : article.link, 'data-metrics-link' : position });
					$img.attr({
						'src' : image_server_url + article.images.image493x335,
						'alt' : article.imageAlt
					});
					$p.html('<span class="sponsored">' + articlePrefix + '</span>' + article.title);

					$node.html('');
					$node.append($a.append($img).append($p));

					if (article.visited) {
						$node.addClass('visited');
					}

					return false;
				}
			}
		},

		createGridWrapper: function() {
			var self = this,
				contentPanes = self.contentPanes,
				wrapperClass = 'wbmd-masonry-container';

			for (var id in contentPanes) {
				var $gridDiv = $('<div></div>'),
					contentPane_html = $('#' + id).html();

				$gridDiv.addClass('wbmd-masonry-grid').html(contentPane_html);

				$('#' + id).html('').addClass(wrapperClass).append($gridDiv);
			}

			webmd.fundedEditorial.createSeeAllLink('.' + wrapperClass);

			self.createMasonry(false);
		},
		fixSingleTile: function(node) {
			var self = this,
				$node = $(node),
				nodeH = $node.outerHeight(),
				nodeW = $node.outerWidth(),
				multiplier = 1,
				gutter = self.masonryGutter,
				windowW = $(window).outerWidth(),
				btmMargin,
				newHeight;

			if (typeof $node === 'undefined' || $node === null) {
				return true;
			}

			if (!self.standardTileHeight) {
				self.standardTileHeight = $('.' + self.gridItemClass + '.msnry-article').outerHeight();
			}

			/* Need to use cssText in this section - $.css() does not work correctly with adding margin-bottom */
			if (!$node.attr('data-orig-csstext')) {
				$node.attr('data-orig-csstext', $node.attr('style'));
			}

			if (!$node.attr('data-orig-height')) {
				$node.attr('data-orig-height', nodeH);
			}

			if (windowW < 675 || $node.hasClass('wbmd-promo-seg-title')) {
				$node.css('cssText', $node.attr('data-orig-csstext'));
			} else {
				if (windowW < 1000 && nodeW >= 650) {
					$node.css('cssText', $node.attr('data-orig-csstext'));
				} else {
					nodeH = parseInt($node.attr('data-orig-height'));

					if (nodeH > self.standardTileHeight) {
						multiplier = getMultiplier(nodeH, self.standardTileHeight, gutter);
					}

					newHeight = ((self.standardTileHeight * multiplier) + (gutter * multiplier));
					btmMargin = newHeight - nodeH;

					$node.attr('style', $node.attr('data-orig-csstext') + ' margin-bottom: ' + btmMargin + 'px !important');
				}
			}

			function getMultiplier(nodeHeight, standardTileHeight, gutter) {
				var sTileH_plus_gutter = standardTileHeight + gutter;

				for (var i = 1; i < 10; i++) {
					if ((nodeHeight === (sTileH_plus_gutter * i)) ||
						((nodeHeight > sTileH_plus_gutter) && (nodeHeight < (sTileH_plus_gutter * i)))) {
						return i; // multiplier found
					}
				}

				return 1; // no multiplier found, return 1 for standard height
			}
		},

		fixLayout: function() {
			var self = this;

			for (var id in self.contentPanes) {
				updateContentPane(id);
			}

			self.createMasonry(true);

			function updateContentPane(id) {
				$('div#' + id + '.pane.wbmd-masonry-container').find('.' + self.gridItemClass).each(function() {
					self.fixSingleTile(this);
				});
			}
		},

		createMasonry: function(resetLayout) {
			var self = this,
				contentPanes = self.contentPanes,
				gridItemClass = '.' + self.gridItemClass;


			for (var id in contentPanes) {
				createMasonryGrid(id);
			}

			function createMasonryGrid(id) {
				var numContentPanes = Object.keys(webmd.fundedEditorial.tocTiles.contentPanes).length;

				require(['masonry/1/masonry'], function(Masonry) {
					var contentPane = contentPanes[id],
						masonryGrid = '#' + id + ' .wbmd-masonry-grid';

					if (resetLayout) {
						contentPane.msnry.layout();
					} else {
						$(masonryGrid).imagesLoaded(function() {
							if ($('#' + id).hasClass('scaling')) {
								// segment module (scale tiles)
								contentPane.msnry = new Masonry(masonryGrid, {
									itemSelector: gridItemClass,
									columnWidth: '.tile-width',
									gutter: self.masonryGutter,
									percentPosition: true
								});
							} else {
								// standard TOC tiles (wrap tiles)
								$('#' + id).addClass('wrapping');
								contentPane.msnry = new Masonry(masonryGrid, {
									itemSelector: gridItemClass,
									columnWidth: '.tile-width',
									gutter: self.masonryGutter,
									isFitWidth: true,
									isResizable: true
								});
							}

							contentPane.msnry.on('layoutComplete', function(items) {
								// TOC Tiles load before Segment Tiles
								// Ads will only exist in TOC Tiles, not Segments
								// Perform the below only once, after TOC Tiles layout completes
								if (!contentPane.msnry_complete) {
									contentPane.msnry_complete = true;

									$.each(contentPane.nodes, function(index) {
										var $node = $(this.node);

										self.fixSingleTile($node);
									});

									contentPane.msnry.layout();
									self.numPanes_layoutComplete++;

									if (self.numPanes_layoutComplete === numContentPanes) {
										webmd.ads2.display();
									}
								}
							});

							contentPane.msnry.layout();
						});
					}

					// Set segment title to be 3 columns instead of 1
					$('.wbmd-promo-seg-title').removeClass('tile-width');
					$('.wbmd-promo-seg-title').addClass('tile-width-x3');
				});
			}

		},

		bind_tocEvents: function() {
			var self = this,
				origWinW = $(window).outerWidth();

			$(window).bind('resizeEnd', function() {
				origWinW = $(window).outerWidth();
				self.fixLayout();
			});

			$(window).on('resize orientationchange', function() {
				if (this.resizeTO) {
					clearTimeout(this.resizeTO);
				}

				this.resizeTO = setTimeout(function() {
					var newWinW = $(window).outerWidth();

					if ((origWinW < 980 && newWinW >= 980) || newWinW < 980) {
						$(this).trigger('resizeEnd');
					}
				}, 500);
			});

			$(window).load(function() {
				self.fixLayout();
			});
		}
	},

	createMenu: {
		menu: 'wbmd-slidein-menu',

		// Display in menu (top to bottom)
		menuElements: ['.branded-up-next-container', '.up-next-container', '.wbmd-upnext-segments'],

		init: function(createKabob) {

			var self = this;

			self.createKabob = createKabob;

			self.buildMenu();

			self.addElementsToMenu();

			self.bind_menuEvents();

			return self;
		},

		buildMenu: function() {
			var self = this,
				$menu = $('<div></div>');

			$menu.attr({
				id: self.menu
			}).addClass('no-scroll');

			$('body').append($menu);

			return self;
		},

		addElementsToMenu: function() {
			var self = this,
				$menu = $('#' + self.menu),
				$menuClose = $('<div></div>'),
				$menuContent = $('<div></div>'),
				$el;

			$menuClose.addClass('wbmd-menu-close').html('<span></span>');

			$menuContent.addClass('wbmd-menu-content').addClass('scroll');

			for (var i = 0; i < self.menuElements.length; i++) {
				$el = $(self.menuElements[i]).clone() || $(self.menuElements[i])[0].clone();

				$el.addClass('clone');

				if (!$el.hasClass('hide')) {
					$el.show();
					$menuContent.append($el);
				}
			}

			$menu.append($menuClose);
			$menu.append($menuContent);
			self.createStickyContainer();

			return self;
		},

		createStickyContainer: function() {
			var self = this,
				$locator = ($('.attrib_right_fmt').length) ? $('.attrib_right_fmt') : $('#fed-sharebar'),
				$contentPane = $locator.closest('div.pane'),
				menu = '<div class="wbmd-toolbar-menu"><div class="tools">' +
						'	<div class="webmd-logo" data-metrics-module=""><a href="http://www.webmd.com" data-metrics-link="logo"><img src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/masthead2015/logo-webmd-site.png"  alt="WebMD: Better information. Better health." title="WebMD: Better information. Better health." /></a></div>' +
						'	<div class="title"></div>' +
						'	<div class="share"></div>' +
						'	<div class="attribution"></div>' +
						'	<div class="client-logo"><div></div></div>' +
						'</div></div>';

			$contentPane.prepend(menu);

			$contentPane.find('.title').append($('.page-header h1').clone(), $('#rmq_header h2').clone());
			$contentPane.find('.share').append($('#fed-sharebar').clone(true));

			if ( $contentPane.find('.attrib_right_fmt').length ) {
				self.attachAttribution($contentPane);
			} else {
				$('html').addClass('no-attribution');
			}

			if (this.createKabob) {
				self.addKabob($contentPane.attr('id'));
			}
		},

		attachAttribution: function($cp) {
			require(['tooltips/1/tooltips'], function(tooltip) {
				var $attribLink;

				$cp.find('.attribution').append($('.attrib_right_fmt a').clone());
				$cp.find('.client-logo div').append($('.attrib_right_fmt img').clone());

				$attribLink = $cp.find(".attribution a");
				$attribLink.attr("href", $attribLink.attr("href").replace(/\s/g, ''));
				$attribLink.webmdTooltip({
					ajax:true,
					content:{
						button:true
					},
					trigger:"click",
					position:{
						corner:{
							target:"bottom"
						}
					},
					api: {
						onShow: function(){
							wmdPageLink('attribution');
						}
					}
				});
			});
		},

		addKabob: function(id) {
			$('.wbmd-toolbar-menu .tools').add('#' + id).append('<div class="wbmd-kabob"><span></span></div>');

			return this;
		},

		bind_menuEvents: function() {
			var self = this,
				$body = $('body'),
				lastScrollPos;

			$('.wbmd-kabob').click(function (evt) {
				evt.stopPropagation();
				evt.preventDefault();

				$('#' + self.menu).addClass('show');

				$body.addClass('no-scroll');

				// iOS does not work well with overflow hidden on body
				// track last scroll position before setting body to fixed position
				lastScrollPos = $('body').scrollTop();

				// set timeout to allow menu to display before setting body to fixed position
				// this avoid seeing a jump in the body prior to the menu appearing
				setTimeout(function() {
					$body.addClass('menu-open').trigger('kabobClick');
				}, 500);
			});

			$('.wbmd-menu-close').click(function(evt) {
				evt.stopPropagation();
				evt.preventDefault();

				$('#' + self.menu).removeClass('show');

				$body.removeClass('menu-open');

				$body.removeClass('no-scroll').trigger('kabobClick');

				// removing the fixed position on body allows scrolling
				// return to the last position of the page prior to the menu being opened
				window.scrollTo(0, lastScrollPos);
			});
		}
	}
};

// Check to see if Page should be seen on Mobile
// We set a value in the Client Brand Program Name that says MobileNo.
// If it has this flag we suppress the pageview and ad calls. We
// then redirect them to a restricted page.
if(typeof s_sponsor_program !== 'undefined' && s_sponsor_program.indexOf('MobileNo') > -1 && webmd.useragent.getType() == 'mobile'){
	webmd.fundedEditorial.mobileNoFlag = true;
	webmd.fundedEditorial.mobileNo();
}

$(function() {
	webmd.fundedEditorial.init();
});