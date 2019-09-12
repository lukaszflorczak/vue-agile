/**
 * Component props
 */
const mixin = {
	props: {
		// Depreciated
		arrows: {
			type: Boolean,
			default: true
		},

		/**
		 * Set the carousel to be the navigation of other carousels
		 */
		asNavFor: {
			type: Array,
			default: function () {
				return []
			}
		},

		/**
		 * Enable autoplay
		 */
		autoplay: {
			type: Boolean,
			default: false
		},

		/**
		 * Autoplay interval in milliseconds
		 */
		autoplaySpeed: {
			type: Number,
			default: 3000
		},

		/**
		 * Enable centered view when slidesToShow > 1
		 */
		centerMode: {
			type: Boolean,
			default: false
		},

		/**
		 * Slides padding in center mode
		 */
		centerPadding: {
			type: String,
			default: '15%'
		},

		/**
		 * Enable dot indicators/pagination
		 */
		dots: {
			type: Boolean,
			default: true
		},

		/**
		 * Enable fade effect
		 */
		fade: {
			type: Boolean,
			default: false
		},

		/**
		 * Infinite loop sliding
		 */
		infinite: {
			type: Boolean,
			default: true
		},

		/**
		 * Index of slide to start on
		 */
		initialSlide: {
			type: Number,
			default: 0
		},

		/**
		 * Enable mobile first calculation for responsive settings
		 */
		mobileFirst: {
			type: Boolean,
			default: true
		},

		/**
		 * Enable prev/next navigation buttons
		 */
		navButtons: {
			type: Boolean,
			default: true
		},

		// Depreciated
		nextArrow: {
			type: String,
			default: null
		},

		/**
		 * All settings as one object
		 */
		options: {
			type: Object,
			default: () => null
		},

		/**
		 * Pause autoplay when a dot is hovered
		 */
		pauseOnDotsHover: {
			type: Boolean,
			default: false
		},

		/**
		 * Pause autoplay when a slide is hovered
		 */
		pauseOnHover: {
			type: Boolean,
			default: true
		},

		// Depreciated
		prevArrow: {
			type: String,
			default: null
		},

		/**
		 * Object containing breakpoints and settings objects
		 */
		responsive: {
			type: Array,
			default: () => null
		},

		/**
		 * Enable right-to-left mode
		 */
		rtl: {
			type: Boolean,
			default: false
		},

		/**
		 * Number of slides to scroll
		 */
		slidesToScroll: {
			type: Number,
			default: 1
		},

		/**
		 * Number of slides to show
		 */
		slidesToShow: {
			type: Number,
			default: 1
		},

		/**
		 * Slide animation speed in milliseconds
		 */
		speed: {
			type: Number,
			default: 300
		},

		/**
		 * Transition timing function
		 * Available: ease, linear, ease-in, ease-out, ease-in-out
		 */
		timing: {
			type: String,
			default: 'ease'
		},

		/**
		 * Disable Agile carousel
		 */
		unagile: {
			type: Boolean,
			default: false
		},

        /**
         * Swipe Distance to slide
         */
        swipeDistance: {
            type: Number,
            default: 100
        }
    },

	data () {
		return {
			// Initial settings based on props
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
				unagile: this.unagile,
                swipeDistance: this.swipeDistance,
            }
		}
	}
}

export default mixin
