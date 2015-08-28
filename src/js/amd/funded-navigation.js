var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.navigation = {

    mobile_only: false,

    hide_paddles: true,

    identifier: null,

    hide_sponsor_pages: false,

    hide_module_on_sponsor_pages: false,

    is_current_sponsored: false,

    show_on_element: null, // Shows Next|Prev nav when top of element specified reaches bottom of window

    percent_after_article_start_to_show: 60, // Shows Next|Prev nav defined percentage after start of article

    pixels_after_article_end_to_hide: 200, // Hides Next|Prev nav defined # of pixels after end of article

    init: function() {
        this.getIdentifier();
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
                    '<a class="prev {{#if visited}}visited{{/if}}" href="{{prev.link}}">' + newline +
                        '<span class="arrow"></span>' + newline +
                        '<span class="text">' + newline +
                            '<span class="nav">Previous</span>' + newline +
                            '<span class="title">{{prev.title}}</span>' + newline +
                        '</span>' + newline +
                    '</a>' + newline +
                    '<a class="next {{#if visited}}visited{{/if}}" href="{{next.link}}">' + newline +
                        '<span class="text">' + newline +
                            '<span class="nav">Next</span>' + newline +
                            '<span class="title">{{next.title}}</span>' + newline +
                        '</span>' + newline +
                        '<span class="arrow"></span>' + newline +
                    '</a>' + newline +
                '</div>'
            );

        $('head').append($script);
    },

    bindEvents: function() {
        var self = this;

        $(window).bind('resizeEnd', function() {
            // do something, window hasn't changed size in 500ms
            self.setNavPalette();
        });

        $(window).bind('touchstart', function() {
            return true;
        });

        $(window).scroll(function() {
            self.setNavPalette();
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
            currentArticleIndex = webmd.fundedEditorial.articleData.currentArticle,
            currentArticleType;

        if (currentArticleIndex === 'undefined' || currentArticleIndex === null) {
            return;
        }

        currentArticleType = webmd.fundedEditorial.articleData.articles[currentArticleIndex].type;
        self.is_current_sponsored = webmd.fundedEditorial.articleData.articles[currentArticleIndex].sponsored;

        switch (currentArticleType) {
            case 'type_art':
                self.identifier = '.article';
                break;
            case 'type_rmq':
                $('.article-nav-container').hide(); // hide nav

                // this is very similar to using Object.watch()
                // instead we attach multiple listeners
                webmd.fundedEditorial.rmqSlide = (function () {
                    var initVal,
                        interceptors = [];

                    function callInterceptors(newVal) {
                        for (var i = 0; i < interceptors.length; i += 1) {
                            interceptors[i](newVal);
                        }
                    }

                    return {
                        get type() {
                            // user never has access to the private variable "initVal"
                            // we can control what they get back from saying "webmd.fundedEditorial.rmqSlide.type"
                            return initVal;
                        },

                        set type(newVal) {
                            callInterceptors(newVal);
                            initVal = newVal;
                        },

                        listen : function (fn) {
                            if (typeof fn === 'function') {
                                interceptors.push(fn);
                            }
                        }
                    };
                }());

                // add a listener
                webmd.fundedEditorial.rmqSlide.listen(function (passedValue) {
                    if (passedValue === 'results') {
                        $('.article-nav-container').show();
                    } else {
                        self.hideElement('.article-nav');
                        window.setTimeout(function() { $('.article-nav-container').hide(); }, 1000);
                    }
                });

                self.show_on_element = '.rmq_footer';
                self.identifier = '.rich_media_quiz';
                self.hide_paddles = false; // do not hide paddles on certain conditions (see setNavPalette below)
                self.mobile_only = true;
                break;
            default:
                break;
        }

        if (!self.identifier || (this.mobile_only && webmd.fundedEditorial.uaType !== 'mobile')) {
            return false;
        }

        this.render();
    },

    setNavPalette: function() { // get nav coordinates to show and hide
        var self = this,
            $chrome = $('.chrome'),
            documentHeight = $(document).height(),
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
            showNavLocation = (scrollBottom >= (articleTop + (articleHeight * (self.percent_after_article_start_to_show / 100)))); //show at specified percentage of article
        }

        hideNavLocation = (
                (self.hide_paddles && (scrollBottom >= articleBottom + self.pixels_after_article_end_to_hide)) || // hide at specified pixels after the article
                (scrollBottom == documentHeight) || // hide when scroll bottom reaches the bottom of the document
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
        var self = this;

        $.each(webmd.fundedEditorial.articleData.articles, function() {
            var articleIndex = webmd.fundedEditorial.articleData.articles.indexOf(this);

            if (articleIndex === webmd.fundedEditorial.articleData.prevArticle) {
                self.prev_article = this;
            }

            if (articleIndex === webmd.fundedEditorial.articleData.nextArticle) {
                self.next_article = this;
            }
        });

        if (self.hide_module_on_sponsor_pages && self.is_current_sponsored) {
            return true;
        } else {
            self.injectHBtemplateJS();

            require(['handlebars/1/handlebars'], function(Handlebars) {
                var $template = $('#navigation_template'),
                    $container = $('.article-nav-container'),
                    $article_nav = $('.article-nav'),
                    source = $template.html(),
                    template = Handlebars.compile(source),
                    context = {
                        'prev': self.prev_article,
                        'next': self.next_article
                    },
                    html = template(context);

                $container.prepend(html);

                self.bindEvents();
            });
        }
    }
};

$(function() {
    webmd.fundedEditorial.navigation.init();
});
