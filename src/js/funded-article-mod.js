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
        this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    });

    return this;
};


webmd.fundedEditorial.articleMod = {

    gridItemClass: 'wbmd-grid-item', // class name on each <div> provided by the XSL

    adIDarray: ['rightAd_rdr'], // list of AD id's that may be placed inside the TOC

    contentPanes: {},

    masonryGutter: 10,

    init: function() {
        this.layoutOn_TipsModuleReady();

        this.render();
    },

    start: function() {
        var self = this,
            $nodes = $('.' + self.gridItemClass);

        // Setup keys in self.contentPanes object
        $.each($nodes, function() {
            var $node = $(this), // use the node from XSL
                contentPaneId = $node.closest('div.pane')[0].id, // get the id of the parent content pane
                $childNodes;

            // Continue to setup key and nodes if not already in object
            if (!(contentPaneId in self.contentPanes)) {
                self.contentPanes[contentPaneId] = {
                    'nodes': [],
                    'msnry': null
                }; // Set content pane id as key in self.contentPanes

                $childNodes = $('#' + contentPaneId).children('div');

                $.each($childNodes, function() {
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

    setupChild: function($node) {
        var self = this,
            nodeId = $node.attr('id'),
            nodeArticleNum = $node.data('articleNum'),
            regEx_1col = new RegExp('1-col'),
            regEx_2col = new RegExp('2-col'),
            regEx_3col = new RegExp('3-col'),
            articles = self.article_data.articles,
            newline = '\n',
            articleId,
            article;


        $node.addClass('wbmd-grid-item'); // adds the masonry grid item class to node

        if (!$node.hasClass('icm_wrap') && !$node.hasClass('dbm_wrap')) {
            $node.addClass('tile-width'); // default size for all editorial tiles in TOC that are not ICM or DBM
        } else {
            if (nodeId) {
                if (regEx_3col.test(nodeId)) {
                    $node.addClass('tile-width-x3');
                } else if (regEx_2col.test(nodeId)) {
                    $node.addClass('tile-width-x2');
                } else if (regEx_1col.test(nodeId)) {
                    $node.addClass('tile-width');
                }
            }
        }

        for (var key in articles) {
            article = articles[key];
            articleIndex = articles.indexOf(article) + 1;

            if (articleIndex === nodeArticleNum) {
                $node.html(
                    '<a href="' + article.link + '">' + newline +
                    '   <img src="' + image_server_url + article.images.image493x335 + '">' + newline +
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

        for (var id in contentPanes) {
            var $gridDiv = $('<div></div>'),
                contentPane_html = $('#' + id).html();

            $gridDiv.addClass('wbmd-masonry-grid').html(contentPane_html);

            $('#' + id).html('').addClass('wbmd-masonry-container').append($gridDiv);
        }

        return true;
    },

    fixLayout: function() {
        var self = this,
            adArray = self.adIDarray,
            gutter = self.masonryGutter,
            windowW = $(window).outerWidth(),
            standardTileHeight,
            newHeight;

        if (!standardTileHeight) {
            standardTileHeight = $('.wbmd-grid-item:not(.icm_wrap):not(.dbm_wrap)').outerHeight();
        }

        for (var id in self.contentPanes) {
            updateContentPane(id);
        }

        self.createMasonry(true);


        function updateContentPane(id) {
            $('div#' + id + '.pane.wbmd-masonry-container').find('.wbmd-grid-item').each(function() {
                var $node = $(this),
                    nodeH = $node.outerHeight(),
                    nodeW = $node.outerWidth(),
                    multiplier,
                    btmMargin;

                /* Need to use cssText in this section - $.css() does not work correctly with adding margin-bottom */
                if (!$node.attr('data-orig-csstext')) {
                    $node.attr('data-orig-csstext', $node.attr('style'));
                }

                if (!$node.attr('data-orig-height')) {
                    $node.attr('data-orig-height', nodeH);
                }

                if ($node.is('.icm_wrap,.dbm_wrap') || $node.children().is('.icm_wrap,.dbm_wrap')) {
                    multiplier = Math.round((nodeH / standardTileHeight * 100) / 100);
                    btmMargin = Math.ceil((standardTileHeight * multiplier) + (gutter * multiplier) - nodeH);

                    if (windowW < 1000 && nodeW >= 650) {
                        $node.css('cssText', $node.attr('data-orig-csstext'));
                    } else {
                        if (windowW >= 650) {
                            $node.css('cssText', $node.attr('style') + ' margin-bottom: ' + btmMargin + 'px !important');
                        } else {
                            $node.css('cssText', $node.attr('data-orig-csstext'));
                        }
                    }
                } else {
                    nodeH = parseInt($node.attr('data-orig-height'));

                    if (nodeH <= standardTileHeight) {
                        multiplier = 1;
                    } else if (
                        (nodeH === (standardTileHeight * 2)) ||
                        ((nodeH > standardTileHeight) && (nodeH < (standardTileHeight * 2)))) {
                        multiplier = 2;
                    } else if (
                        (nodeH === (standardTileHeight * 3)) ||
                        ((nodeH > (standardTileHeight * 2)) && (nodeH < (standardTileHeight * 3)))) {
                        multiplier = 3;
                    } else if (
                        (nodeH === (standardTileHeight * 4)) ||
                        ((nodeH > (standardTileHeight * 3)) && (nodeH < (standardTileHeight * 4)))) {
                        multiplier = 4;
                    } else if (
                        (nodeH === (standardTileHeight * 5)) ||
                        ((nodeH > (standardTileHeight * 4)) && (nodeH < (standardTileHeight * 5)))) {
                        multiplier = 5;
                    } else if (
                        (nodeH === (standardTileHeight * 6)) ||
                        ((nodeH > (standardTileHeight * 5)) && (nodeH < (standardTileHeight * 6)))) {
                        multiplier = 6;
                    } else {
                        multiplier = 7;
                    }

                    if (windowW > 675 && multiplier > 1) {
                        newHeight = ((standardTileHeight * multiplier) + (gutter * multiplier)) - gutter;

                        if (adArray.indexOf($node.attr('id')) !== -1) {
                            btmMargin = newHeight - nodeH;
                            $node.css('cssText', $node.attr('style') + ' margin-bottom: ' + btmMargin + 'px !important');
                        } else {
                            $node.height(newHeight);
                        }
                    } else {
                        $node.css('cssText', $node.attr('data-orig-csstext'));
                    }
                }
            });
        }
    },

    layoutOn_TipsModuleReady: function() {
        var self = this;

        webmd.fundedEditorial.tocTips = {};

        Object.observe(webmd.fundedEditorial.tocTips, function(changes) {
            $.each(changes, function() {
                if (this.object.ready) {
                    self.createMasonry(true);
                }
            });
        });
    },

    createMasonry: function(resetLayout) {
        var self = this,
            contentPanes = self.contentPanes,
            gridItemClass = '.' + self.gridItemClass;

        
            for (var id in contentPanes) {
                createMasonryGrid(id);
            }

            function createMasonryGrid(id) {
                require(['masonry/1/masonry'], function(Masonry) {
                    var contentPane = contentPanes[id],
                        masonryGrid = '#' + id + ' .wbmd-masonry-grid';

                    if (resetLayout) {
                        contentPane.msnry.layout();
                    } else {
                        $(masonryGrid).imagesLoaded(function() {
                            contentPane.msnry = new Masonry(masonryGrid, {
                                itemSelector: gridItemClass,
                                columnWidth: '.tile-width',
                                gutter: self.masonryGutter,
                                isFitWidth: true,
                                isResizable: true
                            });
                        });
                    }
                });
            }
        
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

        if (typeof article_data !== 'undefined') {

            self.article_data = webmd.fundedEditorial.articleData;

            self.start();

            self.createMasonry(false);

            self.bindEvents();
        }
    }
};

$(function() {
    webmd.fundedEditorial.articleMod.init();
});
