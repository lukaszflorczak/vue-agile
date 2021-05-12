<template lang="pug">
	section.section.section--demo-5
		div.container
			div.row
				div.col-xs-12
					h2.section__title #[strong #5] demo
					p.section__description Scroll multiple slides at once

			div.row
				div.col-xs-12
					agile(:slidesToShow="3" :slidesToScroll="3" :dots="false")
						div.slide(v-for="slide in 9" :key="slide")
							div.slide__content  {{ slide }}

						template(#prevButton)
							i.fas.fa-chevron-left

						template(#nextButton)
							i.fas.fa-chevron-right

</template>


<script>
	export default {
		name: 'Example5',
	}
</script>

<style lang="sass">
	.section--demo-5
		.main
			margin-bottom: 30px

		// Basic VueAgile styles
		.agile
			&__nav-button
				color: #ccc
				cursor: pointer
				font-size: 24px
				transition-duration: .3s
				position: absolute
				top: 50%
				transform: translateY(-50%)

				&:hover
					color: #888

				&--prev
					left: -45px

				&--next
					right: -45px

		// Slides styles
		.slide
			padding: 0 20px
			height: 150px

		.slide__content
			border: 1px solid black
			display: flex
			align-items: center
			justify-content: center
			height: 100%
			font-size: 1.5em


</style>
