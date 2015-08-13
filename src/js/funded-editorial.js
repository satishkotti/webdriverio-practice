webmd.object.set('webmd.fundedEditorial');

webmd.fundedEditorial = {

	uaType : webmd.useragent.ua.type,

	init : function(){

		var self = this,
			artObjParam = webmd.url.getParam('artObj');

		if (self.hasStorage()) {
			self.visitedPages = JSON.parse(sessionStorage.getItem('visited')) || {};
			self.addToVisitedPages();
		}

		self.updateArticleObj().bindEvents();

		if($('#attribution_rdr').length) {
			self.moveAttribution();
		}

		if(s_sponsor_program !== 'undefined' && s_sponsor_program !== ''){
			// Funded Editorial Specific Method
			self.fundedPages();
		}

		/*if(this.uaType !== 'mobile'){
			this.stickIt();
		}*/

		if(artObjParam == 1){
			self.showArticleObj();
		}
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

	addToVisitedPages : function() {
		var self = this,
			chronId = window.s_unique_id;

		if (chronId && !self.visitedPages[chronId]) {
			self.visitedPages[chronId] = 1;
		}

		sessionStorage.setItem('visited', JSON.stringify(self.visitedPages));
	},

	updateArticleObj : function() {
		var self = this,
			articles = self.articleData ? self.articleData.articles : {};

		if (self.visitedPages[self.articleData.program.tocDctm]) {
			self.articleData.program.tocVisited = true;
		}

		$.each(articles, function(index) {
			this.isCurrent = false;

			if (self.visitedPages[this.id]) {
				this.visited = true;
			}

			if (this.id === window.s_unique_id) {
				self.articleData.currentArticle = index;
				this.isCurrent = true;
				this.visited = true;

				if (index === 0) {
					self.articleData.prevArticle = articles.length-1;
				} else {
					self.articleData.prevArticle = index-1;
				}

				if (index === articles.length-1) {
					self.articleData.nextArticle = 0;
				} else {
					self.articleData.nextArticle = index+1;
				}

			}
		});

		return self;
	},

	showArticleObj : function(){
		render();

		function injectButtons() {
			var self = this,
				$div = $('<div></div>'),
				newline = '\n'; //allows readability using inspector

			$div
				.attr({
					'class'   : 'article-obj-button-cont'
				})
				.html(
					'<button>Show Article Object</button>'
				);

			$('#toolbar').prepend($div);
		}

		function injectHBtemplateJS() {
			var self = this,
				$script = $('<script></script>'),
				newline = '\n'; //allows readability using inspector

			$script
				.attr({
					'id'   : 'article-sequence',
					'type' : 'text/x-handlebars-template'
				})
				.html(
					'<table class="art-seq">' + newline +
                    '    <thead>' + newline +
                    '        <tr>' + newline +
                    '            <th>Id</th>' + newline +
                    '            <th>DCTM Id</th>' + newline +
                    '            <th>Title</th>' + newline +
                    '            <th>Description</th>' + newline +
                    '            <th>URL</th>' + newline +
                    '            <th>Image</th>' + newline +
                    '            <th>Funded</th>' + newline +
                    '            <th>Sponsored</th>' + newline +
                    '            <th>Type</th>' + newline +
                    '        </tr>' + newline +
                    '    </thead>' + newline +
                    '    <tbody>' + newline +
                    '        {{#each articles}}' + newline +
                    '        <tr>' + newline +
                    '            <td class="id cnt-mid">{{id}}</td>' + newline +
                    '            <td class="dctm cnt-mid">{{dctm}}</td>' + newline +
                    '            <td class="title mid">{{title}}</td>' + newline +
                    '            <td class="desc mid">{{description}}</td>' + newline +
                    '            <td class="link mid"><a href="{{link}}" target="_blank">{{link}}</a></td>' + newline +
                    '            <td class="img cnt-mid"><img src="'+ window.image_server_url +'{{images.image79x79}}" alt=""></td>' + newline +
                    '            <td class="fund cnt-mid">' + newline +
                    '                {{#unless sponsored}}' + newline +
                    '                <span class="icon-check"></span>' + newline +
                    '                {{/unless}}' + newline +
                    '            </td>' + newline +
                    '            <td class="spon cnt-mid">' + newline +
                    '                {{#if sponsored}}' + newline +
                    '                <span class="icon-check"></span>' + newline +
                    '                {{/if}}' + newline +
                    '            </td>' + newline +
                    '            <td class="typ cnt-mid">{{type}}</td>' + newline +
                    '        </tr>' + newline +
                    '        {{/each}}' + newline +
                    '    </tbody>' + newline +
                    '</table>'
				);

			$('head').append($script);
		}

		function render(){ // uses handlebars template above
			var self = this;

			if (typeof webmd.fundedEditorial.articleData !== 'undefined') {
				injectButtons();

				injectHBtemplateJS();

				require(['handlebars/1/handlebars'], function(Handlebars) {
					/* jshint ignore:start */
					!function(a,b){"use strict";function c(c,g){var h=this;h.$el=a(c),h.el=c,h.id=e++,h.$el.bind("destroyed",a.proxy(h.teardown,h)),h.$clonedHeader=null,h.$originalHeader=null,h.isSticky=!1,h.hasBeenSticky=!1,h.leftOffset=null,h.topOffset=null,h.init=function(){h.setOptions(g),h.$el.each(function(){var b=a(this);b.css("padding",0),h.$originalHeader=a("thead:first",this),h.$clonedHeader=h.$originalHeader.clone(),b.trigger("clonedHeader."+d,[h.$clonedHeader]),h.$clonedHeader.addClass("tableFloatingHeader"),h.$clonedHeader.css("display","none"),h.$originalHeader.addClass("tableFloatingHeaderOriginal"),h.$originalHeader.after(h.$clonedHeader),h.$printStyle=a('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'),h.$head.append(h.$printStyle)}),h.updateWidth(),h.toggleHeaders(),h.bind()},h.destroy=function(){h.$el.unbind("destroyed",h.teardown),h.teardown()},h.teardown=function(){h.isSticky&&h.$originalHeader.css("position","static"),a.removeData(h.el,"plugin_"+d),h.unbind(),h.$clonedHeader.remove(),h.$originalHeader.removeClass("tableFloatingHeaderOriginal"),h.$originalHeader.css("visibility","visible"),h.$printStyle.remove(),h.el=null,h.$el=null},h.bind=function(){h.$scrollableArea.on("scroll."+d,h.toggleHeaders),h.isWindowScrolling||(h.$window.on("scroll."+d+h.id,h.setPositionValues),h.$window.on("resize."+d+h.id,h.toggleHeaders)),h.$scrollableArea.on("resize."+d,h.toggleHeaders),h.$scrollableArea.on("resize."+d,h.updateWidth)},h.unbind=function(){h.$scrollableArea.off("."+d,h.toggleHeaders),h.isWindowScrolling||(h.$window.off("."+d+h.id,h.setPositionValues),h.$window.off("."+d+h.id,h.toggleHeaders)),h.$scrollableArea.off("."+d,h.updateWidth)},h.toggleHeaders=function(){h.$el&&h.$el.each(function(){var b,c=a(this),e=h.isWindowScrolling?isNaN(h.options.fixedOffset)?h.options.fixedOffset.outerHeight():h.options.fixedOffset:h.$scrollableArea.offset().top+(isNaN(h.options.fixedOffset)?0:h.options.fixedOffset),f=c.offset(),g=h.$scrollableArea.scrollTop()+e,i=h.$scrollableArea.scrollLeft(),j=h.isWindowScrolling?g>f.top:e>f.top,k=(h.isWindowScrolling?g:0)<f.top+c.height()-h.$clonedHeader.height()-(h.isWindowScrolling?0:e);j&&k?(b=f.left-i+h.options.leftOffset,h.$originalHeader.css({position:"fixed","margin-top":h.options.marginTop,left:b,"z-index":3}),h.leftOffset=b,h.topOffset=e,h.$clonedHeader.css("display",""),h.isSticky||(h.isSticky=!0,h.updateWidth(),c.trigger("enabledStickiness."+d)),h.setPositionValues()):h.isSticky&&(h.$originalHeader.css("position","static"),h.$clonedHeader.css("display","none"),h.isSticky=!1,h.resetWidth(a("td,th",h.$clonedHeader),a("td,th",h.$originalHeader)),c.trigger("disabledStickiness."+d))})},h.setPositionValues=function(){var a=h.$window.scrollTop(),b=h.$window.scrollLeft();!h.isSticky||0>a||a+h.$window.height()>h.$document.height()||0>b||b+h.$window.width()>h.$document.width()||h.$originalHeader.css({top:h.topOffset-(h.isWindowScrolling?0:a),left:h.leftOffset-(h.isWindowScrolling?0:b)})},h.updateWidth=function(){if(h.isSticky){h.$originalHeaderCells||(h.$originalHeaderCells=a("th,td",h.$originalHeader)),h.$clonedHeaderCells||(h.$clonedHeaderCells=a("th,td",h.$clonedHeader));var b=h.getWidth(h.$clonedHeaderCells);h.setWidth(b,h.$clonedHeaderCells,h.$originalHeaderCells),h.$originalHeader.css("width",h.$clonedHeader.width())}},h.getWidth=function(c){var d=[];return c.each(function(c){var e,f=a(this);if("border-box"===f.css("box-sizing")){var g=f[0].getBoundingClientRect();e=g.width?g.width:g.right-g.left}else{var i=a("th",h.$originalHeader);if("collapse"===i.css("border-collapse"))if(b.getComputedStyle)e=parseFloat(b.getComputedStyle(this,null).width);else{var j=parseFloat(f.css("padding-left")),k=parseFloat(f.css("padding-right")),l=parseFloat(f.css("border-width"));e=f.outerWidth()-j-k-l}else e=f.width()}d[c]=e}),d},h.setWidth=function(a,b,c){b.each(function(b){var d=a[b];c.eq(b).css({"min-width":d,"max-width":d})})},h.resetWidth=function(b,c){b.each(function(b){var d=a(this);c.eq(b).css({"min-width":d.css("min-width"),"max-width":d.css("max-width")})})},h.setOptions=function(b){h.options=a.extend({},f,b),h.$window=a(h.options.objWindow),h.$head=a(h.options.objHead),h.$document=a(h.options.objDocument),h.$scrollableArea=a(h.options.scrollableArea),h.isWindowScrolling=h.$scrollableArea[0]===h.$window[0]},h.updateOptions=function(a){h.setOptions(a),h.unbind(),h.bind(),h.updateWidth(),h.toggleHeaders()},h.init()}var d="stickyTableHeaders",e=0,f={fixedOffset:0,leftOffset:0,marginTop:0,objDocument:document,objHead:"head",objWindow:b,scrollableArea:b};a.fn[d]=function(b){return this.each(function(){var e=a.data(this,"plugin_"+d);e?"string"==typeof b?e[b].apply(e):e.updateOptions(b):"destroy"!==b&&a.data(this,"plugin_"+d,new c(this,b))})}}(jQuery,window);
					/* jshint ignore:end */
					var sequence = $('#article-sequence'),
						container = $('.article-sequence-shell'),
						source = sequence.html(),
						template = Handlebars.compile(source),
						context = webmd.fundedEditorial.articleData || {},
						html = template(context);

					$('.article-obj-button-cont button').click(function(){
						webmd.overlay.open({
							html: html,
							width: '980px',
							height: '70%',
							onComplete: function(){
								$('.art-seq').stickyTableHeaders({ scrollableArea: $('#webmdHoverLoadedContent')[0]});
							}
						});
					});
				});
			}
		}
	},

	bindEvents : function(){
		var self = this,
			mastheadH = $('.masthead').outerHeight(true);

		$(window).scroll(function() {
			var y = $(document).scrollTop();

			if (y > mastheadH) {
				self.stickMasthead(mastheadH);
			}
			else {
				self.unstickMasthead();
			}
		});

		return self;
	},

	stickMasthead : function(mastheadH){
		$('body').addClass('masthead-stuck');
		$('body').css('padding-top',mastheadH);
	},

	unstickMasthead: function(){
		$('body').removeClass('masthead-stuck');
		$('body').css('padding-top','');
	},

	moveAttribution : function(){
		$('#attribution_rdr').detach().appendTo('.masthead-right').addClass('animate-in');
	},

	fundedPages : function(){
		// Set Global Class
		$('html').addClass('funded-editorial');

		// Hide Elements
		$('.healthSolutions').hide();
	},

	stickIt : function(){
		$('#ContentPane30').hcSticky({
			wrapperClassName : 'wmd-sidebar-sticky',
			className : 'wmd-sticky',
			responsive : true,
			offResolutions : [-736],
			//followScroll : false,
			top: 60
		});
	}
};

$(function() {
	webmd.fundedEditorial.init();
});