var webmd;

if (!webmd) {
    webmd = {};
}

// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// Modified with a two-pass approach to changing image
// src. First, the proxy imagedata is set, which leads
// to the first callback being triggered, which resets
// imagedata to the original src, which fires the final,
// user defined callback.

// modified by yiannis chatzikonstantinou.

// original:
// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback) {
    var elems = this.find('img'),
        elems_src = [],
        self = this,
        len = elems.length;

    if (!elems.length) {
        callback.call(this);
        return this;
    }

    elems.one('load error', function() {
        if (--len === 0) {
            // Rinse and repeat.
            len = elems.length;
            elems.one('load error', function() {
                if (--len === 0) {
                    callback.call(self);
                }
            }).each(function() {
                this.src = elems_src.shift();
            });
        }
    }).each(function() {
        elems_src.push(this.src);
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    });

    return this;
};


webmd.fundedMoreAbout = {

    gridItemClass: 'wbmd-moreabout-grid-item', // class name on each <div> provided by the XSL

    contentPanes: {},

    masonryGutter: 10,

    gridType: 'scaling', // options: scaling, wrapping

    init: function() {
        this.render();
    },

    start: function() {
        var self = this,
            $nodes = $('.' + self.gridItemClass);

        if (self.hasStorage()) {
            self.addToSessionHistory();
            self.setArticlesVisited();
        }

        // Setup keys in self.contentPanes object
        $.each($nodes, function(index) {
            var $node = $(this), // use the node from XSL
                contentPaneId = $node.closest('div.pane')[0].id, // get the id of the parent content pane
                contentPane,
                $childNodes;

            // Continue to setup key and nodes if not already in object
            if (!(contentPaneId in self.contentPanes)) {
                self.contentPanes[contentPaneId] = {
                    'nodes': [],
                    'msnry': null
                }; // Set content pane id as key in self.contentPanes

                contentPane = self.contentPanes[contentPaneId];

                $childNodes = $("#" + contentPaneId).children('div');

                $.each($childNodes, function(index) {
                    var $child = $(this);

                    if (!$child.hasClass('moduleSpacer_rdr')) {
                        self.setupChild($child);

                        //self.allNodes.push(this); //temporary - use the below line instead
                        contentPane.nodes.push({
                            'node': $child
                        });
                    }
                });
            }
        });

        self.createGridWrapper();
        self.moveTitleToTop();
    },

    hasStorage: function() {
        // Test session storage
        try {
            sessionStorage.setItem('test', '1');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },

    addToSessionHistory: function() {
        var self = this,
            url = window.location.href,
            current_url = url.split("?")[0].split("#")[0], // remove querystring and hash from url
            json = sessionStorage.visitedPages || {
                "visited": []
            },
            visitedObj = (typeof json === "string") ? JSON.parse(json) : json,
            urlExists = false;

        for (key in visitedObj.visited) {
            if (visitedObj.visited[key].page === current_url) {
                urlExists = true;
                break;
            }
        }

        if (!urlExists && current_url) {
            visitedObj.visited.push({
                "page": current_url
            });
        }

        sessionStorage.visitedPages = JSON.stringify(visitedObj);
    },

    setArticlesVisited: function() {
        var self = this,
            articles = self.article_data.articles,
            history = JSON.parse(sessionStorage.visitedPages),
            article,
            article_link,
            history_page;

        for (var key in articles) {
            article = articles[key].article;
            article_link = article.link;

            for (var j in history.visited) {
                history_page = history.visited[j].page;

                if (article_link === history_page) {
                    article.visited = true;
                }
            }
        }
    },

    setupChild: function($node) {
        var self = this,
            nodeArticleNum = $node.data('articleNum'),
            articles = self.article_data.articles,
            newline = '\n',
            articleId,
            article,
            articleType;


        $node.addClass('wbmd-moreabout-grid-item'); // adds the masonry grid item class to node

        if (self.gridType !== 'scaling') {
            $node.addClass('tile-width');
        }

        for (var key in articles) {
            articleId = articles[key].id;
            article = articles[key].article;
            articleType = (articles[key].sponsored) ? "From Our Sponsor" : "";

            if (articleId === nodeArticleNum) {
                $node.html(
                    '<a href="' + article.link + '">' + newline +
                    '   <img src="' + article.images.image493x335 + '">' + newline +
                    '   <p>' + '<span>' + articleType + '</span>' + newline + article.title + '</p>' + newline +
                    '</a>' + newline
                );

                if (article.visited) {
                    $node.addClass('visited');
                }

                return false;
            }
        }
    },

    createGridWrapper: function() {
        var self = this,
            contentPanes = self.contentPanes;

        for (id in contentPanes) {
            var $containerDiv = $('#' + id),
                $gridDiv = $('<div></div>'),
                contentPane_html = $containerDiv.html();

            $gridDiv.addClass('wbmd-moreabout-masonry-grid').html(contentPane_html);

            $containerDiv.html('').addClass('wbmd-moreabout-masonry-container').append($gridDiv);

            if (self.gridType === 'scaling') {
                $containerDiv.addClass(self.gridType);
            } else {
                $containerDiv.addClass('wrapping');
            }
        }

        return true;
    },

    moveTitleToTop: function() {
        var self = this,
            contentPanes = self.contentPanes,
            $h3;

        for (id in contentPanes) {
            $h3 = $('#' + id + ' h3.wbmd-moreabout-title') || $('<h3></h3>');

            if (!$h3.text()) {
                $h3.text('More About');
            }

            if (!$h3.hasClass('wbmd-moreabout-title')) {
                $h3.addClass('wbmd-moreabout-title');
                $('div#' + id + '.pane.wbmd-moreabout-masonry-container').prepend($h3);
            } else {
                $h3.parent().before($h3);
            }
        }
    },

    bindEvents: function() {
        var self = this;

        $(window).bind('resizeEnd', function() {
            self.createMasonry(true);
        });

        $(window).on('resize orientationchange', function() {
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            }

            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 500);
        });
    },

    createMasonry: function(resetLayout) {
        var self = this,
            contentPanes = self.contentPanes,
            gridItemClass = '.' + self.gridItemClass;

        require(["masonry/1/masonry"], function(Masonry) {
            for (id in contentPanes) {
                var contentPane = contentPanes[id],
                    masonryGrid = "#" + id + ' .wbmd-moreabout-masonry-grid';

                if (resetLayout) {
                    contentPane.msnry.layout();
                } else {
                    $(masonryGrid).imagesLoaded(function() {
                        if (self.gridType === 'scaling') {
                            contentPane.msnry = new Masonry(masonryGrid, {
                                itemSelector: gridItemClass,
                                columnWidth: gridItemClass,
                                percentPosition: true
                            });
                        } else {
                            contentPane.msnry = new Masonry(masonryGrid, {
                                itemSelector: gridItemClass,
                                columnWidth: gridItemClass,
                                gutter: self.masonryGutter,
                                isFitWidth: true,
                                isResizable: true
                            });
                        }
                    });
                }
            }
        });
    },

    render: function() { // uses handlebars template above
        var self = this;

        if (typeof article_data !== "undefined") {

            self.article_data = article_data;

            self.start();

            self.createMasonry(false);

            self.bindEvents();
        }
    }
};

$(function() {
    webmd.fundedMoreAbout.init();
});
