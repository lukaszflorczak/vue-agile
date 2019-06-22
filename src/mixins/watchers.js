/**
 * Component watchers
 */
const mixin = {
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
			this.prepareCarousel()
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
	}
}

export default mixin
