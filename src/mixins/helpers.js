/**
 * Helpers methods
 */
const mixin = {
	methods: {
		/**
		 * Compare elements for breakpoints sorting
		 */
		compare (a, b) {
			if (a.breakpoint < b.breakpoint) {
				return (this.initialSettings.mobileFirst) ? -1 : 1
			} else if (a.breakpoint > b.breakpoint) {
				return (this.initialSettings.mobileFirst) ? 1 : -1
			} else {
				return 0
			}
		},

		/**
		 * Set window & container width
		 */
		getWidth () {
			this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
			this.widthContainer = this.$refs.list.clientWidth
		},

		/**
		 * Convert HTML Collection to JS Array
		 */
		htmlCollectionToArray (collection) {
			return Array.prototype.slice.call(collection, 0)
		}
	}
}

export default mixin
