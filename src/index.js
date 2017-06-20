import Agile from './Agile'

const install = (Vue) => {
    Vue.component('agile', Agile)
}

export default {
    install
}

export {Agile}
