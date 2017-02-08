import { comReducer } from '../utils/base_model'
import * as service from '../services/common'

export default {
	namespace: 'common',
	state: {
		roleList: []
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
		}
	},
	reducers: {
		...comReducer
	}
}