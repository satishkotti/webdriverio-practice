var webmd;

if(!webmd){
	webmd = {};
}

webmd.fundedEditorial.nextUp = {
	articleData: $.extend(false, {}, webmd.fundedEditorial.articleData),
	articles_to_display: $('.up-next-container').data('linkCount') || 3, 	// number of articles
	article_ids_to_display: [],
	article_data: {"articles":[]},
	hide_sponsor_pages: true,
	disable_on_pages: ['funded-editorial-toc', 'poll-results', 'funded-editorial-see-all'],

	init : function(){
		var self = this,
			current_url = window.location.href.split("?")[0].split("#")[0],
			articles;

		if (self.articles_to_display <= 0 || self.checkIfDisabled()) {
			$('.up-next-container').remove(); // remove placeholder created by XSL
			webmd.fundedEditorial.createMenu.init(false); // setup toolbar (no kabob)
			return false;
		}

		if (self.hide_sponsor_pages) {
			self.articleData.articles = self.articleData.articles.filter(function (el) {
				return el.sponsored !== true;
			});

			articles = self.articleData.articles;

			// sponsored content removed, re-determine previous, current and next articles
			$.each(articles, function(index) {
				this.isCurrent = false;

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
		}

		self.updateDOM();

		self.getArticleLinks();

		self.render();
	},

	checkIfDisabled: function() {
		var self = this,
			classNames = self.disable_on_pages;

		for (var i = 0; i < classNames.length; i++) {
			if ($('html').hasClass(classNames[i])) {
				return true;
			}
		}

		return false;
	},

	updateDOM : function() {
		var self = this,
			$segment = $('.up-next-container > .wbmd-segment'),
			segmentTitle = self.articleData.program.title,
			$subhead = $('.up-next-container > .wbmd-subhead'),
			subheadText = ($subhead.text().length > 0) ? $subhead.text() : "Next In The Series",
			articles = self.articleData.articles,
			$upnextContainer = $('.up-next-container'),
			$seeAllContainer = $('.up-next-container > .wbmd-see-all'),
			$seeAllVideoContainer = $('.wbmd-see-all-videos'),
			seeAllOverrideText = self.articleData.program.seeAllText,
			linkText = (seeAllOverrideText.length > 0) ? seeAllOverrideText : "See More",
			linkUrl = self.articleData.program.seeAllLink + '#see-all-non-spon',
			videoLinkText = (self.articleData.program.seeAllVideosText.length > 0) ? self.articleData.program.seeAllVideosText : 'Related Videos',
			videoLinkUrl = self.articleData.program.seeAllVideos,
			count = 0,
			$a;

		$segment.html(segmentTitle);
		$subhead.html(subheadText);

		for (var i=0; i<articles.length; i++) {
			if (!articles[i].sponsored) {
				count++;
			}
		}

		if (count > this.articles_to_display) {
			$a = $('<a></a>');
			$a.attr({ href : linkUrl }).html(linkText).attr('data-metrics-link', 'all');
			$seeAllContainer.append($a).show();
		}

		if (videoLinkUrl !== "" || videoLinkUrl){
			$a = $('<a></a>');
			$a.attr({ href : videoLinkUrl }).html(videoLinkText).attr('data-metrics-link', 'v-all');
			$seeAllVideoContainer.append($a).show();
			$upnextContainer.addClass('plus-video');
		}

		if (videoLinkUrl === "" || !videoLinkUrl){
			$seeAllVideoContainer.hide(); 
		}
	},

	getArticleLinks : function() {
		var self = this,
			articles = self.articleData.articles,
			caIndex = self.articleData.currentArticle,
			article, articleIndex, articleIdArrLen;

		for(var key in articles) {
			article = articles[key];
			articleIndex = articles.indexOf(article);
			articleIdArrLen = self.article_ids_to_display.length;

			if ((articleIndex > caIndex) && (articleIdArrLen < self.articles_to_display)) {
				self.article_data.articles.push({"article" : article});
				self.article_ids_to_display.push(articleIndex);
			}
		}

		// Check if the number of non-sponsored articles is equal to or greater
		// than the number of articles needed to display in the Up Next module
		//while (self.article_ids_to_display.length < self.articles_to_display) {
			loopArticleData();
		//}

		function loopArticleData() {
			var articleExists, articleIndex, article;

			for(var key in articles) {
				article = articles[key];
				articleIndex = articles.indexOf(article);
				articleExists = (self.article_ids_to_display.indexOf(articleIndex) != -1);

				if (!articleExists && (self.article_ids_to_display.length < self.articles_to_display)) {
					if (!article.isCurrent) {
						self.article_data.articles.push({article : article});
						self.article_ids_to_display.push(articleIndex);
					}
				}
			}

			self.articles_to_display = self.article_ids_to_display.length;
		}
	},

	addSegmentLinks: function() {
		var self = this,
			$segments = $('<div></div>'),
			segmentBlocks = new Array(webmd.fundedEditorial.segments.length),
			complete = 0;

		$segments.addClass('wbmd-upnext-segments').attr('data-metrics-module', 'lln-rspsvupnext-s');

		$.each(webmd.fundedEditorial.segments, function(index, data) {
			segmentBlocks[index] = [];

			webmd.fundedEditorial.segments[index].deferred.done(function() {
					createUpNextSegment(data, index);
					complete++;
					if (complete === webmd.fundedEditorial.segments.length) {
						$.each(segmentBlocks, function(index, nodes) {
							for (var i=0; i<nodes.length; i++) {
								$segments.append(nodes[i]);
							}
						});
						webmd.fundedEditorial.createMenu.init(true); // setup toolbar (with kabob)
					}

			});

		});

		$(".up-next-container").after($segments);

		function createUpNextSegment(segmentData, pos) {
			var $segmentContainer = $('<div></div>'),
				$segmentDiv = $('<div></div>'),
				$segmentTitle = $('<a></a>');

			$segmentTitle
				.addClass('wbmd-segment-title')
				.html(segmentData.articleData.program.title)
				.attr({
					'href' : segmentData.articleData.program.tocLink,
					'data-metrics-link' : pos+1
				});

			$segmentDiv
				.addClass('wbmd-segment')
				.append($segmentTitle);

			$segmentContainer
				.addClass('wbmd-segment-container animated fadeIn')
				.append($segmentDiv);

			segmentBlocks[pos].push($segmentContainer);

			$(".up-next-container").addClass('plus-segments');
		}
	},

	bindEvents: function() {
		if (!webmd.fundedEditorial.segments) {
			webmd.fundedEditorial.createMenu.init(true); // setup toolbar (with kabob)
		}
	},

	render: function() {
		var self = this,
			$container = $(".up-next-container > .wbmd-nav-links"),
			links;

		links = createArticleLinkNodes();

		$.each(links, function() {
			$container.append(this);
		});

		if (webmd.fundedEditorial.segments && webmd.fundedEditorial.segments.length > 0) {
			self.addSegmentLinks();
		}

		self.bindEvents();

		// Do no create module if not enough articles in data object

		function createArticleLinkNodes() {
			var articles_len = self.article_data.articles.length,
				nodes = [],
				article,
				$div,
				$link,
				position,
				articleId;

			for (var i=0; i<articles_len; i++) {
				article = self.article_data.articles[i].article;
				position = i + 1; // add 1 (i starts from 0)
				articleId = self.article_ids_to_display[i] + 1; // value inside array is from a 0 index array, add 1
				$div = $('<div></div>');
				$link = $('<a></a>');
				$link.attr({ href : article.link });
				$link.html(article.title);
				$link.attr('data-metrics-link', position);
				$div.append($link);
				nodes.push($div);
			}

			return nodes;
		}
	}
};

$(function() {
	webmd.fundedEditorial.nextUp.init();
});