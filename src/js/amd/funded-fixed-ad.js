/*
Sample Code:
$('#s5').webmdFixedAd({
	start: '#s3',
	end: '#s3',
	offset: 60
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
			start: '#s3',
			end: '#s3',
			offset: 0
		};

		$.extend(this.options, options);

		var checkMovedEl = setInterval(function() {
			var titleMoved = $( "#ContentPane12 .page-header" ).length,
				bylineMoved = $( "#ContentPane13 .byline" ).length;

			if (titleMoved > 0) {
				clearInterval(checkMovedEl);
				clearTimeout(killInterval);
				_this.getElHeight();
				_this.getStartPos();
				_this.getEndPos();
				_this.setInitScrollPos();
				_this.setWindowW();
				_this.bindEvents();
			}
		}, 100);

		var killInterval = setTimeout(function(){
			clearInterval(checkMovedEl);
		}, 1000);

		// Find end POS
		setTimeout(function(){
			_this.getEndPos();
		}, 3000);
	},

	bindEvents: function(){
		var _this = this;

		$(window).on('resize', function() {
			// if(_this.checkWindowWidth()){
			// 	_this.getElHeight();
			// 	_this.getStartPos();
			// 	_this.getEndPos();
			// }

			if(!_this.checkWindowHeight()){
				_this.unStickEl();
			}
		});

		$(window).on('scroll', function(){
			var st = $(this).scrollTop(),
				start = _this.start,
				offset = _this.options.offset,
				end = _this.end - offset;

			if(_this.checkWindowHeight()){
				if (st > _this.lastScrollTop){
					// downscroll code
					if(_this.lastScrollTop > start - offset && _this.lastScrollTop < end){
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
		}).scroll();
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

	setInitScrollPos: function(){
		var scrollTop = $(window).scrollTop();

		this.lastScrollTop = scrollTop;
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