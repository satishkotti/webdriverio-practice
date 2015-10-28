var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.brandedNavigation = {
	articles_to_display: $('.branded-nav-container').data('linkCount'), 	// number of articles 
	display_see_all: true,
	article_ids_to_display: [],
	article_data: {"articles":[]},
	disable_on_pages: ['funded-editorial-toc', 'poll-results', 'funded-editorial-see-all'],

	init : function() {
		if (this.articles_to_display <= 0 || this.checkIfDisabled()) {
			$('.branded-nav-container').remove(); // remove placeholder created by XSL
			webmd.fundedEditorial.createMenu.init(false); // setup toolbar (no kabob)
			return false;
		}

		this.getArticleLinks();

		this.setSeeAllLink();
		
		this.render();
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

	setSeeAllLink : function() {
		var articles = webmd.fundedEditorial.articleData.articles,
			$seeAllContainer = $('.branded-nav-container > .wbmd-see-all'),
			$a = $('<a></a>'),
			overrideText = /*webmd.fundedEditorial.articleData.program.seeAllText*/'',
			linkText = (overrideText.length > 0) ? overrideText : "SEE ALL",
			linkUrl = webmd.fundedEditorial.articleData.program.seeAllLink + '#see-all-spon',
			count = 0;

		for (var i=0; i<articles.length; i++) {
			if (articles[i].sponsored) {
				count++;
			}
		}

		if (count > this.articles_to_display) {
			$a.attr({ href : linkUrl }).html(linkText);
			$seeAllContainer.append($a).show();
		}

		return;
	},

	getArticleLinks : function() {
		var self = this,
			article_data = webmd.fundedEditorial.articleData,
			articles = article_data.articles,
			caIndex = webmd.fundedEditorial.articleData.currentArticle,
			article, articleIndex, articleIdArrLen;

		for(var key in articles) {
			article = articles[key];
			articleIndex = articles.indexOf(article);
			articleIdArrLen = self.article_ids_to_display.length;

			if (article.sponsored) {
				if ((articleIndex > caIndex) && (articleIdArrLen < self.articles_to_display)) {
						self.article_data.articles.push({"article" : article});
						self.article_ids_to_display.push(articleIndex);
				}
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

				if (article.sponsored && !articleExists && (self.article_ids_to_display.length < self.articles_to_display)) {
					if (!article.isCurrent) {
						self.article_data.articles.push({article : article});
						self.article_ids_to_display.push(articleIndex);
					}
				}
			}

			self.articles_to_display = self.article_ids_to_display.length;
		}
	},

	bindEvents: function() {
		$(window).load(function() {
			webmd.fundedEditorial.createMenu.init(true); // setup toolbar (with kabob)
		});
	},

	render: function() {
		var self = this,
			$container = $(".branded-nav-container > .wbmd-nav-links"),
			links;

		links = createArticleLinkNodes();

		$.each(links, function() {
			$container.append(this);
		});

		self.bindEvents();

		// Do no create module if not enough articles in data object
		
		function createArticleLinkNodes() {
			var articles_len = self.article_data.articles.length,
				nodes = [],
				article;

			for (var i=0; i<articles_len; i++) {
				article = self.article_data.articles[i].article;
				link = $('<a></a>');
				link.attr({ href : article.link });
				link.html(article.title);
				nodes.push(link);
			}

			return nodes;
		}
	}
};

$(function() {
    webmd.fundedEditorial.brandedNavigation.init();
});