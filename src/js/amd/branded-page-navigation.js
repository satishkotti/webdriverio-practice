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

		this.getArticleLinks();

		this.setSeeAllLink();
		
		this.render();
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
		var self = this;

		webmd.fundedEditorial.brandedNavigation.domEl = (function() {
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

        webmd.fundedEditorial.brandedNavigation.domEl.listen(function(passedValue) {
            if (passedValue === true) {
				if (typeof webmd.fundedEditorial.createMenu !== 'undefined' && webmd.fundedEditorial.uaType === 'mobile') {
					webmd.fundedEditorial.createMenu.init();
				}
            }
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

		webmd.fundedEditorial.brandedNavigation.domEl.ready = true;

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