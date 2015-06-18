var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedNextUp = {

    init : function(){
        this.displayed_articles = 0;
        this.articles_to_display = 3; // this includes the current article (on top)

        //this.injectCSS();

        this.injectHBtemplateJS();

        this.getCurrentURL();

        this.addToSessionHistory();

        this.getCurrentArticleId();

        this.render();
    },

    injectCSS: function() { // this may not be needed if attaching CSS via PageBuilder
        var $link = $('<link/>');

        $link.attr({
            'rel' : 'stylesheet',
            'href' : '../css/build/nextup.css',
            'type' : 'text/css'
        });

        $('head').append($link);
    },

    injectHBtemplateJS: function() { // inject embedded script to reduce http calls
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
                '           <li class="{{#iscurrent article.link ../current_article_url}}current{{/iscurrent}} {{#isnextup id ../current_article_id}}showme{{else}}hideme{{/isnextup}} {{#isvisited article.link}}visited{{/isvisited}}">' + newline +
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

    getCurrentURL : function () {
        var self = this,
            url = window.location.href;

        // save URL without querystring and/or hash for session only
        self.currentURL = url.split("?")[0].split("#")[0];
        article_data.current_article_url = self.currentURL;
    },

    addToSessionHistory : function() {
        var self = this,
            jsonStr = sessionStorage.visitedPages || '{visited:[]}',
            visitedObj = JSON.parse(jsonStr),
            urlExists = false;

        for (key in visitedObj.visited) {
            if (visitedObj.visited[key].page === self.currentURL) {
                urlExists = true;
                break;
            }
        }

        if (!urlExists) {
            visitedObj["visited"].push({"page" : self.currentURL});
        }
        sessionStorage.visitedPages = JSON.stringify(visitedObj);
    },

    getCurrentArticleId : function() {
        var self = this;

        if (typeof article_data !== "undefined") {
            for(var key in article_data.articles) {
                if (article_data.articles[key].article.link === self.currentURL) {
                    article_data.current_article_id = article_data.articles[key].id;
                }
            }
        }
    },

    removeDOMelements: function() {
        var hiddenElements = $(".article-list-container .hideme");
        for(var i = 0; i < hiddenElements.length; i++) {
            $(hiddenElements[i]).remove();
        }
    },

    bindEvents: function() {
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

    render: function(){ // uses handlebars template above
        var self = this;

        require(["handlebars/1/handlebars"], function(Handlebars) {
            Handlebars.registerHelper('iscurrent', function(value, value2, options) {
                if (value === value2) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });

            Handlebars.registerHelper('isvisited', function(value, options) {
                var history = JSON.parse(sessionStorage.visitedPages),
                    urlVisited = false;

                for(var key in history.visited) {
                    if (history.visited[key].page === value) {
                        urlVisited = true;
                    }
                }

                if (urlVisited) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            });

            Handlebars.registerHelper('isnextup', function(value, value2, options) {
              var displayMe = false;

              if (self.displayed_articles !== self.articles_to_display) {
                if (value > value2) {
                    self.displayed_articles += 1;
                    displayMe = true;
                }
              }

              if (displayMe) {
                return options.fn(this);
              } else {
                return options.inverse(this);
              }
            });

            if (typeof article_data !== "undefined") {
                var $template = $("#funded-nextup"),
                    $container = $(".article-list-container"),
                    $articles = $(".articles"),
                    source = $template.html(),
                    template = Handlebars.compile(source),
                    context = {"article_data" : article_data} || {},
                    html = template(context);

                $container.prepend(html);

                // Not needed at this time
                // self.moveCurrentToTop();

                // Remove hidden articles form up next (auto-corrects CSS issues)
                self.removeDOMelements();

                self.bindEvents();
            }
        });
    },

    moveCurrentToTop: function() {
        var $articles = $('ul.article-list .articles'),
            $currentListItem = $('ul.article-list .articles .current');

        $articles.prepend($currentListItem);
    }
};

$(function() {
    webmd.fundedNextUp.init();
});
