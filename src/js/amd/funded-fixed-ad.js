webmd.object.set('webmd.fixedAd');

webmd.fixedAd = {
	options: {
		elm: null,
		start: null,
		end: null,
		offset: 0
	},
	elmH: 0,
	start: 0,
	end: 0,
	lastScrollTop : 0,
	init: function(opts){
		var _this = this;

		$.extend(this.options, opts);

		this.bindEvents();
		this.getElmHeight();
		setTimeout(function(){
			_this.getStartPos();
			_this.getEndPos();
		}, 500);
	},

	bindEvents: function(){
		var _this = this;

		$(window).scroll(function(event){
			var st = $(this).scrollTop(),
				start = _this.start,
				offset = _this.options.offset,
				end = _this.end - offset;

			console.log(_this.lastScrollTop, end);

			if (st > _this.lastScrollTop){
				// downscroll code
				console.log('scrolling down');
				if(_this.lastScrollTop > start - _this.options.offset && _this.lastScrollTop < end){
					console.log('stick element');
					_this.stickElm();
				} else if(_this.lastScrollTop > end){
					console.log('stick to bottom');
					_this.stickElmToBottom();
				}
			} else {
				// upscroll code
				console.log('scrolling up');
				if(_this.lastScrollTop < start){
					console.log('unstick element');
					_this.unStickElm();
				} else if(_this.lastScrollTop < end) {
					_this.stickElm();
				}
			}
			_this.lastScrollTop = st;
		});
	},

	getElmHeight: function(){
		this.elmH = $(this.options.elm).outerHeight();
		console.log('element height: ' + this.elmH);
	},

	getStartPos: function(){
		this.start = $(this.options.start).offset().top;
		console.log('element start position: ' + this.start);

		this.moveToStartPos();
	},

	getEndPos: function(){
		var elmH = $(this.options.end).outerHeight(),
			elmOffset = $(this.options.end).offset().top;

		this.end = elmH + elmOffset - this.elmH;

		console.log('element end position: ' + this.end);
	},

	moveToStartPos: function(){
		$(this.options.elm).css('top', this.start);
		$(this.options.elm).show();
	},

	stickElm: function(){
		$(this.options.elm).addClass('stuck').css('top', this.options.offset);
	},

	unStickElm:function(){
		$(this.options.elm).removeClass('stuck');
		this.moveToStartPos();
	},

	stickElmToBottom: function(){
		$(this.options.elm).removeClass('stuck').css('top', this.end);
	},

	enablePlugin: function () {
		$.fn.inView = function() {
			var win = $(window), // window
				obj = $(this), // object to check
				scrollPosition = win.scrollTop(), // the top scroll position in the page
				visibleArea = win.scrollTop() + win.height(), // the end of the visible area in the page, starting from the scroll position
				objEndPos = (obj.offset().top + obj.outerHeight(false)); // the end of the object to check

			// if object is visible return true, else false
			return (visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false);
		};
	},

};