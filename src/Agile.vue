<template>
	<div>
		<div>auto play: {{ autoPlayInterval }}</div>
		<div>pause auto play: {{ pauseAutoPlay }}</div>
		<div>auto play remaining: {{ autoPlayRemaining }}</div>
		<div>auto play start: {{ autoPlayStart }}</div>

		<div class="agile" :class="{'agile--auto-play': settings.autoPlay, 'agile--infinite': settings.infinite, 'agile--fade': settings.fade && !settings.un-agile, 'agile--disabled': settings.unAgile}">
			<div ref="list" class="agile__list">
				<div ref="track" class="agile__track" :style="{transform: `translate(-${transform + margin}px)`, transition: `transform ${settings.timing} ${transitionDelay}ms`}" @mouseover="handleMouseOver('track')" @mouseout="handleMouseOut('track')">
					<div class="agile__slides agile__slides--cloned" ref="slidesClonedBefore" v-if="clonedSlides">
						<slot></slot>
					</div>

					<div class="agile__slides agile__slides--regular" ref="slides">
						<slot></slot>
					</div>

					<div class="agile__slides agile__slides--cloned" ref="slidesClonedAfter" v-if="clonedSlides">
						<slot></slot>
					</div>
				</div>
			</div>

			<ul ref="dots" v-if="settings.dots && !settings.unagile" class="agile__dots">
				<li v-for="n in slidesCount" :key="n" class="agile__dot" :class="{'agile__dot--current': n - 1 === currentSlide}" @mouseover="handleMouseOver('dot')" @mouseout="handleMouseOut('dot')">
					<button @click="goTo(n - 1), restartAutoPlay()">{{n}}</button>
				</li>
			</ul>

			<button v-if="settings.navButtons && !settings.unagile" class="agile__nav-button agile__nav-button--prev" :disabled="!canGoToPrev" @click="goToPrev(), restartAutoPlay()" ref="prevButton">
				<slot name="prevButton">
					<svg x="0px" y="0px" viewBox="0 0 24 24">
						<path d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z"/>
					</svg>
				</slot>
			</button>

			<button v-if="settings.navButtons && !settings.unagile" class="agile__nav-button agile__nav-button--next" :disabled="!canGoToNext" @click="goToNext(), restartAutoPlay()" ref="nextButton">
				<slot name="nextButton">
					<svg x="0px" y="0px" viewBox="0 0 24 24">
						<path d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z"/>
					</svg>
				</slot>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'agile',

		props: {
			// Depreciated
			arrows: {
				type: Boolean,
				default: true
			},

			asNavFor: {
				type: Array,
				default: function () {
					return []
				}
			},

			autoPlay: {
				type: Boolean,
				default: false
			},

			autoPlaySpeed: {
				type: Number,
				default: 3000
			},

			centerMode: {
				type: Boolean,
				default: false
			},

			centerPadding: {
				type: String,
				default: '15%'
			},

			dots: {
				type: Boolean,
				default: true
			},

			fade: {
				type: Boolean,
				default: false
			},

			infinite: {
				type: Boolean,
				default: true
			},

			initialSlide: {
				type: Number,
				default: 0
			},

			mobileFirst: {
				type: Boolean,
				default: true
			},

			navButtons: {
				type: Boolean,
				default: true
			},

			// Depreciated
			nextArrow: {
				type: String,
				default: null
			},

			options: {
				type: Object,
				default: () => null
			},

			pauseOnDotsHover: {
				type: Boolean,
				default: false
			},

			pauseOnHover: {
				type: Boolean,
				default: true
			},

			// Depreciated
			prevArrow: {
				type: String,
				default: null
			},

			responsive: {
				type: Array,
				default: () => null
			},

			slidesToScroll: {
				type: Number,
				default: 1
			},

			slidesToShow: {
				type: Number,
				default: 1
			},

			speed: {
				type: Number,
				default: 300
			},

			timing: {
				type: String,
				default: 'ease' // linear, ease-in, ease-out, ease-in-out
			},

			unAgile: {
				type: Boolean,
				default: false
			}
		},

		data () {
			return {
				slides: [],
				slidesClonedBefore: [],
				slidesClonedAfter: [],
				autoPlayInterval: null,
				autoPlayTimeout: null,
				pauseAutoPlay: false,
				autoPlayStart: null,
				autoPlayRemaining: null,
				// autoplayStatus: false,
				// autoplayTimeout: null,
				currentSlide: null,
				mouseDown: false,
				dragStartX: 0,
				dragStartY: 0,
				dragDistance: 0,
				swipeDistance: 50,
				transform: 0,
				transitionDelay: 0,
				widthWindow: 0,
				widthContainer: 0,
				widthSlide: 0,
				initialSettings: {
					asNavFor: this.asNavFor,
					autoPlay: this.autoPlay,
					autoPlaySpeed: this.autoPlaySpeed,
					centerMode: this.centerMode,
					centerPadding: this.centerPadding,
					dots: this.dots,
					fade: this.fade,
					infinite: this.infinite,
					initialSlide: this.initialSlide,
					mobileFirst: this.mobileFirst,
					navButtons: this.navButtons,
					pauseOnDotsHover: this.pauseOnDotsHover,
					pauseOnHover: this.pauseOnHover,
					responsive: this.responsive,
					slidesToScroll: this.slidesToScroll,
					slidesToShow: this.slidesToShow,
					speed: this.speed,
					timing: this.timing,
					unAgile: this.unAgile
				},
				settings: {}
			}
		},

		computed: {
			canGoToPrev: function () {
				return (this.settings.infinite || this.currentSlide > 0)
			},

			canGoToNext: function () {
				return (this.settings.infinite || this.currentSlide < this.slidesCount - 1)
			},

			clonedSlides: function () {
				return (!this.settings.unagile && !this.settings.fade && this.settings.infinite)
			},

			breakpoints: function () {
				return (!this.initialSettings.responsive) ? [] : this.initialSettings.responsive.map(item => item.breakpoint)
			},

			currentBreakpoint: function () {
				let breakpoints = this.breakpoints.map(item => item).reverse()
				return (this.initialSettings.mobileFirst) ? breakpoints.find(item => item < this.widthWindow) || 0 : breakpoints.find(item => item > this.widthWindow) || null
			},

			allSlides: function () {
				return (this.clonedSlides) ? [...this.slidesClonedBefore, ...this.slides, ...this.slidesClonedAfter] : this.slides
			},

			slidesCount: function () {
				return this.slides.length
			},

			allSlidesCount: function () {
				return this.allSlides.length
			},

			margin: function () {
				return (this.clonedSlides) ? this.slidesCount * this.widthSlide : 0
			}
		},

		watch: {
			// Watch window width change
			widthWindow () {
				// this.reload()
				this.prepareCarousel()
			},

			// Watch current slide change
			currentSlide () {
				this.prepareSlidesClasses()

				// Set start time of slide
				this.autoPlayStart = (this.settings.autoPlay) ? +new Date() : null

				this.$emit('afterChange', { currentSlide: this.currentSlide })
			},

			// Recalculate settings
			currentBreakpoint () {
				this.prepareSettings()
				this.$emit('breakpoint', { breakpoint: this.currentBreakpoint })
			},

			// Watch drag distance change
			dragDistance () {
				if (this.mouseDown) {
					if (this.dragDistance > this.swipeDistance && this.canGoToPrev) {
						this.goToPrev()
						this.handleMouseUp()
					}

					if (this.dragDistance < -1 * this.swipeDistance && this.canGoToNext) {
						this.goToNext()
						this.handleMouseUp()
					}
				}
			},

			'settings.fade' () {
				this.toggleFade()
			},

			'settings.autoPlay' () {
				this.toggleAutoPlay()
			},

			pauseAutoPlay (nevValue) {
				if (nevValue) {
					// Store current slide remaining time and disable auto play mode
					this.remaining = this.settings.autoPlaySpeed - (+new Date() - this.autoPlayStart)
					console.log(this.remaining, this.settings.autoPlaySpeed, +new Date(), this.autoPlayStart)
					this.disableAutoPlay()
					this.clearAutoPlayPause()
				} else {
					// Go to next after remaining time and rerun auto play mode
					this.autoPlayTimeout = setTimeout(() => {
						this.clearAutoPlayPause()
						this.goToNext()
						this.toggleAutoPlay()
					}, this.remaining)
				}
			}
		},

		created () {
			// Depreciated options
			if (process.env.NODE_ENV !== 'production') {
				// arrows
				if (this.arrows || (this.options && (this.options.arrows || (this.options.responsive && this.options.responsive.find(item => item.arrows))))) {
					console.warn('Prop arrows is depreciated and will be removed in version 1.1. Use navButtons instead.')
				}

				// prevArrow & nextArrow
				if (this.prevArrow || this.nextArrow || (this.options && (this.options.prevArrow || this.options.nextArrow || (this.options.responsive && this.options.responsive.find(item => item.prevArrow || item.nextArrow))))) {
					console.warn('Props prevArrow and nextArrow are depreciated and will be removed in version 1.1. Use prevButton and nextButton slots instead.')
				}
			}

			// Read settings from options object
			if (this.options) {
				for (let key in this.options) {
					this.initialSettings[key] = this.options[key]
				}
			}

			// Sort breakpoints
			if (this.initialSettings.responsive) {
				this.initialSettings.responsive.sort(this.compare)
			}

			// Set first load settings
			Object.assign(this.settings, this.initialSettings)
		},

		mounted () {
			// Windows resize listener
			window.addEventListener('resize', this.getWidth)

			// Mouse and touch events
			if ('ontouchstart' in window) {
				this.$refs.track.addEventListener('touchstart', this.handleMouseDown)
				this.$refs.track.addEventListener('touchend', this.handleMouseUp)
				this.$refs.track.addEventListener('touchmove', this.handleMouseMove)
			} else {
				this.$refs.track.addEventListener('mousedown', this.handleMouseDown)
				this.$refs.track.addEventListener('mouseup', this.handleMouseUp)
				this.$refs.track.addEventListener('mousemove', this.handleMouseMove)
			}

			// Init
			// this.prepareSlides()
			this.getWidth()
			this.prepareSettings()
			this.prepareSlides()
		},

		beforeDestroy () {
			window.removeEventListener('resize', this.getWidth)

			if ('ontouchstart' in window) {
				this.$refs.track.removeEventListener('touchstart', this.handleMouseDown)
				this.$refs.track.removeEventListener('touchend', this.handleMouseUp)
				this.$refs.track.removeEventListener('touchmove', this.handleMouseMove)
			} else {
				this.$refs.track.removeEventListener('mousedown', this.handleMouseDown)
				this.$refs.track.removeEventListener('mouseup', this.handleMouseUp)
				this.$refs.track.removeEventListener('mousemove', this.handleMouseMove)
			}

			this.disableAutoPlay()
		},

		methods: {
			// Convert HTML Collection to JS Array
			htmlCollectionToArray (collection) {
				return Array.prototype.slice.call(collection, 0)
			},

			// Compare elements for breakpoints sorting
			compare (a, b) {
				if (a.breakpoint < b.breakpoint) {
					return (this.initialSettings.mobileFirst) ? -1 : 1
				} else if (a.breakpoint > b.breakpoint) {
					return (this.initialSettings.mobileFirst) ? 1 : -1
				} else {
					return 0
				}
			},

			getWidth () {
				let computedStyle = getComputedStyle(this.$refs.list)
				this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				this.widthContainer = this.settings.centerMode ? this.$refs.list.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight) : this.$refs.list.clientWidth
			},

			handleMouseDown (e) {
				if (!e.touches) {
					e.preventDefault()
				}
				this.mouseDown = true
				this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
				this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
			},

			handleMouseMove (e) {
				this.disableScroll()
				let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
				let positionY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
				let dragDistanceX = Math.abs(positionX - this.dragStartX)
				let dragDistanceY = Math.abs(positionY - this.dragStartY)
				if (dragDistanceX > 3 * dragDistanceY) {
					this.dragDistance = positionX - this.dragStartX
				}
			},

			handleMouseUp () {
				this.mouseDown = false
				this.enableScroll()
			},

			handleMouseOver (element) {
				if (this.settings.autoPlay) {
					if ((element === 'dot' && this.settings.pauseOnDotsHover) || (element === 'track' && this.settings.pauseOnHover)) {
						this.pauseAutoPlay = true
					}
				}
			},

			handleMouseOut (element) {
				if (this.settings.autoPlay) {
					if ((element === 'dot' && this.settings.pauseOnDotsHover) || (element === 'track' && this.settings.pauseOnHover)) {
						this.pauseAutoPlay = false
					}
				}
			},

			// Prepare settings object
			prepareSettings () {
				if (!this.initialSettings.responsive) {
					this.toggleFade()
					this.toggleAutoPlay()
					return false
				}

				let newSettings = Object.assign({}, this.initialSettings)
				delete newSettings.responsive

				this.initialSettings.responsive.forEach(option => {
					if (this.initialSettings.mobileFirst ? option.breakpoint < this.widthWindow : option.breakpoint > this.widthWindow) {
						for (let key in option.settings) {
							newSettings[key] = option.settings[key]
						}
					}
				})

				this.settings = Object.assign({}, newSettings)
			},

			// Prepare slides classes and styles
			prepareSlides () {
				this.slides = this.htmlCollectionToArray(this.$refs.slides.children)

				// Probably timeout needed
				if (this.clonedSlides) {
					this.slidesClonedBefore = this.htmlCollectionToArray(this.$refs.slidesClonedBefore.children)
					this.slidesClonedAfter = this.htmlCollectionToArray(this.$refs.slidesClonedAfter.children)
				}

				for (let slide of this.allSlides) {
					slide.classList.add('agile__slide')
				}
			},

			// Prepare slides active/current classes
			prepareSlidesClasses () {
				// Remove active & current classes
				for (let i = 0; i < this.slidesCount; i++) {
					this.slides[i].classList.remove('agile__slide--active')
					this.slides[i].classList.remove('agile__slide--current')
				}

				// Add active & current class for current slide
				this.slides[this.currentSlide].classList.add('agile__slide--active')

				// TODO: centerMode, slidesToShow, slidesToScroll
				this.slides[this.currentSlide].classList.add('agile__slide--current')
			},

			// Prepare carousel styles
			prepareCarousel () {
				this.widthSlide = !this.settings.unagile ? this.widthContainer / this.settings.slidesToShow : 'auto'

				// Actions on document resize
				for (let i = 0; i < this.allSlidesCount; i++) {
					this.allSlides[i].style.width = this.widthSlide + 'px'
				}

				// Prepare track
				if (this.settings.unagile) {
					this.transform = 0
				} else {
					if (this.currentSlide === null) {
						this.currentSlide = this.settings.initialSlide
					}

					this.goTo(this.currentSlide, false, false)
				}
			},

			toggleFade () {
				let enabled = (!this.settings.unagile && this.settings.fade)

				for (let i = 0; i < this.slidesCount; i++) {
					this.slides[i].style.transition = (enabled) ? 'opacity ' + this.settings.timing + ' ' + this.settings.speed + 'ms' : 'none'
					this.slides[i].style.transform = (enabled) ? `translate(-${i * this.widthSlide}px)` : 'none'
				}
			},

			toggleAutoPlay () {
				let enabled = (!this.settings.unagile && this.settings.autoPlay)

				if (!this.autoPlayInterval && enabled) {
					// Set start time of first slide if not exist
					// if (!this.autoPlayStart) {
					// 	this.autoPlayStart = +new Date()
					// }

					this.autoPlayInterval = setInterval(() => {
						if (!document.hidden) {
							if (!this.canGoToNext) {
								this.disableAutoPlay()
							} else {
								// this.autoPlayStart = +new Date()
								this.goToNext()
							}
						}
					}, this.settings.autoPlaySpeed)
				} else {
					this.disableAutoPlay()
				}
			},

			restartAutoPlay () {
				this.disableAutoPlay()
				this.toggleAutoPlay()
			},

			disableAutoPlay () {
				clearInterval(this.autoPlayInterval)
				this.autoPlayInterval = null
			},

			clearAutoPlayPause () {
				clearTimeout(this.autoPlayTimeout)
				this.autoPlayRemaining = null
			},

			disableScroll () {
				document.ontouchmove = (e) => e.preventDefault()
			},

			enableScroll () {
				document.ontouchmove = () => false
			},

			// Return current slide index
			getCurrentSlide () {
				return this.currentSlide
			},

			// Return current breakpoint
			getCurrentBreakpoint () {
				return this.currentBreakpoint
			},

			// Return settings for current breakpoint
			getCurrentSettings () {
				return this.settings
			},

			// Return initial settings
			getInitialSettings () {
				return this.initialSettings
			},

			// Go to next slide
			goToNext () {
				if (this.canGoToNext) {
					this.goTo(this.currentSlide + 1)
				}
			},

			// Go to previous slide
			goToPrev () {
				if (this.canGoToPrev) {
					this.goTo(this.currentSlide - 1)
				}
			},

			// Go to slide
			goTo (n, transition = true) {
				// Break goTo() if unagile is active
				if (this.settings.unagile) {
					return false
				}

				let realNextSlide = n

				if (transition) {
					if (this.settings.infinite && n < 0) {
						realNextSlide = this.slidesCount - 1
					} else if (n >= this.slidesCount) {
						realNextSlide = 0
					}

					this.$emit('beforeChange', { currentSlide: this.currentSlide, nextSlide: realNextSlide })
				}

				let transform = (!this.settings.fade) ? n * this.widthSlide * this.settings.slidesToScroll : 0

				if (transition) {
					this.currentSlide = realNextSlide

					if (n !== realNextSlide) {
						setTimeout(() => {
							this.goTo(realNextSlide, false)
						}, this.settings.speed)
					}
				}

				this.transitionDelay = (transition) ? this.speed : 0
				this.transform = transform
			}
		}
	}
</script>

<style lang="sass">
	.agile
		position: relative

		&, *
			&:focus,
			&:active
				outline: none

		&__list
			display: block
			overflow: hidden
			position: relative
			width: 100%

		&__slides
			align-items: center
			display: flex
			justify-content: flex-start

			.agile--disabled &
				display: block

		&__slide
			display: block

			.agile--fade &
				opacity: 0
				position: relative
				z-index: 0

				&--active
					opacity: 1
					z-index: 2

				&--expiring
					opacity: 1
					transition-duration: 0s
					z-index: 1

		&__nav-button
			&[disabled]
				cursor: default

		&__dots
			align-items: center
			display: flex
			list-style: none
			padding: 0
			white-space: nowrap

		&__dot
			button
				cursor: pointer
				display: block
				font-size: 0
				line-height: 0

</style>
