import { shallowMount } from '@vue/test-utils'
import Agile from '@/Agile.vue'

const slides = '<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>'
const slidesCount = 6

describe('Infinite mode:', () => {
	describe('Enabled:', () => {
		test('click prev button on first slide should move to the last one', async () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: true
				},
				slots: {
					default: slides
				}
			})

			const prevButton = wrapper.find({ ref: 'prevButton' })
			await prevButton.trigger('click')

			expect(wrapper.vm.canGoToPrev).toBe(true)
			expect(wrapper.vm.currentSlide).toBe(5)
		})

		test('click next button on last slide should move to the first one', async () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: true
				},
				slots: {
					default: slides
				}
			})

			const nextButton = wrapper.find({ ref: 'nextButton' })

			let clickCount = 0

			while (clickCount < slidesCount - 1) {
				await nextButton.trigger('click')
				clickCount++
			}

			expect(wrapper.vm.canGoToNext).toBe(true)

			await nextButton.trigger('click')

			expect(wrapper.vm.currentSlide).toBe(0)
		})
	})

	describe('Disabled:',  () => {
		test('click prev button on first slide shouldn\'t be available', async () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: false
				},
				slots: {
					default: slides
				}
			})

			const prevButton = wrapper.find({ ref: 'prevButton' })

			expect(wrapper.vm.canGoToPrev).toBe(false)

			await prevButton.trigger('click')

			expect(wrapper.vm.currentSlide).toBe(0)
		})

		test('click next button on last slide shouldn\'t be available', async () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: false
				},
				slots: {
					default: slides
				}
			})

			const nextButton = wrapper.find({ ref: 'nextButton' })

			let clickCount = 0

			while (clickCount < slidesCount) {
				await nextButton.trigger('click')
				clickCount++
			}

			expect(wrapper.vm.canGoToNext).toBe(false)

			await nextButton.trigger('click')

			expect(wrapper.vm.currentSlide).toBe(5)
		})
	})
})
