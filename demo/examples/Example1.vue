<template lang="pug">
	section.section.section--demo-1
		div.container
			div.row
				div.col-xs-12
					h2.section__title #[strong #1] demo
					p.section__description vue-agile with default settings and minimal styles

			div.row
				div.col-xs-12
					agile(:options="options")
						div.slide(v-for="n in 6", :key="n", :class="`slide--${n}`")
							h3 slide {{ n }}

</template>


<script>
	export default {
		name: 'Example1',

		data () {
			return {
				options: {
					fade: true,
					responsive: [
						{
							breakpoint: 900,
							settings: {
								fade: false
							}
							// settings: {
							// 	slidesToShow: 3
							// }
						}
					]
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	.slide
		align-items: center
		color: #fff
		display: flex
		height: 300px
		justify-content: center

		h3
			font-size: 32px
			font-weight: 300

	// Slides backgrounds
	$colors: #f1c40f #e67e22 #e74c3c #9b59b6 #3498db #2ecc71

	@for $i from 1 through length($colors)
		$color: nth($colors, $i)

		.slide--#{$i}
			background-color: $color

</style>
