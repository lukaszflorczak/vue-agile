/**
 * Handlers methods for mouse/touch events
 */
const mixin = {
	methods: {
		handleMouseDown (e) {
			if (!e.touches) {
				e.preventDefault()
			}
			this.mouseDown = true
			this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
			this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
		},

		handleMouseMove (e) {
			let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
			let positionY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY

            if(this.dragDirection === 1 && positionX < this.dragPositionX) {
                this.dragDirection = 0
                this.dragStartX = positionX
                this.dragStartY = positionY
                this.currentSwipeDistance = this.settings.swipeDistance;
            } else if(this.dragDirection === 0 && positionX > this.dragPositionX) {
                this.dragDirection = 1
                this.dragStartX = positionX
                this.dragStartY = positionY
                this.currentSwipeDistance = this.settings.swipeDistance;
            }

            this.dragPositionX = positionX
            this.dragPositionY = positionY

			let dragDistanceX = Math.abs(positionX - this.dragStartX)
			let dragDistanceY = Math.abs(positionY - this.dragStartY)
			if (dragDistanceX > 3 * dragDistanceY) {
				this.disableScroll()
				this.dragDistance = positionX - this.dragStartX
			}
		},

		handleMouseUp () {
            this.currentSwipeDistance = this.settings.swipeDistance;
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
		}
	}
}

export default mixin
