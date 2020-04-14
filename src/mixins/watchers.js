/**
 * Component watchers
 */
const mixin = {
	watch: {
		// Recalculate settings
		breakpointCurrent () {
			this.prepareSettings()
			this.$emit('breakpoint', { breakpoint: this.breakpointCurrent })
		},

		// Watch drag distance change
		dragDistance () {
			if (this.isMouseDown) {
				const { rtl } = this.settings
				const dragDistance = this.dragDistance * (rtl ? -1 : 1)

				if (dragDistance > this.swipeDistance && this.canGoToPrev) {
					this.goToPrev()
					this.handleMouseUp()
				}

				if (dragDistance < -1 * this.swipeDistance && this.canGoToNext) {
					this.goToNext()
					this.handleMouseUp()
				}
			}
		},

		isAutoplayPaused (nevValue) {
			if (nevValue) {
				// Store current slide remaining time and disable auto play mode
				this.remaining = this.settings.autoplaySpeed - (+new Date() - this.autoplayStartTimestamp)
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
		},

		'settings.fade' () {
			this.toggleFade()
		},

		'settings.autoplay' () {
			this.toggleAutoPlay()
		},

		// Watch current slide change
		slideCurrent () {
			this.prepareSlidesClasses()

			// Set start time of slide
			this.autoplayStartTimestampTimestamp = (this.settings.autoplay) ? +new Date() : null

			this.$emit('afterChange', { slideCurrent: this.slideCurrent })
		},

		// Watch window width change
		widthWindow (newValue, oldValue) {
			if (oldValue) {
				this.prepareCarousel()
				this.toggleFade()
			}
		}
	}
}

export default mixin
