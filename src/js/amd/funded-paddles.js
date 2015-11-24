var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.paddles = {

    mobile_only: false,                 // flag used if navigation paddles should be displayed on mobile only
    hide_paddles: true,                 // default setting to hide paddles at speicific points on the page (very top, very bottom, specified pixels after the article)
    identifier: "#s3",                  // article type used to determine identifier on the page for calulation show/hide points
    is_current_sponsored: false,        // flag for determinging if current page is sponsored
    hide_sponsor_pages: true,           // disable sponsor pages within the navigation (this will be configured globally within webmd.fundedEditorial and can be removed)
    hide_on_sponsored: true,            // do not display paddles on sponsored pages
    show_on_element: null,              // Shows Next|Prev nav when top of element specified reaches bottom of window (Example: top of RMQ footer - '.rmq_footer')
    percent_to_show: 60,                // Shows Next|Prev nav at set percentage of article
    pixels_after_to_hide: 200,          // Hides Next|Prev nav at set number of pixels after article end

    init: function() {
        var self = this;

        self.articleData = webmd.fundedEditorial.articleData;

        if (self.hide_sponsor_pages) { // remove sponsored articles from data object
            self.articleData.articles = self.articleData.articles.filter(function (el) {
                return el.sponsored !== true;
            });
        }

        self.getIdentifier();
    },

    injectHBtemplateJS: function() { // inject embedded script to reduce http calls
        var self = this,
            $script = $('<script></script>'),
            newline = '\n'; //allows readability using inspector

        $script
            .attr({
                id: 'navigation_template',
                type: 'text/x-handlebars-template'
            })
            .html(
                '<div class="article-nav">' + newline +
                    '<a class="prev {{#if visited}}visited{{/if}}" href="{{prev.article.link}}" data-metrics-link="l-{{prev.articleId}}">' + newline +
                        '<span class="text">' + newline +
                            '<span class="nav">Previous</span>' + newline +
                            '<span class="title">{{prev.article.title}}</span>' + newline +
                        '</span>' + newline +
                    '</a>' + newline +
                    '<a class="next {{#if visited}}visited{{/if}}" href="{{next.article.link}}" data-metrics-link="r-{{next.articleId}}">' + newline +
                        '<span class="text">' + newline +
                            '<span class="nav">Next</span>' + newline +
                            '<span class="title">{{next.article.title}}</span>' + newline +
                        '</span>' + newline +
                    '</a>' + newline +
                '</div>'
            );

        $('head').append($script);
    },

    bindEvents: function() {
        var self = this;

        $(window).bind('resizeEnd', function() {
            // do something, window hasn't changed size in 500ms
            self.setupNavPaddles();
        });

        $(window).bind('touchstart', function() {
            return true;
        });

        $(window).load(function() {
            self.setupNavPaddles();
        });

        $(window).scroll(function() {
            self.setupNavPaddles();
        });

        $(window).resize(function() {
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            }

            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 500);
        });
    },

    getIdentifier: function() {
        var self = this,
            $navContainer = $('.wbmd-paddles'),
            caIndex = self.articleData.currentArticle,
            ca, caType;

        if (typeof caIndex === 'undefined' || caIndex === null) {
            return;
        }

        ca = self.articleData.articles[caIndex];
        caType = ca.type;
        self.is_current_sponsored = ca.sponsored;

        switch (caType) {
            case 'type_art':
                break;
            case 'type_ss':
                self.identifier = null;
                break;
            case 'type_vid':
                break;
            case 'type_rmq':
                self.identifier = null;
                break;
            default:
                break;
        }

        if (!self.identifier || (self.mobile_only && webmd.fundedEditorial.uaType !== 'mobile')) {
            return false;
        }

        self.render();
    },

    setupNavPaddles: function() { // get nav coordinates to show and hide
        var self = this,
            $chrome = $('.chrome'),
            bodyHeight = $('body').height(),
            articleTop = $chrome.position().top + $(self.identifier).position().top,
            articleBottom = $(self.identifier).outerHeight(true) + articleTop,
            articleHeight = $(self.identifier).innerHeight(),
            scrollTop = $(window).scrollTop(),
            scrollBottom = scrollTop + $(window).height(),
            elementTop,
            elementBottom,
            elementHeight,
            showNavLocation = false,
            hideNavLocation = false;

        if (self.show_on_element) {
            elementTop = articleBottom - $(self.show_on_element).innerHeight();
            elementBottom = elementTop + $(self.show_on_element).innerHeight();
            showNavLocation = (scrollBottom >= elementTop + 50);
        } else {
            showNavLocation = (scrollBottom >= (articleTop + (articleHeight * (self.percent_to_show / 100)))); //show at specified percentage of article
        }

        hideNavLocation = (
            (self.hide_paddles && (scrollBottom >= articleBottom + self.pixels_after_to_hide)) || // hide at specified pixels after the article
            (bodyHeight <= scrollBottom) || // hide when scroll bottom reaches the bottom of the page
            (scrollTop === 0) // hide when scroll top is above the article top
        );

        if (showNavLocation && !hideNavLocation) {
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

    render: function() { // uses handlebars template above
        var self = this,
            context = {prev : {}, next : {}};

        if (self.hide_on_sponsored && self.is_current_sponsored) {
            return true;
        } else {
            // Get previous and next articles by looking at class set in article data object
            $.each(self.articleData.articles, function() {
                var article = this,
                    articleIndex = self.articleData.articles.indexOf(article);

                if (articleIndex === self.articleData.prevArticle) {
                    context.prev.article = article;
                    context.prev.articleId = articleIndex + 1;
                }

                if (articleIndex === self.articleData.nextArticle) {
                    context.next.article = article;
                    context.next.articleId = articleIndex + 1;
                }
            });

            self.injectHBtemplateJS();

            require(['handlebars/1/handlebars'], function(Handlebars) {
                var $template = $('#navigation_template'),
                    $container = $('.wbmd-paddles'),
                    $article_nav = $('.article-nav'),
                    source = $template.html(),
                    template = Handlebars.compile(source),
                    html = template(context);

                $container.prepend(html);

                self.bindEvents();
            });
        }
    }
};

$(function() {
    webmd.fundedEditorial.paddles.init();
});
