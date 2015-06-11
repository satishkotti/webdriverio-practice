var webmd;

if(!webmd){
    webmd = {};
}

webmd.fundedNavigation = {

    init : function(){
        this.injectCSS();

        this.injectHBtemplateJS();

        this.getCurrentURL();

        this.addToSessionHistory();

        this.getCurrentArticleId();

        this.bindEvents();

        this.render();
    },

    injectCSS: function() { // this may not be needed if attaching CSS via PageBuilder
        var $link = $('<link/>');

        $link.attr({
            'rel' : 'stylesheet',
            'href' : '../css/build/navigation.css',
            'type' : 'text/css'
        });

        $('head').append($link);
    },

    injectHBtemplateJS: function() { // inject embedded script to reduce http calls
        var $script = $('<script></script>'), 
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
                '           {{#isprevious id ...current_article_id}}' + newline +
                '           <a class="prev" href="{{article.link}}">' + newline +
                '               <span class="arrow"></span>' + newline +
                '               <span class="text">' + newline +
                '                   <span class="nav">Previous</span>' + newline +
                '                   <span class="title">{{article.title}}</span>' + newline +
                '               </span>' + newline +
                '           </a>' + newline +
                '           {{/isprevious}}' + newline +
                '           {{#isnext id ...current_article_id}}' + newline +
                '           <a class="next" href="{{article.link}}">' + newline +
                '               <span class="text">' + newline +
                '                   <span class="nav">Next</span>' + newline +
                '                   <span class="title">{{article.title}}</span>' + newline +
                '               </span>' + newline +
                '               <span class="arrow"></span>' + newline +
                '           </a>' + newline +
                '           {{/isnext}}' + newline +
                '       {{/each}}' + newline +
                '   {{/article_data}}' + newline +
                '</div>'
            );

        $('head').append($script);
    },

    getCurrentURL : function () {
        var url = window.location.href;

        // save URL without querystring and/or hash for session only
        sessionStorage.currentURL = url.split("?")[0].split("#")[0];
    },

    addToSessionHistory : function() {
        var jsonStr = sessionStorage.visitedPages || '{"visited":[]}',
        visitedObj = JSON.parse(jsonStr),
        urlExists = false;

        for (key in visitedObj.visited) {
            if (visitedObj.visited[key].page === sessionStorage.currentURL) {
                urlExists = true;
                break;
            }
        }

        if (!urlExists) {
            visitedObj["visited"].push({"page" : sessionStorage.currentURL});
        }
        sessionStorage.visitedPages = JSON.stringify(visitedObj);
    },

    getCurrentArticleId : function() {
        if (typeof article_data !== "undefined") {
            for(var key in article_data.articles) {
                if (article_data.articles[key].article.link === sessionStorage.currentURL) {
                    article_data.current_article_id = article_data.articles[key].id;
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
        require(["handlebars/1/handlebars"], function(Handlebars) {
            Handlebars.registerHelper('isprevious', function(value, value2, options) {
              if (value < value2 && (value > value2 - 2)) {
                return options.fn(this);
              } else {
                return options.inverse(this);
              }
            });

            Handlebars.registerHelper('isnext', function(value, value2, options) {
              if (value > value2 && value < (value2 + 2)) {
                return options.fn(this);
              } else {
                return options.inverse(this);
              }
            });

            if (typeof article_data !== "undefined") {
                var $template = $("#entry-template"),
                    $container = $(".article-nav-container"),
                    $article_nav = $(".article-nav"),
                    source = $template.html(),
                    template = Handlebars.compile(source),
                    context = {article_data} || {},
                    html = template(context);

                $container.prepend(html);

                // Handle display of 1 button or no buttons
                var $prev_btn = $(".prev"),
                    $next_btn = $(".next"),
                    prev_btn_len = $prev_btn.length,
                    next_btn_len = $next_btn.length;

                if ((prev_btn_len>0) && (next_btn_len>0)) {
                  // Both 'previous' and 'next' exist - setup event handlers
                  $prev_btn.click(function() {
                      window.location = $(this).attr("href");
                  });

                  $next_btn.click(function() {
                      window.location = $(this).attr("href");
                  });
                  return;
                } else {
                  if ((prev_btn_len>0 && next_btn_len===0) || (prev_btn_len===0 && next_btn_len>0)) {
                    $container.addClass("half-me");

                    if (next_btn_len>0) {
                      $article_nav.addClass("next-only");
                    }
                  } else {
                    $article_nav.addClass("no-btns");
                  }
                }
            }
        });
    }
};

$(function() {
    webmd.fundedNavigation.init();
});
