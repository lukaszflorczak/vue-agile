import VueAgile from './Agile'

const install = (Vue) => {
	Vue.component('agile', VueAgile)
}

export default {
	install
}

export { VueAgile }
