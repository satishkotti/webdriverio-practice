var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.brandedNavigation = {
	articles_to_display: $('.branded-nav-container').data('linkCount'), 	// number of articles 
	display_see_all: true,
	article_ids_to_display: [],
	article_data: {"articles":[]},

	init : function() {
		if (this.articles_to_display <= 0) {
			$('.branded-nav-container').addClass('hide');
			return;
		}

		this.setBrandColor();

		if (this.articles_to_display >= 4) {
			this.setSeeAllLink();
		}

		this.getArticleLinks();
		this.render();
	},

	setBrandColor: function() {
		var containerColor = $('.branded-nav-container').data('color'),
			$brand = $('.branded-nav-container > .wbmd-brand'),
			$title = $('.branded-nav-container > .wbmd-title');

		if (!containerColor || typeof containerColor === 'undefined' || containerColor === null) {
			containerColor = "#000000";
		}
		
		$brand.css('color', containerColor);
		$title.css('color', containerColor);
	},

	setSeeAllLink : function() {
		var $seeAllContainer = $('.branded-nav-container > .wbmd-see-all'),
			$a = $('<a></a>'),
			overrideText = /*webmd.fundedEditorial.articleData.program.seeAllText*/'',
			linkText = (overrideText.length > 0) ? overrideText : "SEE ALL",
			linkUrl = webmd.fundedEditorial.articleData.program.seeAllLink + '#see-all-spon';

		$a.attr({ href : linkUrl }).html(linkText);

		$seeAllContainer.append($a).show();
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

	render: function() {
		var self = this,
			$container = $(".branded-nav-container > .wbmd-nav-links"),
			links;

		links = createArticleLinkNodes();

		$.each(links, function() {
			$container.append(this);
		});

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