'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OVERALL_MARGIN = 40;
var MQ_MEDIUM = 768;

var PADDING = OVERALL_MARGIN / 2;
var SLIDE_INNER_SIZE = { x: 0, y: 0 };
var WINDOW = { x: 0, y: 0 };
var SLIDESHOW_INTERVAL = undefined;

var App = function () {
	function App() {
		var _this = this;

		_classCallCheck(this, App);

		this.resize = this.resize.bind(this);

		this.props = {};
		this.props.appContainer = document.getElementById('app-container');
		this.props.infoContainer = document.getElementById('info-container');
		this.props.topPart = this.props.appContainer.getElementsByClassName('top-part')[0];
		this.props.totalWidth = 0;

		this.props.slides = [];
		var items = $(this.props.appContainer).find('ul#slides-container li').get();
		items.forEach(function (item, i) {
			var slide = new Slide(item);
			_this.props.slides[i] = slide;
		});

		var slideContainer = $(this.props.appContainer).find('ul#slides-container').get(0);
		this.props.slidesContainer = new SlidesContainer(slideContainer, this.props.slides);

		this.props.infoContainer = new InfoContainer();

		this.props.header = new Header(this.props.infoContainer.trigger);
		this.props.footer = new Footer();

		$(window).on('resize', this.resize);
		this.resize();

		this.props.footer.next(this.props.slidesContainer.counter.props);

		SLIDESHOW_INTERVAL = setInterval(function () {
			_this.changeSlide();
		}, 3000);

		setTimeout(function () {
			_this.props.header.open();
		}, 1200);

		this.props.slides[0].open();
	}

	_createClass(App, [{
		key: 'changeSlide',
		value: function changeSlide() {
			this.props.slidesContainer.next();
			this.props.slides[this.props.slidesContainer.counter.props.prev].close();
			this.props.slides[this.props.slidesContainer.counter.props.index].open();
			this.props.footer.next(this.props.slidesContainer.counter.props);
		}
	}, {
		key: 'resize',
		value: function resize() {
			var _this2 = this;

			// assign global size values
			WINDOW.x = window.innerWidth;
			WINDOW.y = window.innerHeight;
			PADDING = OVERALL_MARGIN / 2;
			WINDOW.x = WINDOW.x;
			WINDOW.y = WINDOW.y;

			// this.props.appContainer.style.marginLeft = PADDING + 'px'
			// this.props.appContainer.style.marginTop = PADDING + 'px'
			this.props.appContainer.style.width = WINDOW.x + 'px';
			this.props.topPart.style.height = WINDOW.y + 'px';

			this.props.totalWidth = 0;
			this.props.slides.forEach(function (slide, i) {
				slide.position(_this2.props.totalWidth, 0);
				slide.resize();
				_this2.props.totalWidth += WINDOW.x;
			});

			this.props.header.resize();
			this.props.footer.resize();
			this.props.slidesContainer.resize();
			this.props.infoContainer.resize();
		}
	}]);

	return App;
}();

var Slide = function () {
	function Slide(el) {
		var _this3 = this;

		_classCallCheck(this, Slide);

		this.props = {};
		this.props.el = el;
		this.props.imgPath = $(el).find('img').attr('src');
		this.img = {
			el: $(el).find('img').get(0),
			originalWidth: 0,
			originalHeight: 0
		};
		var img = Img();
		img.load(this.props.imgPath, function (img) {
			_this3.img.originalWidth = img.width;
			_this3.img.originalHeight = img.height;
			_this3.resize();
		});
	}

	_createClass(Slide, [{
		key: 'open',
		value: function open() {
			this.props.el.classList.add('active');
		}
	}, {
		key: 'close',
		value: function close() {
			var _this4 = this;

			setTimeout(function () {
				_this4.props.el.classList.remove('active');
			}, 0);
		}
	}, {
		key: 'position',
		value: function position(x, y) {
			this.props.el.style.left = x + 'px';
			this.props.el.style.top = y + 'px';
		}
	}, {
		key: 'resize',
		value: function resize() {
			this.props.el.style.width = WINDOW.x + 'px';
			this.props.el.style.height = WINDOW.y + 'px';

			var innerW = WINDOW.x;
			var innerH = WINDOW.y * .7;
			if (WINDOW.x < MQ_MEDIUM) innerH = WINDOW.y * .6;
			if (WINDOW.y < 720) innerH = WINDOW.y * .5;
			var scale = this.img.originalWidth > this.img.originalHeight ? innerW / this.img.originalWidth * 1 : innerH / this.img.originalHeight * 1;
			if (WINDOW.x > MQ_MEDIUM) scale = innerH / this.img.originalHeight * 1;
			var width = this.img.originalWidth * scale;
			var height = this.img.originalHeight * scale;
			this.img.el.style.width = width + 'px';
			this.img.el.style.height = height + 'px';
			this.img.el.style.left = (WINDOW.x >> 1) - (width >> 1) + 'px';
			this.img.el.style.top = (WINDOW.y >> 1) - (height >> 1) + 'px';
		}
	}]);

	return Slide;
}();

var SlidesContainer = function () {
	function SlidesContainer(el, slides) {
		_classCallCheck(this, SlidesContainer);

		this.props = {};
		this.props.el = el;
		this.slides = slides;
		this.counter = Counter(this.slides.length);
	}

	_createClass(SlidesContainer, [{
		key: 'next',
		value: function next() {
			this.counter.inc();
			var translate = 'translateX(' + -WINDOW.x * this.counter.props.index + 'px)';
			this.props.el.style.transform = translate;
		}
	}, {
		key: 'resize',
		value: function resize() {
			var translate = 'translateX(' + -WINDOW.x * this.counter.props.index + 'px)';
			this.props.el.style.transform = translate;
		}
	}]);

	return SlidesContainer;
}();

var Header = function () {
	function Header(callback) {
		_classCallCheck(this, Header);

		this.props = {};
		this.props.el = $(document).find('header').get(0);
		this.centerEl = $(this.props.el).find('.center-part').get(0);
		this.infoBtn = $(this.props.el).find('.right-part').get(0);

		$(this.infoBtn).on('click', callback);
	}

	_createClass(Header, [{
		key: 'open',
		value: function open() {}
	}, {
		key: 'resize',
		value: function resize() {
			// this.centerEl.style.left = (WINDOW.x >> 1) - ($(this.centerEl).width() >> 1) + 'px'
		}
	}]);

	return Header;
}();

var Footer = function () {
	function Footer() {
		_classCallCheck(this, Footer);

		this.props = {};
		this.props.el = $(document).find('footer').get(0);
		this.props.items = $(this.props.el).find('li').get();
		this.current = undefined;
		this.previous = undefined;
	}

	_createClass(Footer, [{
		key: 'next',
		value: function next(counter) {
			this.previous = this.current;
			this.current = this.props.items[counter.index];
			if (this.previous) this.previous.classList.remove('active');
			this.current.classList.add('active');
		}
	}, {
		key: 'resize',
		value: function resize() {
			if (WINDOW.y >= 600) {
				this.props.el.style.top = WINDOW.y - $(this.props.items[0]).height() - OVERALL_MARGIN - PADDING + 'px';
			} else {
				this.props.el.style.top = WINDOW.y - $(this.props.items[0]).height() - OVERALL_MARGIN + 'px';
			}
		}
	}]);

	return Footer;
}();

var InfoContainer = function () {
	function InfoContainer() {
		_classCallCheck(this, InfoContainer);

		this.props = {};
		this.props.el = $(document).find('#info-container').get(0);
		this.props.header = $('header').get(0);
		this.props.insideBlockEl = $(document).find('#info-container .inside-holder').get(0);
	}

	_createClass(InfoContainer, [{
		key: 'resize',
		value: function resize() {
			// if(WINDOW.x >= MQ_MEDIUM) {
			// 	this.props.insideBlockEl.style.height = 'auto'
			// }else{
			// 	this.props.insideBlockEl.style.height = WINDOW.y + 'px'
			// }
			this.props.insideBlockEl.style.height = 'auto';
			this.props.insideBlockEl.style.top = WINDOW.y * 0.55 - ($(this.props.insideBlockEl).height() >> 1) + 'px';
		}
	}]);

	return InfoContainer;
}();

// helpers


function Img() {
	var el = new Image();
	var onComplete = undefined;
	var load = function load(url, callback) {
		onComplete = callback;
		el.src = url;
	};
	el.onload = function () {
		onComplete(el);
	};
	return { el: el, load: load };
}
function Counter(total) {
	var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	var props = {
		index: index,
		total: total,
		prev: 0,
		next: 0
	};
	var inc = function inc() {
		var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

		props.index += val;
		if (props.index > props.total - 1) props.index = 0;
		prevNext();
	};
	var dec = function dec() {
		var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

		props.index -= val;
		if (props.index < 0) props.index = props.total - 1;
		prevNext();
	};
	var prevNext = function prevNext() {
		props.prev = props.index - 1;
		props.next = props.index + 1;
		if (props.prev < 0) props.prev = props.total - 1;
		if (props.next > props.total - 1) props.next = 0;
	};
	prevNext();
	return { inc: inc, dec: dec, props: props };
}

function ResizePositionProportionally(windowW, windowH, contentW, contentH) {
	var aspectRatio = contentW / contentH;
	var scale = windowW / windowH < aspectRatio ? windowH / contentH * 1 : windowW / contentW * 1;
	var newW = contentW * scale;
	var newH = contentH * scale;
	var css = {
		width: newW,
		height: newH,
		left: (windowW >> 1) - (newW >> 1),
		top: (windowH >> 1) - (newH >> 1)
	};

	return css;
}

$(function () {
	new App();
});
//# sourceMappingURL=all.js.map
