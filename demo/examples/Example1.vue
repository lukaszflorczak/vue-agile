<template lang="pug">
	section.section.section--demo-1
		div.container
			div.row
				div.col-xs-12
					h2.section__title #[strong #1] demo
						code-pen(id="EJRNMM")
					p.section__description vue-agile with default settings and minimal styles

			div.row
				div.col-xs-12
					agile
						div.slide(v-for="n in 6", :key="n", :class="`slide--${n}`")
							h3 {{ n }}

						template(#prevButton)
							i.fas.fa-chevron-left

						template(#nextButton)
							i.fas.fa-chevron-right

</template>

<script>
	export default {
		name: 'Example1'
	}
</script>

<style lang="sass">
	.section--demo-1
		.agile
			&__actions
				margin-top: 20px

			&__nav-button
				background: transparent
				border: none
				color: #ccc
				cursor: pointer
				font-size: 24px
				transition-duration: .3s

				&:hover
					color: #888

			&__dot
				margin: 0 10px

				button
					background-color: #eee
					border: none
					border-radius: 50%
					cursor: pointer
					display: block
					height: 10px
					font-size: 0
					line-height: 0
					margin: 0
					padding: 0
					transition-duration: .3s
					width: 10px

				&--current,
				&:hover
					button
						background-color: #888

		// Slides styles
		.slide
			align-items: center
			color: #fff
			display: flex
			justify-content: center
			padding: 40px

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
