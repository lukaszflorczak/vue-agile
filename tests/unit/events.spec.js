import { shallowMount } from '@vue/test-utils'
import Agile from '@/Agile.vue'

const slides = '<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>'
const options = {
	propsData: {
		throttleDelay: 0
	},
	slots: {
		default: slides
	}
}

describe('Events emitting:', () => {
	describe('@after-change', () => {
		test('should be called after a current slide changes', async () => {
			const wrapper = shallowMount(Agile, options)

			const nextButton = wrapper.find({ ref: 'nextButton' })
			await nextButton.trigger('click')

			expect(wrapper.emitted()['after-change']).toEqual([[{ currentSlide: 1 }]])
		})
	})

	describe('@before-change', () => {
		test('should be called before a current slide changes', () => {
			const wrapper = shallowMount(Agile, options)

			const nextButton = wrapper.find({ ref: 'nextButton' })
			nextButton.trigger('click')

			expect(wrapper.emitted()['before-change']).toEqual([[{ currentSlide: 0, nextSlide: 1 }]])
		})
	})
})
