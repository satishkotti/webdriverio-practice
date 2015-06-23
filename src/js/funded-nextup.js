var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedNextUp = {

    init : function(){
        this.articles_to_display = 3;

        this.hide_sponsor_pages = false;

        this.article_ids_to_display = [];

        this.nextup_article_data = {articles:[]};

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
                '{{#article_data}}' + newline +
                '<ul class="article-list">' + newline +
                '   <li class="up-next-header">Up Next</li>' + newline +
                '   <li>' + newline +
                '       <ul class="articles">' + newline +
                '           {{#each articles}}' + newline +
                '           <li class="{{#if article.visited}}visited{{/if}}">' + newline +
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
                '{{/article_data}}'
            );

        $('head').append($script);
    },

    setCurrentArticle : function() {
        var self = this,
            url = window.location.href,
            current_url = url.split("?")[0].split("#")[0], // remove querystring and hash from url
            articles = article_data.articles,
            article;

        for(var key in articles) {
            article = articles[key].article;
            articles[key].current = false;

            if (article.link === current_url) {
                article_data.current_article_id = articles[key].id;
                articles[key].current = true;

                if (articles[key].sponsored) {
                    self.checkSponsoredArticle = true;
                } 
            }
        }
    },

    addToSessionHistory : function(url) {
        var self = this,
            jsonStr = sessionStorage.visitedPages || '{}',
            visitedObj = JSON.parse(jsonStr),
            urlExists = false;

        for (key in visitedObj.visited) {
            if (visitedObj.visited[key].page === url) {
                urlExists = true;
                break;
            }
        }

        if (!urlExists && url) {
            visitedObj["visited"].push({"page" : url});
        }
        
        this.setArticlesVisited(visitedObj);

        sessionStorage.visitedPages = JSON.stringify(visitedObj);
    },

    setArticlesVisited : function(history) {
        var self = this,
            article,
            article_link,
            history_page;

        for (var key in article_data.articles) {
            article = article_data.articles[key].article;
            article_link = article.link;

            for(var j in history.visited) {
                history_page = history_link = history.visited[j].page;
                article.visited = false;

                if (article_link === history_page) {
                    article.visited = true;
                }
            }
        }
    },

    setNextUpArticles : function() {
        var self = this,
            articles = article_data.articles,
            article,
            articleIdArrLen;

        for(var key in articles) {
            article = articles[key].article;
            articleIdArrLen = self.article_ids_to_display.length;

            if (self.hide_sponsor_pages) {
                if (!articles[key].sponsored &&
                    (articles[key].id > article_data.current_article_id) &&
                    (articleIdArrLen < self.articles_to_display)) {
                        self.nextup_article_data["articles"].push({"article" : article});
                        self.article_ids_to_display.push(articles[key].id);
                }
            } else {
                if ((articles[key].id > article_data.current_article_id) &&
                    (articleIdArrLen < self.articles_to_display)) {
                        self.nextup_article_data["articles"].push({"article" : article});
                        self.article_ids_to_display.push(articles[key].id);
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
                currentArticle;

            for(var key in article_data.articles) {
                articleExists = (self.article_ids_to_display.indexOf(articles[key].id) != -1);
                currentArticle = (articles[key].id === article_data.current_article_id);

                if (!articleExists && (self.article_ids_to_display.length < self.articles_to_display)) {
                    if (self.hide_sponsor_pages) {
                        if (!articles[key].sponsored && !currentArticle) {
                            self.nextup_article_data["articles"].push({article : articles[key].article});
                            self.article_ids_to_display.push(articles[key].id);
                        }
                    } else {
                        if (!currentArticle) {
                            self.nextup_article_data["articles"].push({article : articles[key].article});
                            self.article_ids_to_display.push(articles[key].id);
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

        if (typeof article_data !== "undefined") {
            
            self.setCurrentArticle();

            self.addToSessionHistory();

            if (self.checkSponsoredArticle) {
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
                            context = {"article_data" : self.nextup_article_data} || {},
                            html = template(context);

                        $container.prepend(html);

                        self.bindEvents();
                    });
                }
            }
        }
    }
};

$(function() {
    webmd.fundedNextUp.init();
});
