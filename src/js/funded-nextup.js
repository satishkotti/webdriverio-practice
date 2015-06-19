var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedNextUp = {

    articles_to_display : 3,

    displayed_articles : 0,
    nextup_article_data : {articles:[]},

    init : function(){

        this.injectHBtemplateJS();

        this.setCurrentArticle();

        this.addToSessionHistory();

        this.render();
    },

    injectHBtemplateJS : function() { // inject embedded script to reduce http calls
        var $script = $('<script></script>'), 
            newline = '\n'; //allows readability using inspector

        $script
            .attr({
                'id'   : 'funded-nextup',
                'type' : 'text/x-handlebars-template'
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
            articles,
            article;

        if (typeof article_data !== "undefined") {
            articles = article_data.articles;

            for(var key in articles) {
                article = articles[key].article;
                articles[key].current = false;

                if (article.link === current_url) {
                    article_data.current_article_id = articles[key].id;
                    articles[key].current = true;
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

        if (typeof article_data !== "undefined") {
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
        }
    },

    setNextUpArticles : function() {
        var self = this,
            current_article_id,
            articles,
            article,
            nextup_article;

        if (typeof article_data !== "undefined") {
            current_article_id = article_data.current_article_id;
            articles = article_data.articles;
            
            for(var key in articles) {
                article = articles[key].article;

                if (current_article_id && (current_article_id < articles[key].id) && (self.displayed_articles < self.articles_to_display)) {
                    self.nextup_article_data["articles"].push({"article" : article});
                    self.displayed_articles += 1;
                }
            }

            // Loop through article_data again to grab from the beginning if needed
            while (self.displayed_articles < self.articles_to_display) {
                loopArticleData();
            }
        }

        function loopArticleData() {
            for(var key in article_data.articles) {
                if (self.nextup_article_data.articles.length < self.articles_to_display) {
                    self.nextup_article_data["articles"].push({article : articles[key].article});
                    self.displayed_articles += 1;
                }
            }
        }
    },

    bindEvents : function() {
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
        var self = this;

        if (typeof article_data !== "undefined") {
            self.setNextUpArticles();

            require(["handlebars/1/handlebars"], function(Handlebars) {
                var $template = $("#funded-nextup"),
                    $container = $(".article-list-container"),
                    $articles = $(".articles"),
                    source = $template.html(),
                    template = Handlebars.compile(source),
                    context = {"article_data" : self.nextup_article_data} || {},
                    html = template(context);

                $container.prepend(html);

                // Not needed at this time
                // self.moveCurrentToTop();

                // Remove hidden articles form up next (auto-corrects CSS issues)
                //self.removeDOMelements();

                self.bindEvents();
            });
        }
    }
};

$(function() {
    webmd.fundedNextUp.init();
});
