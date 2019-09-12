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

            // identify the drag direction while dragging
            let newDragDirection = this.dragDirection
            if (this.dragDirection === 'right' && positionX < this.dragPositionX) {
                newDragDirection = 'left'
            } else if (this.dragDirection === 'left' && positionX > this.dragPositionX) {
                newDragDirection = 'right'
            }

            // when changing the drag direction while dragging
            // reset the drag start X and Y
            if (this.dragDirection !== newDragDirection) {
                this.dragDirection = newDragDirection

                this.dragStartX = positionX
                this.dragStartY = positionY
                this.dragSwipeDistance = this.settings.swipeDistance
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
            this.dragSwipeDistance = this.settings.swipeDistance
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
