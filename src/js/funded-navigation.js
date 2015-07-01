var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedNavigation = {

    hide_sponsor_pages : false,

    hide_module_on_sponsor_pages : false,

    is_current_sponsored : false,

    percent_after_article_start_to_show : 60, // Shows Next|Prev nav defined percentage after start of article

    pixels_after_article_end_to_hide : 200, // Hides Next|Prev nav defined # of pixels after end of article

    init : function(){
        this.render();
    },

    injectHBtemplateJS: function() { // inject embedded script to reduce http calls
        var self = this,
            $script = $('<script></script>'),
            newline = '\n'; //allows readability using inspector

        $script
            .attr({
                id   : 'entry-template',
                type : 'text/x-handlebars-template'
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
            article_data = this.article_data,
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
                    self.is_current_sponsored = true;
                }

                self.setNavArticles();
                break;
            }
        }
    },

    addToSessionHistory : function() {
        var self = this,
            url = window.location.href,
            current_url = url.split("?")[0].split("#")[0], // remove querystring and hash from url
            json = sessionStorage.visitedPages || {"visited":[]},
            visitedObj = (typeof json === "string") ? JSON.parse(json) : json,
            urlExists = false;

        for (key in visitedObj.visited) {
            if (visitedObj.visited[key].page === current_url) {
                urlExists = true;
                break;
            }
        }

        if (!urlExists && current_url) {
            visitedObj.visited.push({"page" : current_url});
        }

        sessionStorage.visitedPages = JSON.stringify(visitedObj);
    },

    setArticlesVisited : function() {
        var self = this,
            article_data = this.article_data,
            articles = article_data.articles,
            article,
            article_link,
            history = JSON.parse(sessionStorage.visitedPages),
            history_page;

        for (var key in articles) {
            article = articles[key].article;
            article_link = article.link;

            for(var j in history.visited) {
                history_page = history.visited[j].page;
                //console.log("article_link: " + article_link + "\nhistory_page: " + history_page);

                if (article_link === history_page) {
                    article.visited = true;
                }
            }
        }
    },

    setNavArticles : function() {
        var self = this,
            article_data = this.article_data,
            current_article_id = article_data.current_article_id,
            articles = article_data.articles,
            article,
            nextArticleFound = false,
            prevArticleFound = false;
            
        for(var key in articles) {
            article = articles[key].article;
            article.next = false;
            article.previous = false;

            if (self.hide_sponsor_pages) {
                if (!articles[key].sponsored) {
                    if (!nextArticleFound && (articles[key].id === (current_article_id + 1))) {
                        nextArticleFound = true;
                        article.next = true;
                    }

                    if (!prevArticleFound && (articles[key].id === (current_article_id - 1))) {
                        prevArticleFound = true;
                        article.previous = true;
                    }
                }
            } else {
                if (!nextArticleFound && (articles[key].id === (current_article_id + 1))) {
                    nextArticleFound = true;
                    article.next = true;
                }

                if (!prevArticleFound && (articles[key].id === (current_article_id - 1))) {
                    prevArticleFound = true;
                    article.previous = true;
                }
            }
        }

        // Last article does not have a next
        // Set Next Article as first article in JSON Array that is not sponsored
        if (!nextArticleFound) {
            for (var i=0; i<articles.length; i++) {
                if (self.hide_sponsor_pages) {
                    if (!articles[i].sponsored) {
                        nextArticleFound = true;
                        articles[i].article.next = true;
                        break;
                    }
                } else {
                    nextArticleFound = true;
                    articles[i].article.next = true;
                    break;
                }
            }
        }

        // First article does not have a previous
        // Set Previous Article as last article in JSON Array (treat articles as a loop)
        if (!prevArticleFound) {
            for (var i=1; i<articles.length; i++) {
                if (self.hide_sponsor_pages) {
                    if (!articles[articles.length-i].sponsored) {
                        prevArticleFound = true;
                        articles[articles.length-i].article.previous = true;
                        break;
                    }
                } else {
                    prevArticleFound = true;
                    articles[articles.length-i].article.previous = true;
                    break;
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

        $(window).bind('touchstart', function () {
            return true;
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
            articleHeight = $('.article').innerHeight(),
            scrollTop = $(window).scrollTop(),
            scrollBottom = scrollTop + $(window).height(),
            showNavLocation = (scrollBottom >= (articleHeight * (self.percent_after_article_start_to_show / 100))), //show at specified percentage of article
            hideNavLocation = ((scrollBottom >= (articleBottom + self.pixels_after_article_end_to_hide)) || // hide at specified pixels after the article
                               (scrollBottom === $(document).height()) || // hide when scroll bottom reaches the bottom of the document
                               (scrollTop < articleTop)); // hide when scroll top is above the article

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

            self.article_data = article_data;

            self.setCurrentArticle();

            self.addToSessionHistory();

            self.setArticlesVisited();

            if (self.hide_module_on_sponsor_pages && self.is_current_sponsored) {
                return true;
            } else {
                self.injectHBtemplateJS();
                
                require(["handlebars/1/handlebars"], function(Handlebars) {
                    var $template = $("#entry-template"),
                        $container = $(".article-nav-container"),
                        $article_nav = $(".article-nav"),
                        source = $template.html(),
                        template = Handlebars.compile(source),
                        context = {"article_data" : self.article_data} || {},
                        html = template(context);

                    $container.prepend(html);

                    self.bindEvents();
                });
            }
        }
    }
};

$(function() {
    webmd.fundedNavigation.init();
});
