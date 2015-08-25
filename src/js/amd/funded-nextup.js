var webmd;

if(!webmd){
	webmd = {};
}

webmd.fundedEditorial.nextUp = {

	articles_to_display : 3,

	hide_sponsor_pages : false,

	hide_module_on_sponsor_pages : false,

	is_current_sponsored : false,

	article_ids_to_display : [],

	nextup_article_data : {"articles":[]},

	init : function(){
		this.render();
	},

	injectHBtemplateJS : function() { // inject embedded script to reduce http calls
		var self = this,
			$script = $('<script></script>'), 
			newline = '\n'; //allows readability using inspector

		$script
			.attr({
				id   : 'funded-nextup',
				type : 'text/x-handlebars-template'
			})
			.html(
				'{{#nextup_article_data}}' + newline +
				'<ul class="article-list">' + newline +
				'   <li class="up-next-header">Up Next</li>' + newline +
				'   <li>' + newline +
				'       <ul class="articles">' + newline +
				'           {{#each articles}}' + newline +
				//'           <li class="{{#if article.visited}}visited{{/if}}">' + newline +
				'           <li>' + newline +
				'               <a href="{{article.link}}">' + newline +
				'                   <span class="text">' + newline +
				'                       <span class="title">{{article.title}}</span>' + newline +
				'                   </span>' + newline +
				'               </a>' + newline +
				'           </li>' + newline +
				'           {{/each}}' + newline +
				'       </ul>' + newline +
				'   </li>' + newline +
				'</ul>' + newline +
				'{{/nextup_article_data}}'
			);

		$('head').append($script);
	},

	setNextUpArticles : function() {
		var self = this,
			article_data = webmd.fundedEditorial.articleData,
			articles = article_data.articles,
			article,
			articleIndex,
			articleIdArrLen;

		for(var key in articles) {
			article = articles[key];
			articleIndex = articles.indexOf(article);
			articleIdArrLen = self.article_ids_to_display.length;

			if ((articleIndex > webmd.fundedEditorial.articleData.currentArticle) &&
				(articleIdArrLen < self.articles_to_display)) {
				if (self.hide_sponsor_pages) {
					if (!articles[key].sponsored) {
						self.nextup_article_data.articles.push({"article" : article});
						self.article_ids_to_display.push(articleIndex);
					}
				} else {
					self.nextup_article_data.articles.push({"article" : article});
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
			var articleExists,
				articleIndex,
				article;

			for(var key in articles) {
				article = articles[key];
				articleIndex = articles.indexOf(article);
				articleExists = (self.article_ids_to_display.indexOf(articleIndex) != -1);

				if (!articleExists && (self.article_ids_to_display.length < self.articles_to_display)) {
					if (self.hide_sponsor_pages) {
						if (!article.sponsored && !article.isCurrent) {
							self.nextup_article_data.articles.push({article : article});
							self.article_ids_to_display.push(articleIndex);
						}
					} else {
						if (!article.isCurrent) {
							self.nextup_article_data.articles.push({article : article});
							self.article_ids_to_display.push(articleIndex);
						}
					}
				}
			}

			self.articles_to_display = self.article_ids_to_display.length;
		}
	},

	bindEvents : function() {
		var self = this;

		$('.articles li a').hover( // hide 2px border when hovering (remove if hover is not used)
			function() {
				$(this).closest("li").addClass("no-bottom-border");
				$(this).closest("li").prev().addClass("no-bottom-border");
			}, function() {
				$(this).closest("li").removeClass("no-bottom-border");
				$(this).closest("li").prev().removeClass("no-bottom-border");
			}
		);
	},

	render : function(){ // uses handlebars template above
		var self = this,
			next_up_articles_len;

		if (self.hide_module_on_sponsor_pages && self.is_current_sponsored) {
			return true;
		} else {
			self.setNextUpArticles();

			next_up_articles_len = self.nextup_article_data.articles.length;

			// Do no create module if not enough articles in data object
			if (next_up_articles_len > 0) {
				self.injectHBtemplateJS();

				require(["handlebars/1/handlebars"], function(Handlebars) {
					var $template = $("#funded-nextup"),
						$container = $(".article-list-container"),
						$articles = $(".articles"),
						source = $template.html(),
						template = Handlebars.compile(source),
						context = {"nextup_article_data" : self.nextup_article_data} || {},
						html = template(context);

					$container.prepend(html);

					self.bindEvents();
				});
			}
		}
	}
};

$(function() {
	webmd.fundedEditorial.nextUp.init();
});
