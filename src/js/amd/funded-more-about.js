var webmd;

if (!webmd) {
	webmd = {};
}

webmd.fundedEditorial.moreAbout = {

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
		self.moveTitleToTop();
	},

	setupChild: function($node) {
		var self = this,
			nodeArticleNum = $node.data('articleNum'),
			articles = self.article_data.articles,
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
			articleIndex = articles.indexOf(article) + 1;
			articlePrefix = (article.sponsored) ? "From Our Sponsor" : "";

			if (articleIndex === nodeArticleNum) {
				$node.html(
					'<a href="' + article.link + '">' + newline +
					'   <img src="' + image_server_url + article.images.image493x335 + '">' + newline +
					'   <p>' + '<span>' + articlePrefix + '</span>' + newline + article.title + '</p>' + newline +
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

	moveTitleToTop: function() {
		var self = this,
			contentPanes = self.contentPanes,
			$h3;

		for (var id in contentPanes) {
			$h3 = $('#' + id + ' h3.wbmd-moreabout-title') || $('<h3></h3>');

			if (!$h3.text()) {
				$h3.text('More About');
			}

			if (!$h3.hasClass('wbmd-moreabout-title')) {
				$h3.addClass('wbmd-moreabout-title');
				$('div#' + id + '.pane.wbmd-moreabout-masonry-container').prepend($h3);
			} else {
				$h3.parent().before($h3);
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

	render: function() { // uses handlebars template above
		var self = this;

		self.article_data = webmd.fundedEditorial.articleData;

		self.start();

		self.createMasonry(false);

		self.bindEvents();
	}
};

$(function() {
	webmd.fundedEditorial.moreAbout.init();
});
