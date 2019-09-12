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
			this.$emit('breakpoint', { breakpoint: this.currentBreakpoint })
		},

		// Watch drag distance change
		dragDistance () {
			if (this.mouseDown) {
				const { rtl } = this.settings
				const dragDistance = this.dragDistance * (rtl ? -1 : 1)

				if (dragDistance > this.currentSwipeDistance && this.canGoToPrev) {
					this.goToPrev()
                    this.currentSwipeDistance = this.currentSwipeDistance + this.settings.swipeDistance;
				}

				if (dragDistance < -1 * this.currentSwipeDistance && this.canGoToNext) {
					this.goToNext()
                    this.currentSwipeDistance = this.currentSwipeDistance + this.settings.swipeDistance;
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
