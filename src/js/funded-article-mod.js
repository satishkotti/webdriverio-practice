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


webmd.fundedArticleMod = {

    gridItemClass: 'wbmd-grid-item', // class name on each <div> provided by the XSL

    adIDarray: ['rightAd_rdr'], // list of AD id's that may be placed inside the TOC

    contentPanes: {},

    masonryGutter: 10,

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
                $childNodes;

            // Continue to setup key and nodes if not already in object
            if (!(contentPaneId in self.contentPanes)) {
                self.contentPanes[contentPaneId] = {
                    'nodes': [],
                    'msnry': null
                }; // Set content pane id as key in self.contentPanes

                $childNodes = $("#" + contentPaneId).children('div');

                $.each($childNodes, function(index) {
                    var $child = $(this);

                    if (!$child.hasClass('moduleSpacer_rdr')) {
                        self.setupChild($child);

                        //self.allNodes.push(this); //temporary - use the below line instead
                        self.contentPanes[contentPaneId].nodes.push({
                            'node': $child
                        });
                    }
                });
            }
        });

        self.createGridWrapper();
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
            nodeId = $node.attr('id'),
            nodeArticleNum = $node.data('articleNum'),
            regEx_2col = new RegExp("2-col"),
            regEx_3col = new RegExp("3-col"),
            articles = self.article_data.articles,
            newline = '\n',
            articleId,
            article;


        $node.addClass('wbmd-grid-item'); // adds the masonry grid item class to node

        if (!$node.hasClass('icm_wrap') && !$node.hasClass('dbm_wrap')) {
            $node.addClass('tile-width'); // default size for all editorial tiles in TOC that are not ICM or DBM
        } else {
            if (nodeId && regEx_3col.test(nodeId)) {
                $node.addClass('tile-width-x3');
            } else if (nodeId && regEx_2col.test(nodeId)) {
                $node.addClass('tile-width-x2');
            } else {
                $node.addClass('tile-width');
            }
        }

        for (var key in articles) {
            articleId = articles[key].id;
            article = articles[key].article;

            if (articleId === nodeArticleNum) {
                $node.html(
                    '<a href="' + article.link + '">' + newline +
                    '   <img src="' + article.images.image493x335 + '">' + newline +
                    '   <p>' + article.title + '</p>' + newline +
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
            var $gridDiv = $("<div></div>"),
                contentPane_html = $("#" + id).html();

            $gridDiv.addClass('wbmd-masonry-grid').html(contentPane_html);

            $("#" + id).html("").addClass("wbmd-masonry-container").append($gridDiv);
        }

        return true;
    },

    fixLayout: function() {
        var self = this,
            adArray = self.adIDarray,
            gutter = self.masonryGutter,
            windowW = $(window).outerWidth(),
            standardTileHeight;

        if (!standardTileHeight) {
            standardTileHeight = $('.wbmd-grid-item:not(.icm_wrap):not(.dbm_wrap').outerHeight();
        }

        for (id in self.contentPanes) {
            $('div#' + id + '.pane.wbmd-masonry-container').find('.wbmd-grid-item').each(function() {
                var $node = $(this),
                    nodeH = $node.outerHeight(),
                    nodeW = $node.outerWidth(),
                    multiplier = Math.ceil(nodeH / standardTileHeight),
                    btmMargin;

                /* Need to use cssText in this section - $.css() does not work correctly with adding margin-bottom */
                if (!$node.attr('data-orig-csstext')) {
                    $node.attr('data-orig-csstext', $node.attr('style'));
                }

                if ($node.is('.icm_wrap,.dbm_wrap') || $node.children().is('.icm_wrap,.dbm_wrap')) {

                    if (windowW < 1000 && nodeW >= 650) {
                        $node.css('cssText', $node.attr('data-orig-csstext'));
                    } else {
                        if (windowW >= 650) {
                            if (multiplier === 2) {
                                $node.css({ 'height': nodeH + 'px !important' });
                            } else {
                                if (multiplier === 3) {
                                    btmMargin = (standardTileHeight * multiplier) - nodeH;
                                } else {
                                    btmMargin = (standardTileHeight * (multiplier - 1)) + (gutter * (multiplier - 1)) - nodeH;
                                }
                                
                                $node.css('cssText', $node.attr('style') + ' margin-bottom: ' + btmMargin + 'px !important');
                            }
                        } else {
                            $node.css('cssText', $node.attr('data-orig-csstext'));
                        }
                    }
                } else {
                    if (adArray.indexOf($node.attr('id')) !== -1) {
                        $node.css({
                            'height': nodeH + 'px !important'
                        });
                    }
                }
            });
        }

        self.createMasonry(true);
    },

    createMasonry: function(resetLayout) {
        var self = this,
            contentPanes = self.contentPanes,
            gridItemClass = '.' + self.gridItemClass;

        require(["masonry/1/masonry"], function(Masonry) {
            for (id in contentPanes) {
                var contentPane = contentPanes[id],
                    masonryGrid = '#' + id + ' .wbmd-masonry-grid';

                if (resetLayout) {
                    contentPane.msnry.layout();
                } else {
                    $(masonryGrid).imagesLoaded(function() {
                        contentPane.msnry = new Masonry(masonryGrid, {
                            itemSelector: gridItemClass,
                            columnWidth: gridItemClass,
                            gutter: self.masonryGutter,
                            isFitWidth: true,
                            isResizable: true
                        });
                    });
                }
            }
        });
    },

    bindEvents: function() {
        var self = this;

        $(window).bind('resizeEnd', function() {
            self.fixLayout();
        });

        $(window).on('resize orientationchange', function() {
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            }

            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 500);
        });

        $(window).load(function() {
            self.fixLayout();
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
    webmd.fundedArticleMod.init();
});
