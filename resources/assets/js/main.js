
const OVERALL_MARGIN = 40
const MQ_MEDIUM = 768

let PADDING = (OVERALL_MARGIN / 2)
let SLIDE_INNER_SIZE = { x: 0, y: 0 }
let WINDOW = { x:0, y:0 }
let SLIDESHOW_INTERVAL = undefined

class App {
	constructor() {

		this.resize = this.resize.bind(this)

		this.props = {}
		this.props.appContainer = document.getElementById('app-container')
		this.props.infoContainer = document.getElementById('info-container')
		this.props.topPart = this.props.appContainer.getElementsByClassName('top-part')[0]
		this.props.totalWidth = 0

		this.props.slides = []
		let items = $(this.props.appContainer).find('ul#slides-container li').get()
		items.forEach((item, i) => {
			let slide = new Slide(item)
			this.props.slides[i] = slide
		})

		let slideContainer = $(this.props.appContainer).find('ul#slides-container').get(0)
		this.props.slidesContainer = new SlidesContainer(slideContainer, this.props.slides)

		this.props.infoContainer = new InfoContainer()

		this.props.header = new Header(this.props.infoContainer.trigger)
		this.props.footer = new Footer()

		$(window).on('resize', this.resize)
		this.resize()

		this.props.footer.next(this.props.slidesContainer.counter.props)

		SLIDESHOW_INTERVAL = setInterval(()=> {
			this.changeSlide()
		}, 3000)

		setTimeout(()=> {
			this.props.header.open()
		}, 1200)

		this.props.slides[0].open()
	}

	changeSlide() {
		this.props.slidesContainer.next()
		this.props.slides[this.props.slidesContainer.counter.props.prev].close()
		this.props.slides[this.props.slidesContainer.counter.props.index].open()
		this.props.footer.next(this.props.slidesContainer.counter.props)
	}

	resize() {

		// assign global size values
		WINDOW.x = window.innerWidth
		WINDOW.y = window.innerHeight
		PADDING = (OVERALL_MARGIN / 2)
		WINDOW.x = WINDOW.x
		WINDOW.y = WINDOW.y

		// this.props.appContainer.style.marginLeft = PADDING + 'px'
		// this.props.appContainer.style.marginTop = PADDING + 'px'
		this.props.appContainer.style.width = WINDOW.x + 'px'
		this.props.topPart.style.height = WINDOW.y + 'px'

		this.props.totalWidth = 0
		this.props.slides.forEach((slide, i) => {
			slide.position(this.props.totalWidth, 0)
			slide.resize()
			this.props.totalWidth += WINDOW.x
		})

		this.props.header.resize()
		this.props.footer.resize()
		this.props.slidesContainer.resize()
		this.props.infoContainer.resize()
	}
}

class Slide {
	constructor(el) {
		this.props = {}
		this.props.el = el
		this.props.imgPath = $(el).find('img').attr('src')
		this.img = {
			el: $(el).find('img').get(0),
			originalWidth: 0,
			originalHeight: 0
		}
		let img = Img()
		img.load(this.props.imgPath, (img) => {
			this.img.originalWidth = img.width
			this.img.originalHeight = img.height
			this.resize()
		})
	}
	open() {
		this.props.el.classList.add('active')
	}
	close() {
		setTimeout(()=> {
			this.props.el.classList.remove('active')
		}, 0)
	}
	position(x, y) {
		this.props.el.style.left = x + 'px'
		this.props.el.style.top = y + 'px'
	}
	resize() {
		this.props.el.style.width = WINDOW.x + 'px'
		this.props.el.style.height = WINDOW.y + 'px'

		let innerW = WINDOW.x
		let innerH = WINDOW.y * .7
		if(WINDOW.x < MQ_MEDIUM) innerH = WINDOW.y * .6
		if(WINDOW.y < 720) innerH = WINDOW.y * .5
		let scale = (this.img.originalWidth > this.img.originalHeight) ? (innerW / this.img.originalWidth) * 1 : (innerH / this.img.originalHeight) * 1
		if(WINDOW.x > MQ_MEDIUM) scale = (innerH / this.img.originalHeight) * 1
		let width = this.img.originalWidth * scale
		let height = this.img.originalHeight * scale
		this.img.el.style.width = width + 'px'
		this.img.el.style.height = height + 'px'
		this.img.el.style.left = (WINDOW.x >> 1) - (width >> 1) + 'px'
		this.img.el.style.top = (WINDOW.y >> 1) - (height >> 1) + 'px'
	}
}

class SlidesContainer {
	constructor(el, slides) {
		this.props = {}
		this.props.el = el
		this.slides = slides
		this.counter = Counter(this.slides.length)
	}
	next() {
		this.counter.inc()
		let translate = 'translateX(' + (-WINDOW.x*this.counter.props.index) + 'px)'
		this.props.el.style.transform = translate
	}
	resize() {
		let translate = 'translateX(' + (-WINDOW.x*this.counter.props.index) + 'px)'
		this.props.el.style.transform = translate
	}
}

class Header {
	constructor(callback) {
		this.props = {}
		this.props.el = $(document).find('header').get(0)
		this.centerEl = $(this.props.el).find('.center-part').get(0)
		this.infoBtn = $(this.props.el).find('.right-part').get(0)

		$(this.infoBtn).on('click', callback)
	}
	open() {
	}
	resize() {
		// this.centerEl.style.left = (WINDOW.x >> 1) - ($(this.centerEl).width() >> 1) + 'px'
	}
}

class Footer {
	constructor() {
		this.props = {}
		this.props.el = $(document).find('footer').get(0)
		this.props.items = $(this.props.el).find('li').get()
		this.current = undefined
		this.previous = undefined
	}
	next(counter) {
		this.previous = this.current
		this.current = this.props.items[counter.index]
		if(this.previous) this.previous.classList.remove('active')
		this.current.classList.add('active')
	}
	resize() {
		if(WINDOW.y >= 600) {
			this.props.el.style.top = WINDOW.y - $(this.props.items[0]).height() - OVERALL_MARGIN - PADDING + 'px'
		}else{
			this.props.el.style.top = WINDOW.y - $(this.props.items[0]).height() - OVERALL_MARGIN + 'px'
		}

	}
}

class InfoContainer {
	constructor() {
		this.props = {}
		this.props.el = $(document).find('#info-container').get(0)
		this.props.header = $('header').get(0)
		this.props.insideBlockEl = $(document).find('#info-container .inside-holder').get(0)
	}
	resize() {
		// if(WINDOW.x >= MQ_MEDIUM) {
		// 	this.props.insideBlockEl.style.height = 'auto'
		// }else{
		// 	this.props.insideBlockEl.style.height = WINDOW.y + 'px'
		// }
		this.props.insideBlockEl.style.height = 'auto'
		this.props.insideBlockEl.style.top = (WINDOW.y * 0.55) - ($(this.props.insideBlockEl).height() >> 1) + 'px'
	}
}

// helpers
function Img() {
	let el = new Image()
	let onComplete = undefined
	let load = (url, callback) => {
		onComplete = callback
		el.src = url;
	}
	el.onload = () => {
		onComplete(el)
	}
	return {el, load}
}
function Counter(total, index = 0) {
	let props = {
		index: index,
		total: total,
		prev: 0,
		next: 0
	}
	let inc = (val = 1) => {
		props.index += val
		if(props.index > props.total - 1) props.index = 0
		prevNext()
	}
	let dec = (val = 1) => {
		props.index -= val
		if(props.index < 0) props.index = props.total - 1
		prevNext()
	}
	let prevNext = () => {
		props.prev = props.index - 1
		props.next = props.index + 1
		if(props.prev < 0) props.prev = props.total - 1
		if(props.next > props.total - 1) props.next = 0
	}
	prevNext()
	return { inc, dec, props }
}

function ResizePositionProportionally(windowW, windowH, contentW, contentH) {
	var aspectRatio = contentW / contentH
	var scale = ((windowW / windowH) < aspectRatio) ? (windowH / contentH) * 1 : (windowW / contentW) * 1
	var newW = contentW * scale
	var newH = contentH * scale
	var css = {
		width: newW,
		height: newH,
		left: (windowW >> 1) - (newW >> 1),
		top: (windowH >> 1) - (newH >> 1)
	}

	return css
}

$(() => {
	new App()
})
