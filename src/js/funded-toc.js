var webmd;

if(!webmd){
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
 
 
$.fn.imagesLoaded = function( callback ){
  var elems = this.find( 'img' ),
      elems_src = [],
      self = this,
      len = elems.length;
 
  if ( !elems.length ) {
    callback.call( this );
    return this;
  }
 
  elems.one('load error', function() {
    if ( --len === 0 ) {
      // Rinse and repeat.
      len = elems.length;
      elems.one( 'load error', function() {
        if ( --len === 0 ) {
          callback.call( self );
        }
      }).each(function() {
        this.src = elems_src.shift();
      });
    }
  }).each(function() {
    elems_src.push( this.src );
    // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
    // data uri bypasses webkit log warning (thx doug jones)
    this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  });
 
  return this;
};


webmd.fundedTOC = {

    init : function(id){
        this.contentPaneId = $("#grid-1").closest('div.pane')[0].id;
        $("#grid-1").remove();

        this.render();
    },

    injectHBtemplateJS: function() { // inject embedded script to reduce http calls
        var self = this,
            $script = $('<script></script>'),
            newline = '\n'; //allows readability using inspector

        $script
            .attr({
                id   : 'mod_template',
                type : 'text/x-handlebars-template'
            })
            .html(
                '{{#article_data}}' + newline +
                '   {{#each articles}}' + newline +
                '   <a href="{{article.link}}">' + newline +
                '     <div class="grid-item {{#ifequal article.pos 1}}grid-sizer{{/ifequal}} {{#if article.visited}}visited{{/if}}">' + newline +
                '       <img src="{{article.images.image493x335}}">' + newline +
                '       <p>{{article.title}}</p>' + newline +
                '     </div>' + newline +
                '   </a>' + newline +
                '   {{/each}}' + newline +
                '{{/article_data}}'
            );

        $('head').append($script);
    },

    setCurrentArticle : function() {
        var self = this,
            url = window.location.href,
            current_url = url.split("?")[0].split("#")[0], // remove querystring and hash from url
            articles = article_data.articles,
            article;

        for(var key in articles) {
            article = articles[key].article;
            articles[key].current = false;

            if (article.link === current_url) {
                article_data.current_article_id = articles[key].id;
                articles[key].current = true;

                if (articles[key].sponsored) {
                    self.is_current_sponsored = true;
                }

                self.setNavArticles();
                break;
            }
        }
    },

    addToSessionHistory : function(url) {
        var self = this,
            jsonStr = sessionStorage.visitedPages || '{}',
            visitedObj = JSON.parse(jsonStr),
            urlExists = false;

        for (key in visitedObj.visited) {
            if (visitedObj.visited[key].page === url) {
                urlExists = true;
                break;
            }
        }

        if (!urlExists && url) {
            visitedObj["visited"].push({"page" : url});
        }
        
        this.setArticlesVisited(visitedObj);

        sessionStorage.visitedPages = JSON.stringify(visitedObj);
    },

    setArticlesVisited : function(history) {
        var self = this,
            article,
            article_link,
            history_page;

        for (var key in article_data.articles) {
            article = article_data.articles[key].article;
            article_link = article.link;

            for(var j in history.visited) {
                history_page = history_link = history.visited[j].page;
                article.visited = false;

                if (article_link === history_page) {
                    article.visited = true;
                }
            }
        }
    },

    render: function(){ // uses handlebars template above
        var self = this,
            $uniqueDiv = $("<div></div>");

        if (typeof article_data !== "undefined") {
            //self.addToSessionHistory();

            self.injectHBtemplateJS();
                
            require(["handlebars/1/handlebars", "underscore/1/underscore", "masonry/1/masonry"], function(Handlebars, _, Masonry) {
                var $template = $("#mod_template"),
                    source = $template.html(),
                    uniqueId = _.uniqueId("id_"),
                    $container = $("#" + uniqueId),
                    context,
                    template,
                    html;

                Handlebars.registerHelper('ifequal', function(value, value2, options) {
                  if (value != value2) {
                      return options.inverse(this);
                  }
                  return options.fn(this);
                });

                context = {"article_data" : article_data} || {};

                template = Handlebars.compile(source);
                    
                html = template(context);
                    
                $uniqueDiv.attr({ id : uniqueId });

                $("#" + self.contentPaneId).append($uniqueDiv).addClass('addTopMargin');

                $uniqueDiv.append(html);

                $container.imagesLoaded(function(){
                    new Masonry("#" + uniqueId, {
                        itemSelector : '.grid-item',
                        columnWidth : '.grid-sizer',
                        gutter: 20,
                        isFitWidth: true
                    });
                });
            });
        }
    }
};

$(function() {
    webmd.fundedTOC.init();
});