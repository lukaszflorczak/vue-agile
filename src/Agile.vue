<template>
	<div class="agile" :class="{'agile--auto-play': settings.autoplay, 'agile--disabled': settings.unagile, 'agile--fade': settings.fade && !settings.unagile, 'agile--rtl': settings.rtl}">
		<div ref="list" class="agile__list">
			<div ref="track" class="agile__track" :style="{transform: `translate(${translateX + marginX}px)`, transition: `transform ${settings.timing} ${transitionDelay}ms`}" @mouseover="handleMouseOver('track')" @mouseout="handleMouseOut('track')">
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

		<div class="agile__actions" v-if="!settings.unagile && (settings.navButtons || settings.dots)">
			<button v-if="settings.navButtons && !settings.unagile" class="agile__nav-button agile__nav-button--prev" :disabled="!canGoToPrev" @click="goToPrev(), restartAutoPlay()" type="button" ref="prevButton">
				<slot name="prevButton">←</slot>
			</button>

			<ul ref="dots" v-if="settings.dots && !settings.unagile" class="agile__dots">
				<li v-for="n in slidesCount" :key="n" class="agile__dot" :class="{'agile__dot--current': n - 1 === currentSlide}" @mouseover="handleMouseOver('dot')" @mouseout="handleMouseOut('dot')">
					<button @click="goTo(n - 1), restartAutoPlay()" type="button">{{n}}</button>
				</li>
			</ul>

			<button v-if="settings.navButtons && !settings.unagile" class="agile__nav-button agile__nav-button--next" :disabled="!canGoToNext" @click="goToNext(), restartAutoPlay()" type="button" ref="nextButton">
				<slot name="nextButton">→</slot>
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

			autoplay: {
				type: Boolean,
				default: false
			},

			autoplaySpeed: {
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

			rtl: {
				type: Boolean,
				default: false
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

			unagile: {
				type: Boolean,
				default: false
			}
		},

		data () {
			return {
				slides: [],
				slidesClonedBefore: [],
				slidesClonedAfter: [],
				autoplayInterval: null,
				autoplayTimeout: null,
				pauseAutoPlay: false,
				autoplayStart: null,
				autoplayRemaining: null,
				// autoplayStatus: false,
				// autoplayTimeout: null,
				currentSlide: null,
				mouseDown: false,
				dragStartX: 0,
				dragStartY: 0,
				dragDistance: 0,
				swipeDistance: 50,
				translateX: 0,
				transitionDelay: 0,
				widthWindow: 0,
				widthContainer: 0,
				widthSlide: 0,
				initialSettings: {
					asNavFor: this.asNavFor,
					autoplay: this.autoplay,
					autoplaySpeed: this.autoplaySpeed,
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
					rtl: this.rtl,
					slidesToScroll: this.slidesToScroll,
					slidesToShow: this.slidesToShow,
					speed: this.speed,
					timing: this.timing,
					unagile: this.unagile
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

			marginX: function () {
				let marginX = (this.clonedSlides) ? this.slidesCount * this.widthSlide : 0

				// Center mode margin
				if (this.settings.centerMode) {
					marginX -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0)) * this.widthSlide
				}

				return (this.settings.rtl) ? marginX : -1 * marginX
			}
		},

		watch: {
			// Watch window width change
			widthWindow (newValue, oldValue) {
				if (oldValue) {
					this.prepareCarousel()
					this.toggleFade()
				}
			},

			// Watch current slide change
			currentSlide () {
				this.prepareSlidesClasses()

				// Set start time of slide
				this.autoplayStart = (this.settings.autoplay) ? +new Date() : null

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

			'settings.autoplay' () {
				this.toggleAutoPlay()
			},

			pauseAutoPlay (nevValue) {
				if (nevValue) {
					// Store current slide remaining time and disable auto play mode
					this.remaining = this.settings.autoplaySpeed - (+new Date() - this.autoplayStart)
					this.disableAutoPlay()
					this.clearAutoPlayPause()
				} else {
					// Go to next after remaining time and rerun auto play mode
					this.autoplayTimeout = setTimeout(() => {
						this.clearAutoPlayPause()
						this.goToNext()
						this.toggleAutoPlay()
					}, this.remaining)
				}
			}
		},

		created () {
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
			this.reload()
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
				this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				this.widthContainer = this.$refs.list.clientWidth
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
				if (this.settings.autoplay) {
					if ((element === 'dot' && this.settings.pauseOnDotsHover) || (element === 'track' && this.settings.pauseOnHover)) {
						this.pauseAutoPlay = true
					}
				}
			},

			handleMouseOut (element) {
				if (this.settings.autoplay) {
					if ((element === 'dot' && this.settings.pauseOnDotsHover) || (element === 'track' && this.settings.pauseOnHover)) {
						this.pauseAutoPlay = false
					}
				}
			},

			// Reload carousel
			reload () {
				this.getWidth()
				this.prepareSettings()
				this.prepareSlides()
				this.prepareCarousel()
				this.toggleFade()
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

				let start = (this.clonedSlides) ? this.slidesCount + this.currentSlide : this.currentSlide

				if (this.centerMode) {
					start -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0))
				}

				for (let i = start; i < start + this.settings.slidesToShow; i++) {
					this.allSlides[i].classList.add('agile__slide--current')
				}
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
					this.translateX = 0
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
				let enabled = (!this.settings.unagile && this.settings.autoplay)

				if (!this.autoplayInterval && enabled) {
					this.autoplayInterval = setInterval(() => {
						if (!document.hidden) {
							if (!this.canGoToNext) {
								this.disableAutoPlay()
							} else {
								this.goToNext()
							}
						}
					}, this.settings.autoplaySpeed)
				} else {
					this.disableAutoPlay()
				}
			},

			restartAutoPlay () {
				this.disableAutoPlay()
				this.toggleAutoPlay()
			},

			disableAutoPlay () {
				clearInterval(this.autoplayInterval)
				this.autoplayInterval = null
			},

			clearAutoPlayPause () {
				clearTimeout(this.autoplayTimeout)
				this.autoplayRemaining = null
			},

			disableScroll () {
				document.ontouchmove = (e) => e.preventDefault()
			},

			enableScroll () {
				document.ontouchmove = () => true
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
			goTo (n, transition = true, asNav = false) {
				// Break goTo() if unagile is active
				if (this.settings.unagile) {
					return false
				}

				if (!asNav) {
					this.settings.asNavFor.forEach(carousel => {
						if (carousel) {
							carousel.goTo(n, transition, true)
						}
					})
				}

				let realNextSlide = n

				if (transition) {
					if (this.settings.infinite && n < 0) {
						realNextSlide = this.slidesCount - 1
					} else if (n >= this.slidesCount) {
						realNextSlide = 0
					}

					this.$emit('beforeChange', { currentSlide: this.currentSlide, nextSlide: realNextSlide })

					this.currentSlide = realNextSlide

					if (n !== realNextSlide) {
						setTimeout(() => {
							this.goTo(realNextSlide, false)
						}, this.settings.speed)
					}
				}

				let translateX = (!this.settings.fade) ? n * this.widthSlide * this.settings.slidesToScroll : 0
				this.transitionDelay = (transition) ? this.speed : 0
				this.translateX = (this.settings.rtl) ? translateX : -1 * translateX
			}
		}
	}
</script>

<style>
	.agile {
		position: relative;
	}

	.agile--rtl .agile__track,
	.agile--rtl .agile__slides,
	.agile--rtl .agile__dots {
		flex-direction: row-reverse;
	}

	.agile:focus, .agile:active, .agile *:focus, .agile *:active {
		outline: none;
	}

	.agile__list {
		display: block;
		overflow: hidden;
		position: relative;
		width: 100%;
	}

	.agile__track {
		display: flex;
	}

	.agile__actions {
		display: flex;
		justify-content: space-between;
	}

	.agile__slides {
		align-items: center;
		display: flex;
		justify-content: flex-start;
	}

	.agile--disabled .agile__slides {
		display: block;
	}

	.agile__slide {
		display: block;
	}

	.agile--fade .agile__slide {
		opacity: 0;
		position: relative;
		z-index: 0;
	}

	.agile--fade .agile__slide--active {
		opacity: 1;
		z-index: 2;
	}

	.agile--fade .agile__slide--expiring {
		opacity: 1;
		transition-duration: 0s;
		z-index: 1;
	}

	.agile__nav-button[disabled] {
		cursor: default;
	}

	.agile__dots {
		align-items: center;
		display: flex;
		list-style: none;
		padding: 0;
		white-space: nowrap;
	}

	.agile__dot button {
		cursor: pointer;
		display: block;
		font-size: 0;
		line-height: 0;
	}
</style>
