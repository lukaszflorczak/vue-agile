import { shallowMount } from '@vue/test-utils'
import Agile from '@/Agile.vue'

describe('Renders:', () => {
  test('should render nav buttons', () => {
    const wrapper = shallowMount(Agile, {
      slots: {
        prevButton: 'prev',
        nextButton: 'next'
      }
    })

    expect(wrapper.text()).toContain('prev')
    expect(wrapper.text()).toContain('next')
  })
})
