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
			self.moveAttribution();
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

			$('#toolbar').prepend($div);
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
								'<th>Id</th>' + newline +
								'<th>Title</th>' + newline +
								'<th>Description</th>' + newline +
								'<th>URL</th>' + newline +
								'<th>Image</th>' + newline +
								'<th>Funded</th>' + newline +
								'<th>Sponsored</th>' + newline +
								'<th>Type</th>' + newline +
							'</tr>' + newline +
						'</thead>' + newline +
						'<tbody>' + newline +
							'{{#each articles}}' + newline +
							'<tr>' + newline +
								'<td class="dctm cnt-mid">{{id}}</td>' + newline +
								'<td class="title mid">{{title}}</td>' + newline +
								'<td class="desc mid">{{description}}</td>' + newline +
								'<td class="link mid"><a href="{{link}}" target="_blank">{{link}}</a></td>' + newline +
								'<td class="img cnt-mid"><img src="' + window.image_server_url + '{{images.image79x79}}" alt=""></td>' + newline +
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

	bindEvents: function() {
		var self = this,
			mastheadH = $('.masthead').outerHeight(true);

		$(window).scroll(function() {
			var y = $(document).scrollTop();

			if (y > mastheadH) {
				self.stickMasthead(mastheadH);
			} else {
				self.unstickMasthead();
			}
		});

		$(window).load(function() {
			webmd.scrollTo(true, null, 90, true, true, false);
		});

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
		webmd.scrollTo = function(urlHash, domEl, extPad, desktop, tablet, mobile) {
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
		};

		return self;
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
		// Set Global Class
		$('html').addClass('funded-editorial');

		// Hide Elements
		$('.healthSolutions').hide();
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

	tocTiles: {

		gridItemClass: 'wbmd-grid-item', // class name on each <div> provided by the XSL
		adIDarray: ['#bannerAd_fmt', '#leftAd_fmt', '#rightAd_fmt', '#slideshow_ad_300x250', '#cw_btm_ad_300x250', '#rmqAd_fmt'], // list of AD id's that might be placed inside the TOC
		contentPanes: {},
		masonryGutter: 10,

		init: function() {
			this.toc_render();
		},

		start: function() {
			var self = this,
				$nodes = $('.' + self.gridItemClass);

			// Setup keys in self.contentPanes object
			$.each($nodes, function() {
				var $node = $(this), // use the node from XSL
					contentPaneId = $node.closest('div.pane')[0].id, // get the id of the parent content pane
					$childNodes;

				// Continue to setup key and nodes if not already in object
				if (!(contentPaneId in self.contentPanes)) {
					self.contentPanes[contentPaneId] = {
						'nodes': [],
						'msnry': null
					}; // Set content pane id as key in self.contentPanes

					$childNodes = $('#' + contentPaneId).children('div');

					$.each($childNodes, function(index) {
						var $child = $(this);

						if (!$child.hasClass('moduleSpacer_rdr')) {
							self.setupChild($child, index+1);

							//self.allNodes.push(this); //temporary - use the below line instead
							self.contentPanes[contentPaneId].nodes.push({
								'node': $child
							});
						}
					});
				}
			});

			self.createGridWrapper();
		},

		setupChild: function($node, position) {
			var self = this,
				nodeId = $node.attr('id'),
				nodeArticleNum = $node.data('articleNum'),
				regEx_1col = new RegExp('1-col'),
				regEx_2col = new RegExp('2-col'),
				regEx_3col = new RegExp('3-col'),
				articles = self.article_data.articles,
				newline = '\n',
				articleId,
				article;


			$node.addClass('wbmd-grid-item'); // adds the masonry grid item class to node

			if (!$node.hasClass('icm_wrap') && !$node.hasClass('dbm_wrap')) {
				$node.addClass('tile-width'); // default size for all editorial tiles in TOC that are not ICM or DBM
			} else {
				if (nodeId) {
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

				if (articleIndex === nodeArticleNum) {
					$node.html(
						'<a href="' + article.link + '" data-metrics="' + position + '_' + nodeArticleNum + '">' + newline +
							'<img src="' + image_server_url + article.images.image493x335 + '">' + newline +
							'<p>' + article.title + '</p>' + newline +
						'</a>' + newline
					);

					if (article.visited) {
						$node.addClass('visited');
					}

					return false;
				}
			}
		},

		createGridWrapper: function() {
			var self = this,
				contentPanes = self.contentPanes;

			for (var id in contentPanes) {
				var $gridDiv = $('<div></div>'),
					contentPane_html = $('#' + id).html();

				$gridDiv.addClass('wbmd-masonry-grid').html(contentPane_html);

				$('#' + id).html('').addClass('wbmd-masonry-container').append($gridDiv);
			}

			return true;
		},

		fixLayout: function() {
			var self = this,
				adArray = self.adIDarray,
				gutter = self.masonryGutter,
				windowW = $(window).outerWidth(),
				standardTileHeight,
				newHeight;

			if (!standardTileHeight) {
				standardTileHeight = $('.wbmd-grid-item:not(.icm_wrap):not(.dbm_wrap)').outerHeight();
			}

			for (var id in self.contentPanes) {
				updateContentPane(id);
			}

			self.createMasonry(true);


			function updateContentPane(id) {
				$('div#' + id + '.pane.wbmd-masonry-container').find('.wbmd-grid-item').each(function() {
					var $node = $(this),
						nodeH = $node.outerHeight(),
						nodeW = $node.outerWidth(),
						multiplier = 1,
						btmMargin;

					/* Need to use cssText in this section - $.css() does not work correctly with adding margin-bottom */
					if (!$node.attr('data-orig-csstext')) {
						$node.attr('data-orig-csstext', $node.attr('style'));
					}

					if (!$node.attr('data-orig-left')) {
						$node.attr('data-orig-left', $node.position().left + 'px');
					}

					if (!$node.attr('data-orig-height')) {
						$node.attr('data-orig-height', nodeH);
					}

					if ($node.is('.icm_wrap,.dbm_wrap') || $node.children().is('.icm_wrap,.dbm_wrap')) {
						multiplier = Math.round((nodeH / standardTileHeight * 100) / 100);
						btmMargin = Math.ceil((standardTileHeight * multiplier) + (gutter * multiplier) - nodeH);

						if (windowW < 1000 && nodeW >= 650) {
							$node.attr('style', $node.attr('data-orig-csstext'));
						} else {
							if (windowW >= 650) {
								$node.attr('style', $node.attr('style') + ' margin-bottom: ' + btmMargin + 'px !important');
							} else {
								$node.attr('style', $node.attr('data-orig-csstext'));
							}
						}
					} else {
						nodeH = parseInt($node.attr('data-orig-height'));

						if (nodeH > standardTileHeight) {
							if ((nodeH === (standardTileHeight * 2)) ||
								((nodeH > standardTileHeight) && (nodeH < (standardTileHeight * 2)))) {
								multiplier = 2;
							} else if (
								(nodeH === (standardTileHeight * 3)) ||
								((nodeH > (standardTileHeight * 2)) && (nodeH < (standardTileHeight * 3)))) {
								multiplier = 3;
							} else if (
								(nodeH === (standardTileHeight * 4)) ||
								((nodeH > (standardTileHeight * 3)) && (nodeH < (standardTileHeight * 4)))) {
								multiplier = 4;
							} else if (
								(nodeH === (standardTileHeight * 5)) ||
								((nodeH > (standardTileHeight * 4)) && (nodeH < (standardTileHeight * 5)))) {
								multiplier = 5;
							} else if (
								(nodeH === (standardTileHeight * 6)) ||
								((nodeH > (standardTileHeight * 5)) && (nodeH < (standardTileHeight * 6)))) {
								multiplier = 6;
							} else {
								multiplier = 7;
							}
						}

						if (windowW > 675 && multiplier > 1) {
							newHeight = ((standardTileHeight * multiplier) + (gutter * multiplier)) - gutter;

							if (adArray.indexOf($node.attr('id')) !== -1) {
								btmMargin = newHeight - nodeH;
								$node.attr('style', $node.attr('style') + ' margin-bottom: ' + btmMargin + 'px !important');
							}
						} else {
							$node.css('cssText', $node.attr('data-orig-csstext'));
						}
					}
				});
			}
		},

		adjustPositions: function() {
			var self = this;

			for (var id in self.contentPanes) {
				fixNodesInPane(id);
			}

			function fixNodesInPane(id) {
				$('div#' + id + '.pane.wbmd-masonry-container').find('.wbmd-grid-item').each(function() {
					var $node = $(this),
						leftPos = $node.position().left + 'px';

					if ($node.attr('data-updated-csstext')) {
						$node.attr('style', $node.attr('data-updated-csstext'));
					} else if (leftPos !== $node.attr('data-orig-left')) {
						$node.css({ left : $node.attr('data-orig-left') });
						$node.attr('data-updated-csstext', $node.attr('style'));
					}
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
				require(['masonry/1/masonry'], function(Masonry) {
					var contentPane = contentPanes[id],
						masonryGrid = '#' + id + ' .wbmd-masonry-grid';

					if (resetLayout) {
						contentPane.msnry.layout();

						if ($(window).width() >= 980) {
							setTimeout(function() {
				            	self.adjustPositions();
				            }, 500);
						}
					} else {
						$(masonryGrid).imagesLoaded(function() {
							contentPane.msnry = new Masonry(masonryGrid, {
								itemSelector: gridItemClass,
								columnWidth: '.tile-width',
								gutter: self.masonryGutter,
								isFitWidth: true,
								isResizable: true
							});
						});
					}
				});
			}

		},

		metrics: function(id) {
			var self = this;

			webmd.metrics.dpv({
	            moduleName: id
	        });
		},

		bindEvents: function() {
			var self = this,
				origWinW = $(window).width();

			$('.wbmd-grid-item:not(.wbmd-tips) a').click(function(e) { // Ignore Tips Module Clicks
				var $el = $(e.currentTarget);

				var moduleName = $(this).closest('.wbmd-grid-item').data('moduleName'),
					metricsLink = $(this).data('metrics');

				self.metrics(moduleName + metricsLink);
			});

			$(window).bind('resizeEnd', function() {
				origWinW = $(window).width();
				self.fixLayout();
			});

			$(window).on('resize orientationchange', function() {
				if (this.resizeTO) {
					clearTimeout(this.resizeTO);
				}

				this.resizeTO = setTimeout(function() {
					var newWinW = $(window).width();

					if ((origWinW < 980 && newWinW >= 980) || newWinW < 980) {
						$(this).trigger('resizeEnd');
					}
				}, 500);
			});

        	$(window).load(function() {
        		self.fixLayout();
        	});

		},

		toc_render: function() { // uses handlebars template above
			var self = this;

			if (typeof webmd.fundedEditorial.articleData !== 'undefined') {

				self.article_data = webmd.fundedEditorial.articleData;

				self.start();

				self.createMasonry(false);

				self.bindEvents();
			}
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
	webmd.fundedEditorial.tocTiles.init();
});
