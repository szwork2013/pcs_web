import * as service from '../services/common'
import { comModel } from '../utils/base_model'

const state = {
	roleList: [],
	producers: [],
	authTypes: [],
	parkAreas: [],
	parkTerminals: [],
	parkChannels: [],
	parkCameras: [],
	recognitionTypes: [],
	matchTypes: [],
	parkAreaTree: []
}

const effects = {
	*getParkAreaTree ({payload}, {call, put}) {
		const data = yield call(service.getParkAreaTreeService)
		if (data) {
			yield put({type: 'success', payload: {parkAreaTree: data}})
		} else {
			yield put({type: 'fail', payload: {parkAreaTree: []}})
		}
	},
	*getMatchTypeDict ({payload}, {call, put}) {
		const data = yield call(service.getDictItemService, {dictCode: '005'})
		if (data) {
			yield put({type: 'success', payload: {matchTypes: data}})
		} else {
			yield put({type: 'fail', payload: {matchTypes: []}})
		}
	},
	*getRecognitionTypeDict ({payload}, {call, put}) {
		const data = yield call(service.getDictItemService, {dictCode: '004'})
		if (data) {
			yield put({type: 'success', payload: {recognitionTypes: data}})
		} else {
			yield put({type: 'fail', payload: {recognitionTypes: []}})
		}
	},
	*getRoleList ({payload}, {call, put}) {
		const data = yield call(service.getRoleService)
		if (data) {
			yield put({type: 'success', payload: {roleList: data}})
		} else {
			yield put({type: 'fail', payload: {roleList: []}})
		}
	},
	*getProducerDict ({payload}, {call, put}) {
		const data = yield call(service.getDictItemService, {dictCode: '001'})
		if (data) {
			yield put({type: 'success', payload: {producers: data}})
		} else {
			yield put({type: 'fail', payload: {producers: []}})
		}
	},
	*getAuthTypeDict ({payload}, {call, put}) {
		const data = yield call(service.getDictItemService, {dictCode: '002'})
		if (data) {
			yield put({type: 'success', payload: {authTypes: data}})
		} else {
			yield put({type: 'fail', payload: {authTypes: []}})
		}
	},
	*getParkArea ({payload}, {call, put}) {
		const data = yield call(service.getParkAreaService)
		if (data) {
			yield put({type: 'success', payload: {parkAreas: data}})
		} else {
			yield put({type: 'fail', payload: {parkAreas: []}})
		}
	},
	*getParkTerminal ({payload}, {call, put}) {
		const data = yield call(service.getParkTerminalService)
		if (data) {
			yield put({type: 'success', payload: {parkTerminals: data}})
		} else {
			yield put({type: 'fail', payload: {parkTerminals: []}})
		}
	},
	*getParkChannel ({payload}, {call, put}) {
		const data = yield call(service.getParkChannelService)
		if (data) {
			yield put({type: 'success', payload: {parkChannels: data}})
		} else {
			yield put({type: 'fail', payload: {parkChannels: []}})
		}
	},
	*getParkCamera ({payload}, {call, put}) {
		const data = yield call(service.getParkCameraService)
		if (data) {
			yield put({type: 'success', payload: {parkCameras: data}})
		} else {
			yield put({type: 'fail', payload: {parkCameras: []}})
		}
	}
}

const setup = (dispatch, history) => {}

export default comModel('common', state, effects, setup)

// export default {
// 	namespace: 'common',
// 	state: {
// 		roleList: [],
// 		producers: [],
// 		authTypes: [],
// 		parkAreas: [],
// 		parkTerminals: [],
// 		parkChannels: []
// 	},
// 	subscriptions: {
// 		setup ({dispatch, history}) {
// 		}
// 	},
// 	effects: {
// 		*getRoleList ({payload}, {call, put}) {
// 			const data = yield call(service.getRoleService)
// 			if (data) {
// 				yield put({type: 'success', payload: {roleList: data}})
// 			} else {
// 				yield put({type: 'fail', payload: {roleList: []}})
// 			}
// 		},
// 		*getProducerDict ({payload}, {call, put}) {
// 			const data = yield call(service.getDictItemService, {dictCode: '001'})
// 			if (data) {
// 				yield put({type: 'success', payload: {producers: data}})
// 			} else {
// 				yield put({type: 'fail', payload: {producers: []}})
// 			}
// 		},
// 		*getAuthTypeDict ({payload}, {call, put}) {
// 			const data = yield call(service.getDictItemService, {dictCode: '002'})
// 			if (data) {
// 				yield put({type: 'success', payload: {authTypes: data}})
// 			} else {
// 				yield put({type: 'fail', payload: {authTypes: []}})
// 			}
// 		},
// 		*getParkArea ({payload}, {call, put}) {
// 			const data = yield call(service.getParkAreaService)
// 			if (data) {
// 				yield put({type: 'success', payload: {parkAreas: data}})
// 			} else {
// 				yield put({type: 'fail', payload: {parkAreas: []}})
// 			}
// 		}
// 	},
// 	reducers: {
// 		...comReducer
// 	}
// }