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

    nodeContentPanes: {
        "panes": {}
    },

    smallestNodes: {
        "nodes": {}
    },

    parentPanes: [],

    allNodes: [],

    masonryPanes: {},

    smallestGridSize: null,

    adIDarray: ['rightAd_rdr'],

    masonryGutter: 10,

    init: function() {
        this.render();
    },

    startWith: function(className) {
        var self = this,
            $nodes = $(className),
            adArray = self.adIDarray,
            regExPatt = new RegExp("2-col"),
            $nodeIndex,
            $nodeId;

        $nodes.each(function(index) {
            self.getAllParentPanes(this);
        });

        this.getAllNodes();

        for (var i = 0; i < this.allNodes.length; i++) {
            $nodeIndex = $(this.allNodes[i]);
            $nodeId = $nodeIndex.attr('id');

            if (!$nodeIndex.hasClass('moduleSpacer_rdr')) {
                if (!$nodeIndex.hasClass('icm_wrap') && !$nodeIndex.hasClass('dbm_wrap')) {
                    $nodeIndex.addClass('tile-width');
                }
                $nodeIndex.addClass('wbmd-grid-item');
            }

            if (regExPatt.test($nodeId)) {
                $nodeIndex.addClass('tile-width-x2');
            }

            $nodeIndex.attr('data-orig-width', $nodeIndex.outerWidth());
            $nodeIndex.attr('data-orig-height', $nodeIndex.outerHeight());

            self.setInnerHTML(this.allNodes[i]);
            self.placeInGroup(this.allNodes[i]);
        }

        this.setMasonryGridSizePerPane();

        this.addGridContainerToPanes();
    },

    sizeAdFrames: function() {
        var self = this,
            adArray = this.adIDarray,
            $gridItem,
            gridItemW,
            gridItemH,
            multiplier,
            standardTileHeight = $('div.wbmd-grid-item:not(.icm_wrap):not(.dbm_wrap)').outerHeight(),
            btmMargin,
            gutter = self.masonryGutter,
            windowW = $(window).width();

        $('div.wbmd-masonry-container').find('.wbmd-grid-item').each(function() {
            $gridItem = $(this);
            gridItemH = $gridItem.data('orig-height');
            gridItemW = $gridItem.data('orig-width');
            multiplier = Math.ceil(gridItemH / standardTileHeight);

            /* Need to use cssText in this section - $.css() and $.style() do not work correctly with adding margin-bottom */

            if (!$gridItem.data('orig-csstext')) {
                $gridItem.data('orig-csstext', $gridItem.attr('style'));
            }

            if ($gridItem.hasClass('icm_wrap') || $gridItem.children().hasClass('icm_wrap') || $gridItem.hasClass('dbm_wrap') || $gridItem.children().hasClass('dbm_wrap')) {
                if ((windowW < 1000 && gridItemW >= 650) || windowW < 736) {
                    $gridItem.css('margin-bottom', 0);
                    $gridItem.css('cssText', $gridItem.data('orig-csstext'));
                } else {
                    btmMargin = ((standardTileHeight * multiplier) + (gutter * (multiplier - 1)) - gridItemH + self.masonryGutter);
                    $gridItem.css('cssText', $gridItem.attr('style') + ' margin-bottom: ' + btmMargin + 'px !important');
                }
            } else {
                if (adArray.indexOf($(this).attr('id')) !== -1) {
                    $gridItem.css({'height' : gridItemH + 'px !important' });
                } else {
                    $gridItem.height((standardTileHeight * multiplier) + (gutter * (multiplier - 1)));
                }
            }
        });

        self.createMasonry(true);
    },

    hasStorage : function() {
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
            article_data = this.article_data,
            articles = article_data.articles,
            article,
            article_link,
            history = JSON.parse(sessionStorage.visitedPages),
            history_page;

        for (var key in articles) {
            article = articles[key].article;
            article_link = article.link;

            for (var j in history.visited) {
                history_page = history.visited[j].page;
                //console.log("article_link: " + article_link + "\nhistory_page: " + history_page);

                if (article_link === history_page) {
                    article.visited = true;
                }
            }
        }
    },

    getAllParentPanes: function(myNode) {
        var self = this,
            $parentNode = $(myNode).closest('div.pane')[0].id;

        if (this.parentPanes.indexOf($parentNode) === -1) {
            this.parentPanes.push($parentNode);
        }
    },

    addGridContainerToPanes: function() {
        var self = this;

        $.each(this.parentPanes, function(index) {
            var $gridDiv = $("<div></div>"),
                html = $("#" + this).html();

            $gridDiv.addClass('wbmd-masonry-grid').html(html);

            $("#" + this).html("").addClass("wbmd-masonry-container").append($gridDiv);
        });
    },

    getAllNodes: function() {
        var self = this,
            allNodes,
            $childNodes;

        $.each(this.parentPanes, function(index) {
            allNodes = self.allNodes;
            if (!self[this]) {
                self[this] = true;
                $childNodes = $("#" + this.toString() + " > div");

                $.each($childNodes, function(index) {
                    self.allNodes.push(this);
                });
            }
        });
    },

    placeInGroup: function(myNode) {
        var self = this,
            gItemArticleId = Number($(myNode).data('articleNum')),
            $parentNode = $(myNode).closest('div.pane')[0].id;

        //Create Group if doesn't exist
        if (!($parentNode in this.nodeContentPanes.panes)) {
            this.nodeContentPanes.panes[$parentNode] = {
                "nodes": []
            };
        }

        this.nodeContentPanes.panes[$parentNode].nodes.push({
            "el": myNode
        });
    },

    setInnerHTML: function(myNode) {
        var self = this,
            article_data = this.article_data,
            $myNodeArticleNum = $(myNode).data('articleNum'),
            $parentNode = $(myNode).closest('div.pane')[0].id,
            newline = '\n',
            articles = article_data.articles,
            articleId,
            article,
            nodeWidth;

        for (var key in articles) {
            articleId = articles[key].id;
            article = articles[key].article;

            if (articleId === $myNodeArticleNum) {
                $(myNode).html(
                    '<a href="' + article.link + '">' + newline +
                    '   <img src="' + article.images.image493x335 + '">' + newline +
                    '   <p>' + article.title + '</p>' + newline +
                    '</a>' + newline
                );

                nodeWidth = $(myNode).outerWidth();

                if (!self.smallestGridSize || self.smallestGridSize > nodeWidth || !self.smallestNodes.nodes[$parentNode]) {
                    self.smallestGridSize = nodeWidth;
                    self.smallestNodes.nodes[$parentNode] = {
                        "el": myNode,
                        "size": nodeWidth
                    };
                }

                if (article.visited) {
                    $(myNode).addClass('visited');
                }

                break;
            }
        }
    },

    setMasonryGridSizePerPane: function() {
        var self = this;

        $.each(this.smallestNodes.nodes, function(key, value) {
            $(self.smallestNodes.nodes[key].el).addClass('wbmd-grid-sizer');
        });
    },

    bindEvents: function() {
        var self = this;

		$(window).bind('resizeEnd', function() {
            self.sizeAdFrames();
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
            self.sizeAdFrames();
        });
    },

    createMasonry: function(resetLayout) {
        var self = this,
            contentPanes = this.parentPanes,
            columnWidth = '.wbmd-grid-item';

        require(["masonry/1/masonry"], function(Masonry) {
            $.each(contentPanes, function(key, value) {
                var contentPane = "#" + contentPanes[key],
                    masonryGrid = contentPane + " .wbmd-masonry-grid";

                if (!self.masonryPanes[contentPane]) {
                	self.masonryPanes[contentPane] = {"msnry":null};
                }

                if (resetLayout) {
                	self.masonryPanes[contentPane].msnry.layout();
                } else {
                	$(masonryGrid).imagesLoaded(function() {
                        self.masonryPanes[contentPane].msnry = new Masonry(masonryGrid, {
                            itemSelector: '.wbmd-grid-item',
                            columnWidth: columnWidth,
                            gutter: self.masonryGutter,
                            isFitWidth: true,
                            isResizable: true
                        });
                    });
                }
            });
        });
    },

    render: function() { // uses handlebars template above
        var self = this;

        if (typeof article_data !== "undefined") {

            self.article_data = article_data;

            if (self.hasStorage()) {
                self.addToSessionHistory();
                self.setArticlesVisited();
            }

            self.startWith('.wbmd-grid-item');

            self.createMasonry(false);

            self.bindEvents();
        }
    }
};

$(function() {
    webmd.fundedArticleMod.init();
});
