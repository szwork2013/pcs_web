import { comReducer } from '../utils/base_model'
import * as service from '../services/common'

export default {
	namespace: 'common',
	state: {
		roleList: [],
		producers: [],
		authTypes: [],
		parkAreas: []
	},
	subscriptions: {
		setup ({dispatch, history}) {
		}
	},
	effects: {
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
		}
	},
	reducers: {
		...comReducer
	}
}