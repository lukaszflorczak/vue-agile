/**
 * Debounced methods
 */

import { debounce } from '@/helpers/lodash'

const mixin = {
  created () {
    this.goTo = debounce(this.goTo, this.throttleDelay)
    this.getWidth = debounce(this.getWidth, 500)
  }
}

export default mixin
