<template lang="pug">
	section.section.section--demo-2
		div.container
			div.row
				div.col-xs-12
					h2.section__title #[strong #2] demo
						code-pen(id="ROJKQg")
					p.section__description vue-agile as a full size image carousel with custom styles for arrows and dots indicators

		div.container-fluid
			div.row
				div.col-xs-12
					agile(:initial-slide="3")
						img.slide(src='https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1524260855046-f743b3cdad07?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1426170042593-200f250dfdaf?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1529815481058-55e5b656f6d6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')

						template(slot="prevButton")
							i.fas.fa-chevron-left

						template(slot="nextButton")
							i.fas.fa-chevron-right


</template>

<script>
	export default {
		name: 'Example2'
	}
</script>

<style lang="sass">
	.section--demo-2
		.agile
			&__nav-button
				background: transparent
				border: none
				color: #fff
				cursor: pointer
				font-size: 24px
				height: 100%
				position: absolute
				top: 0
				transition-duration: .3s
				width: 80px

				&:hover
					background-color: rgba(#000, .5)
					opacity: 1

				&--prev
					left: 0

				&--next
					right: 0

			&__dots
				bottom: 10px
				left: 50%
				position: absolute
				transform: translateX(-50%)

			&__dot
				margin: 0 10px

				button
					background-color: transparent
					border: 1px solid #fff
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
						background-color: #fff

			// Slides styles
			.slide
				display: block
				height: 550px
				object-fit: cover
				width: 100%

</style>
