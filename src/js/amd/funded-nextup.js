var webmd;

if(!webmd){
	webmd = {};
}

webmd.fundedEditorial.nextUp = {

	articles_to_display: $('.article-list-container').data('linkCount'), 	// number of articles 
	article_ids_to_display: [],
	article_data: {"articles":[]},

	init : function(){
		if (this.articles_to_display <= 0) {
			$('.article-list-container').addClass('hide');
			return;
		}

		this.setSegmentTitle();

		if (this.articles_to_display >= 8) {
			this.setSeeAllLink();
		}

		this.getArticleLinks();
		this.render();
	},

	setSegmentTitle : function() {
		var segmentTitle = webmd.fundedEditorial.articleData.program.title;

		$('.article-list-container > .wbmd-title').html(segmentTitle);
	},

	setSeeAllLink : function() {
		var $seeAllContainer = $('.article-list-container > .wbmd-see-all'),
			$a = $('<a></a>'),
			overrideText = /*webmd.fundedEditorial.articleData.program.seeAllText*/'',
			linkText = (overrideText.length > 0) ? overrideText : "SEE ALL",
			linkUrl = webmd.fundedEditorial.articleData.program.seeAllLink + '#see-all-non-spon';

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

			if (!article.sponsored) {
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

				if (!article.sponsored && !articleExists && (self.article_ids_to_display.length < self.articles_to_display)) {
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
			$container = $(".article-list-container > .wbmd-nav-links"),
			links;

		links = createArticleLinkNodes();

		$.each(links, function() {
			$container.append(this);
		});

		// Do no create module if not enough articles in data object
		
		function createArticleLinkNodes() {
			var articles_len = self.article_data.articles.length,
				nodes = [],
				article,
				articleType,
				$div,
				$type,
				$link;

			for (var i=0; i<articles_len; i++) {
				article = self.article_data.articles[i].article;
				articleType = getType(self.article_data.articles[i].article.type);
				$div = $('<div></div>');
				$type = $('<div></div>');
				$type.addClass('wbmd-type').html(articleType);
				$link = $('<a></a>');
				$link.attr({ href : article.link });
				$link.html(article.title);
				$div.append($type).append($link);
				nodes.push($div);
			}

			return nodes;
		}

		function getType(type) {
			var val = '';

			switch (type) {
				case "type_art":
					val = "Article";
					break;
				case "type_ss":
					val = "Slideshow";
					break;
				case "type_toc":
					val = "Destination";
					break;
				case "type_com":
					val = "Blog";
					break;
				case "type_vid":
					val = "Video";
					break;
				case "type_rmq":
					val = "Quiz";
					break;
				default:
					break;
			}

			return val;
		}
	}
};

$(function() {
	webmd.fundedEditorial.nextUp.init();
});
