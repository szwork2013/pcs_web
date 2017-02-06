// 公用state
const comState = {
	loading: false,
	dataSource: [],
	total: 0,
	pageIndex: 1,
	pageSize: 10,
	modalType: 'create',
	modalVisible: false,
	currentItem: null
}
// 公用reducer
const comReducer = {
	showLoading (state, action) {
		return {...state, ...action.payload, loading: true}
	},
	success (state, action) {
		return {...state, ...action.payload, loading: false}
	},
	fail (state, action) {
		return {...state, ...action.payload, loading: false}
	},
	showModal (state, action) {
		return {...state, ...action.payload, modalVisible: true}
	},
	hideModal (state, action) {
		return {...state, ...action.payload, modalVisible: false}
	},
	common (state, action) {
		return {...state, ...action.payload}
	}
}
export {comState, comReducer}

