var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedNavigation = {

    init : function(){
        this.nav_article_data = {articles:[]};

        this.render();
    },

    injectHBtemplateJS: function() { // inject embedded script to reduce http calls
        var self = this,
            $script = $('<script></script>'),
            newline = '\n'; //allows readability using inspector

        $script
            .attr({
                'id'   : 'entry-template',
                'type' : 'text/x-handlebars-template'
            })
            .html(
                '<div class="article-nav">' + newline +
                '   {{#article_data}}' + newline +
                '       {{#each articles}}' + newline +
                '           {{#if article.previous}}' + newline +
                '           <a class="prev {{#if article.visited}}visited{{/if}}" href="{{article.link}}">' + newline +
                '               <span class="arrow"></span>' + newline +
                '               <span class="text">' + newline +
                '                   <span class="nav">Previous</span>' + newline +
                '                   <span class="title">{{article.title}}</span>' + newline +
                '               </span>' + newline +
                '           </a>' + newline +
                '           {{/if}}' + newline +
                '           {{#if article.next}}' + newline +
                '           <a class="next {{#if article.visited}}visited{{/if}}" href="{{article.link}}">' + newline +
                '               <span class="text">' + newline +
                '                   <span class="nav">Next</span>' + newline +
                '                   <span class="title">{{article.title}}</span>' + newline +
                '               </span>' + newline +
                '               <span class="arrow"></span>' + newline +
                '           </a>' + newline +
                '           {{/if}}' + newline +
                '       {{/each}}' + newline +
                '   {{/article_data}}' + newline +
                '</div>'
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

                self.setPrevArticle();
                self.setNextArticle();
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

    setPrevArticle : function() {
        var self = this,
            current_article_id = article_data.current_article_id,
            articles = article_data.articles,
            article,
            previusArticleFound = false;
            
        for(var key in articles) {
            article = articles[key].article;
            article.previous = false;

            if (current_article_id && (articles[key].id === current_article_id - 1)) {
                previusArticleFound = true;
                article.previous = true;
                self.nav_article_data["articles"].push({"article" : article});
            }
        }

        // Loop through article_data again to grab from the beginning if needed
        if (!self.previusArticleFound) {
            for(var key in article_data.articles) {
                if (articles[key].id === articles.length) {
                    previusArticleFound = true;
                    article.previous = true;
                    self.nav_article_data["articles"].push({article : articles[key].article});
                }
            }
        }
    },

    setNextArticle : function() {
        var self = this,
            current_article_id = article_data.current_article_id,
            articles = article_data.articles,
            article,
            nextArticleFound = false;
            
        for(var key in articles) {
            article = articles[key].article;
            article.next = false;

            if (current_article_id && (articles[key].id === (current_article_id + 1))) {
                nextArticleFound = true;
                article.next = true;
                self.nav_article_data["articles"].push({"article" : article});
            }
        }

        // Loop through article_data again to grab from the beginning if needed
        if (!nextArticleFound) {
            for(var key in article_data.articles) {
                if (articles[key].id === 1) {
                    nextArticleFound = true;
                    article.next = true;
                    self.nav_article_data["articles"].push({article : articles[key].article});
                }
            }
        }
    },

    bindEvents : function(){
        var self = this;

        $(window).bind('resizeEnd', function() {
            // do something, window hasn't changed size in 500ms
            self.setNavPalette();
        });

        $(window).scroll(function() {
            self.setNavPalette();
        });

        $(window).resize(function() {
            if(this.resizeTO) {
                clearTimeout(this.resizeTO);
            }

            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 500);
        });
    },

    setNavPalette: function() { // get nav coordinates to show and hide
        var self = this,
            articleTop = $('.chrome').position().top + $('.article').position().top,
            articleBottom = $('.article').outerHeight(true) + articleTop,
            scrollTop = $(window).scrollTop(),
            scrollBottom = scrollTop + $(window).height(),
            showNavLocation = (scrollTop >= articleTop),
            hideNavLocation = (scrollBottom >= articleBottom);

        if(showNavLocation && !hideNavLocation) {
            self.showElement('.article-nav');
        } else {
            self.hideElement('.article-nav');
        }
    },

    showElement: function(el) {
        $(el).addClass('show');
    },

    hideElement: function(el) {
        $(el).removeClass('show');
    },

    render: function(){ // uses handlebars template above
        var self = this;

        if (typeof article_data !== "undefined") {
            self.injectHBtemplateJS();

            self.setCurrentArticle();

            self.addToSessionHistory();

            require(["handlebars/1/handlebars"], function(Handlebars) {
                if (typeof article_data !== "undefined") {
                    var $template = $("#entry-template"),
                        $container = $(".article-nav-container"),
                        $article_nav = $(".article-nav"),
                        source = $template.html(),
                        template = Handlebars.compile(source),
                        context = {"article_data" : self.nav_article_data} || {},
                        html = template(context);

                    $container.prepend(html);
                }

                self.bindEvents();
            });
        }
    }
};

$(function() {
    webmd.fundedNavigation.init();
});
