import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Agile from '@/Agile.vue'

const slides = '<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>'

describe('Infinite mode:', () => {
	describe('Enabled:', () => {
		it('click prev button on first slide should move to the last one', () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: true
				},
				slots: {
					default: slides
				}
			})

			const prevButton = wrapper.find({ ref: 'prevButton' })
			prevButton.trigger('click')

			expect(wrapper.vm.canGoToPrev).equal(true)
			expect(wrapper.vm.getCurrentSlide()).equal(5)
		})

		it('click next button on last slide should move to the first one', () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: true,
					initialSlide: 5
				},
				slots: {
					default: slides
				}
			})

			const nextButton = wrapper.find({ ref: 'nextButton' })
			nextButton.trigger('click')

			expect(wrapper.vm.canGoToNext).equal(true)
			expect(wrapper.vm.getCurrentSlide()).equal(0)
		})
	})

	describe('Disabled:', () => {
		it('click prev button on first slide shouldn\'t be available', () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: false
				},
				slots: {
					default: slides
				}
			})

			const prevButton = wrapper.find({ ref: 'prevButton' })
			prevButton.trigger('click')

			expect(wrapper.vm.canGoToPrev).equal(false)
			expect(wrapper.vm.getCurrentSlide()).equal(0)
		})

		it('click next button on last slide shouldn\'t be available', () => {
			const wrapper = shallowMount(Agile, {
				propsData: {
					infinite: false,
					initialSlide: 5
				},
				slots: {
					default: slides
				}
			})

			const nextButton = wrapper.find({ ref: 'nextButton' })
			nextButton.trigger('click')

			expect(wrapper.vm.canGoToNext).equal(false)
			expect(wrapper.vm.getCurrentSlide()).equal(5)
		})
	})
})
