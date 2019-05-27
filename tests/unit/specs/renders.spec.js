import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Agile from '@/Agile.vue'

describe('Renders:', () => {
	it('should render nav buttons', () => {
		const wrapper = shallowMount(Agile, {
			slots: {
				prevButton: 'prev',
				nextButton: 'next'
			}
		})
		expect(wrapper.text()).to.include('prev')
		expect(wrapper.text()).to.include('next')
	})
})
