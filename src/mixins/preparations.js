/**
 * Carousel preparation methods
 */
const mixin = {
	methods: {
		/**
		 * Prepare settings object
		 */
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

		/**
		 * Prepare slides classes and styles
		 */
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

		/**
		 *  Prepare slides active/current classes
		 */
		prepareSlidesClasses () {
			if (this.currentSlide === null) {
				return false
			}

			// Remove active & current classes
			for (let i = 0; i < this.slidesCount; i++) {
				this.slides[i].classList.remove('agile__slide--active')
				this.slides[i].classList.remove('agile__slide--current')
			}

			// Add active & current class for current slide
			setTimeout(() => this.slides[this.currentSlide].classList.add('agile__slide--active'), this.changeDelay)

			let start = (this.clonedSlides) ? this.slidesCount + this.currentSlide : this.currentSlide

			if (this.centerMode) {
				start -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0))
			}

			// To account for the combination of infinite = false and centerMode = true, ensure we don't overrun the bounds of the slide count.
			for (let i = Math.max(start, 0); i < Math.min(start + this.settings.slidesToShow, this.slidesCount); i++) {
				this.allSlides[i].classList.add('agile__slide--current')
			}
		},

		/**
		 * Prepare carousel styles
		 */
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
				if (this.currentSlide === null && this.slidesCount) {
					this.currentSlide = this.settings.initialSlide
				}

				this.goTo(this.currentSlide, false, false)
			}
		}
	}
}

export default mixin
