/*
Sample Code
require(["funded-editorial/1/funded-fixed-ad", "css!funded-editorial/1/funded-fixed-ad.min"], function() {
	$(function() {
		$('#s5').webmdFixedAd({
			start: '#art',
			end: '#art',
			offset: 60
		});
	});
	// Make users start at the top of the page on page load
	$(window).on('beforeunload', function(){
		$(window).scrollTop(0);
	});
});
*/
webmd.object.set('webmd.webmdFixedAd');

webmd.webmdFixedAd = {
	elH: 0,
	start: 0,
	end: 0,
	lastScrollTop : 0,
	lastWindowW : 0,

	init: function(options, el){
		var _this = this;

		this.el = $(el);

		this.options = {
			start: '#art',
			end: '#art',
			offset: 0
		};

		$.extend(this.options, options);

		var checkMovedEl = setInterval(function() {
			var titleMoved = $( "#ContentPane12 .page-header" ).length,
				bylineMoved = $( "#ContentPane13 .byline" ).length;

			if (titleMoved > 0 && bylineMoved > 0) {
				clearInterval(checkMovedEl);
				clearTimeout(killInterval);
				_this.bindEvents();
				_this.getElHeight();
				_this.getStartPos();
				_this.getEndPos();
				_this.setWindowW();
			}
		}, 100);

		var killInterval = setTimeout(function(){
			clearInterval(checkMovedEl);
		}, 1000);
	},

	bindEvents: function(){
		var _this = this;

		$(window).resize(function() {
			if(_this.checkWindowWidth()){
				_this.getElHeight();
				_this.getStartPos();
				_this.getEndPos();
			}

			if(!_this.checkWindowHeight()){
				_this.unStickEl();
			}
		});

		$(window).scroll(function(event){
			var st = $(this).scrollTop(),
				start = _this.start,
				offset = _this.options.offset,
				end = _this.end - offset;

			if(_this.checkWindowHeight()){
				if (st > _this.lastScrollTop){
					// downscroll code
					if(_this.lastScrollTop > start - _this.options.offset && _this.lastScrollTop < end){
						_this.stickEl();
					} else if(_this.lastScrollTop > end){
						_this.stickElToBottom();
					}
				} else {
					// upscroll code
					if(_this.lastScrollTop < start){
						_this.unStickEl();
					} else if(_this.lastScrollTop < end) {
						_this.stickEl();
					}
				}
				_this.lastScrollTop = st;
			} else {
				_this.unStickEl();
			}
		});
	},

	checkWindowHeight: function(){
		var elH = this.elH,
			offset = this.options.offset,
			winH = $(window).height();

		if(winH > elH + offset){
			return true;
		} else {
			return false;
		}
	},

	setWindowW: function(){
		var winW = $(window).width();

		this.lastWindowW = winW;
	},

	checkWindowWidth: function(){
		var winW = $(window).width();

		if(this.lastWindowW > winW || this.lastWindowW < winW){
			this.setWindowW();

			return true;
		} else {
			this.setWindowW();

			return false;
		}
	},

	getElHeight: function(){
		this.elH = $(this.el).outerHeight();
	},

	getStartPos: function(){
		this.start = $(this.options.start).offset().top;
		this.moveToStartPos();
	},

	getEndPos: function(){
		var elH = $(this.options.end).outerHeight(),
			elOffset = $(this.options.end).offset().top;

		this.end = elH + elOffset - this.elH;
	},

	moveToStartPos: function(){
		$(this.el).css('top', this.start);
		$(this.el).show();
	},

	stickEl: function(){
		$(this.el).addClass('stuck').css('top', this.options.offset);
		$('html').addClass('fixed-ad-stuck');
	},

	unStickEl:function(){
		$(this.el).removeClass('stuck');
		$('html').addClass('fixed-ad-unstuck');
		this.moveToStartPos();
	},

	stickElToBottom: function(){
		$(this.el).removeClass('stuck').css('top', this.end);
	}
};

// Make Fixed Ad into a JQuery Plugin
webmd.plugin('webmdFixedAd', webmd.webmdFixedAd);