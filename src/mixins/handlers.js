/**
 * Handlers methods for mouse/touch events
 */
const mixin = {
	methods: {
		handleMouseDown (e) {
			this.isMouseDown = true

			if (e.type.indexOf('touch') !== -1) {
				this.dragStartX = e.touches[0].clientX
				this.dragStartY = e.touches[0].clientY
			}

			if (e.type.indexOf('mouse') !== -1) {
				this.dragStartX = e.clientX
				this.dragStartY = e.clientY
			}
		},

		handleMouseMove (e) {
			let positionX
			let positionY

			if (e.type.indexOf('touch') !== -1) {
				positionX = e.touches[0].clientX
				positionY = e.touches[0].clientY
			}

			if (e.type.indexOf('mouse') !== -1) {
				positionX = e.clientX
				positionY = e.clientY
			}

			let dragDistanceX = Math.abs(positionX - this.dragStartX)
			// let dragDistanceY = Math.abs(positionY - this.dragStartY)

			if (dragDistanceX > 10) {
				this.isDragging = true
			}

			this.dragDistance = positionX - this.dragStartX

			if (this.isDragging) {
				e.preventDefault()
			}
		},

		handleMouseUp () {
			this.isMouseDown = false
			this.isDragging = false
		},

		handleMouseOver (e) {
			if (this.settings.autoplay) {
				if ((e === 'dot' && this.settings.pauseOnDotsHover) || (e === 'track' && this.settings.pauseOnHover)) {
					this.isAutoplayPaused = true
				}
			}
		},

		handleMouseOut (e) {
			if (this.settings.autoplay) {
				if ((e === 'dot' && this.settings.pauseOnDotsHover) || (e === 'track' && this.settings.pauseOnHover)) {
					this.isAutoplayPaused = false
				}
			}
		}
	}
}

export default mixin
