import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Agile from '@/Agile.vue'

const slides = '<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>'

describe('Events emitting:', () => {
	describe('@afterChange', () => {
		it('should be called after a current slide changes', async () => {
			const wrapper = shallowMount(Agile, {
				slots: {
					default: slides
				}
			})

			const nextButton = wrapper.find({ ref: 'nextButton' })
			await nextButton.trigger('click')

			expect(wrapper.emitted().afterChange).to.deep.equal([[{ currentSlide: 1 }]])
		})
	})

	describe('@beforeChange', () => {
		it('should be called before a current slide changes', () => {
			const wrapper = shallowMount(Agile, {
				slots: {
					default: slides
				}
			})

			const nextButton = wrapper.find({ ref: 'nextButton' })
			nextButton.trigger('click')

			expect(wrapper.emitted().beforeChange).to.deep.equal([[{ currentSlide: 0, nextSlide: 1 }]])
		})
	})
})
