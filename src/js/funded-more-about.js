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

    masonryGutter: 10,

    gridType: 'scaling', // options: scaling, wrapping

    init: function() {
        if (!this.gridType || this.gridType !== 'wrapping') {
            this.gridType = 'scaling';
        }

        this.render();
    },

    startWith: function(className) {
        var self = this,
            $nodes = $(className),
            $nodeIndex,
            $nodeId;

        $nodes.each(function(index) {
            self.getAllParentPanes(this);
        });

        this.getAllNodes();

        this.H3title = $('h3.wbmd-moreabout-title');
        this.H3title.remove();

        for (var i = 0; i < this.allNodes.length; i++) {
            $nodeIndex = $(this.allNodes[i]);
            $nodeId = $nodeIndex.attr('id');

            if (!$nodeIndex.hasClass('wbmd-moreabout-title')) {
                $nodeIndex.addClass('tile-width');
                $nodeIndex.attr('data-orig-width', $nodeIndex.outerWidth());
                $nodeIndex.attr('data-orig-height', $nodeIndex.outerHeight());
                self.setInnerHTML(this.allNodes[i]);
                self.placeInGroup(this.allNodes[i]);
            }
        }

        this.setMasonryGridSizePerPane();

        this.addGridContainerToPanes();

        this.moveTitleToTop();
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

            $gridDiv.addClass('wbmd-moreabout-masonry-grid').html(html);

            $("#" + this).html("").addClass("wbmd-moreabout-masonry-container").addClass(self.gridType).append($gridDiv);
        });
    },

    moveTitleToTop: function() {
        var self = this,
            $h3 = (self.H3title.length) ? self.H3title : $('<h3></h3>');

        if (!$('h3.wbmd-moreabout-title').length) {
            $h3.addClass('wbmd-moreabout-title');
            $('div.wbmd-moreabout-masonry-container').prepend($h3);
        } else {
            $h3.parent().before($h3);
        }
        
        if ($h3.text().length <= 0) {
            $h3.text("More About");
        }
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
            articleType,
            nodeWidth;

        for (var key in articles) {
            articleId = articles[key].id;
            article = articles[key].article;

            if (articleId === $myNodeArticleNum) {
                switch (articles[key].type) {
                    case 'type_com':
                        articleType = "blog";
                        break;
                    case 'type_vid':
                        articleType = "video";
                        break;
                    case 'type_ss':
                        articleType = "slideshow";
                        break;
                    case 'type_rmq':
                        articleType = "quiz";
                        break;
                    default:
                        articleType = (articles[key].sponsored) ? "sponsored" : "article";
                        break;
                }

                $(myNode).html(
                    '<a href="' + article.link + '">' + newline +
                    '   <img src="' + article.images.image493x335 + '">' + newline +
                    '   <p>' + '<span>' + articleType + '</span>' + newline + article.title + '</p>' + newline +
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

    createMasonry: function(windowResized) {
        var self = this,
            contentPanes = this.parentPanes,
            columnWidth = '.wbmd-moreabout-grid-item';

        require(["masonry/1/masonry"], function(Masonry) {
            $.each(contentPanes, function(key, value) {
                var contentPane = "#" + contentPanes[key],
                    masonryGrid = contentPane + " .wbmd-moreabout-masonry-grid";

                if (!self.masonryPanes[contentPane]) {
                    self.masonryPanes[contentPane] = {"msnry":null};
                }

                if (windowResized) {
                    self.masonryPanes[contentPane].msnry.reloadItems();
                    self.masonryPanes[contentPane].msnry.layout();
                }

                $(masonryGrid).imagesLoaded(function() {
                    if (self.gridType === 'scaling') {
                        self.masonryPanes[contentPane].msnry = new Masonry(masonryGrid, {
                            itemSelector: '.wbmd-moreabout-grid-item',
                            columnWidth: '.wbmd-grid-sizer',
                            percentPosition: true
                        });
                    } else {
                        self.masonryPanes[contentPane].msnry = new Masonry(masonryGrid, {
                            itemSelector: '.wbmd-moreabout-grid-item',
                            columnWidth: columnWidth,
                            gutter: self.masonryGutter,
                            isFitWidth: true,
                            isResizable: true
                        });
                    }
                });
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

            self.startWith('.wbmd-moreabout-grid-item');

            self.createMasonry(false);

            self.bindEvents();
        }
    }
};

$(function() {
    webmd.fundedMoreAbout.init();
});
