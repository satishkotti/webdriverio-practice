var webmd;

if (!webmd) {
    webmd = {};
}

webmd.fundedEditorial.navigation = {

    hide_sponsor_pages: false,

    hide_module_on_sponsor_pages: false,

    is_current_sponsored: false,

    percent_after_article_start_to_show: 60, // Shows Next|Prev nav defined percentage after start of article

    pixels_after_article_end_to_hide: 200, // Hides Next|Prev nav defined # of pixels after end of article

    init: function() {
        this.render();
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
                '	<a class="prev {{#if visited}}visited{{/if}}" href="{{prev.link}}">' + newline +
                '		<span class="arrow"></span>' + newline +
                '		<span class="text">' + newline +
                '			<span class="nav">Previous</span>' + newline +
                '			<span class="title">{{prev.title}}</span>' + newline +
                '		</span>' + newline +
                '	</a>' + newline +
                '	<a class="next {{#if visited}}visited{{/if}}" href="{{next.link}}">' + newline +
                '		<span class="text">' + newline +
                '			<span class="nav">Next</span>' + newline +
                '			<span class="title">{{next.title}}</span>' + newline +
                '		</span>' + newline +
                '		<span class="arrow"></span>' + newline +
                '	</a>' + newline +
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
