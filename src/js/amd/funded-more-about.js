var webmd;

if (!webmd) {
	webmd = {};
}

webmd.fundedEditorial.moreAbout = {

	articleData: $.extend(false, {}, webmd.fundedEditorial.articleData),
	gridItemClass: 'wbmd-moreabout-grid-item', // class name on each <div> provided by the XSL
	contentPanes: {},
	masonryGutter: 10,
	gridType: 'scaling', // options: scaling, wrapping

	init: function() {
		this.render();
	},

	start: function() {
		var self = this,
			$nodes = $('.' + self.gridItemClass);

		// Setup keys in self.contentPanes object
		$.each($nodes, function(index) {
			var $node = $(this), // use the node from XSL
				contentPaneId = $node.closest('div.pane')[0].id, // get the id of the parent content pane
				contentPane,
				$childNodes;

			// Continue to setup key and nodes if not already in object
			if (!(contentPaneId in self.contentPanes)) {
				self.contentPanes[contentPaneId] = {
					'nodes': [],
					'msnry': null
				}; // Set content pane id as key in self.contentPanes

				contentPane = self.contentPanes[contentPaneId];

				$childNodes = $("#" + contentPaneId).children('div');

				$.each($childNodes, function(index) {
					var $child = $(this);

					if (!$child.hasClass('moduleSpacer_rdr')) {
						self.setupChild($child);

						//self.allNodes.push(this); //temporary - use the below line instead
						contentPane.nodes.push({
							'node': $child
						});
					}
				});
			}
		});

		self.createGridWrapper();

		self.moveToTop('.wbmd-moreabout-label');
		self.moveToTop('.wbmd-moreabout-title');
	},

	setupChild: function($node) {
		var self = this,
			nodeArticleNum = $node.data('articleNum'),
			articles = self.articleData.articles,
			newline = '\n',
			articleIndex,
			article,
			articlePrefix;

		$node.addClass('wbmd-moreabout-grid-item'); // adds the masonry grid item class to node

		if (self.gridType !== 'scaling') {
			$node.addClass('tile-width');
		}

		for (var key in articles) {
			article = articles[key];
			articleIndex = articles.indexOf(article) + 1; // article num set by editorial is not 0 relative like articles array, need to add 1
			articlePrefix = (article.sponsored) ? "From Our Sponsor" : "";

			if (articleIndex === nodeArticleNum) {
				$node.find('a').attr('href', article.link);
				$node.find('img').attr('src', image_server_url + article.images.image493x335);
				$node.find('p').html('<span class="sponsored">' + articlePrefix + '</span>' + article.title);

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
			var $containerDiv = $('#' + id),
				$gridDiv = $('<div></div>'),
				contentPane_html = $containerDiv.html();

			$gridDiv.addClass('wbmd-moreabout-masonry-grid').html(contentPane_html);

			$containerDiv.html('').addClass('wbmd-moreabout-masonry-container').append($gridDiv);

			if (self.gridType === 'scaling') {
				$containerDiv.addClass(self.gridType);
			} else {
				$containerDiv.addClass('wrapping');
			}
		}

		return true;
	},

	moveToTop: function(identifier) {
		var self = this,
			contentPanes = self.contentPanes,
			$el;

		for (var id in contentPanes) {
			$el = $('#' + id + ' ' + identifier);

			if ($el.is(':empty')) {
				$el.hide();
			} else {
				$el.parent().before($el);
			}
		}
	},

	bindEvents: function() {
		var self = this;

		$(window).bind('resizeEnd', function() {
			self.createMasonry(true);
		});

		$(window).on('resize orientationchange', function() {
			if (this.resizeTO) {
				clearTimeout(this.resizeTO);
			}

			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 500);
		});
	},

	createMasonry: function(resetLayout) {
		var self = this,
			contentPanes = self.contentPanes,
			gridItemClass = '.' + self.gridItemClass;


		for (var id in contentPanes) {
			createMasonryGrid(id);
		}

		function createMasonryGrid(id) {
			require(["masonry/1/masonry"], function(Masonry) {
				var contentPane = contentPanes[id],
					masonryGrid = "#" + id + ' .wbmd-moreabout-masonry-grid';

				if (resetLayout) {
					contentPane.msnry.layout();
				} else {
					$(masonryGrid).imagesLoaded(function() {
						if (self.gridType === 'scaling') {
							contentPane.msnry = new Masonry(masonryGrid, {
								itemSelector: gridItemClass,
								columnWidth: gridItemClass,
								percentPosition: true,
								gutter: 10
							});
						} else {
							contentPane.msnry = new Masonry(masonryGrid, {
								itemSelector: gridItemClass,
								columnWidth: gridItemClass,
								gutter: self.masonryGutter,
								isFitWidth: true,
								isResizable: true
							});
						}
					});
				}
			});
		}
	},

	checkLabel: function() {
		var self = this,
			currentArticleIndex = webmd.fundedEditorial.articleData.currentArticle,
			currentArticle;

		if (typeof currentArticleIndex !== 'undefined' && currentArticleIndex !== null) {
			currentArticle = webmd.fundedEditorial.articleData.articles[currentArticleIndex];

			if ('sponsored' in currentArticle) {
				if (currentArticle.sponsored) {
					$('.wbmd-moreabout-label').show();
				}
			}
		}
	},

	render: function() { // uses handlebars template above
		var self = this;

		self.start();

		self.createMasonry(false);

		self.checkLabel();

		self.bindEvents();
	}
};

$(function() {
	webmd.fundedEditorial.moreAbout.init();
});
