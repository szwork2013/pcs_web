import { comState, comReducer } from '../utils/base_model'
import * as service from '../services/sys_log'
import { message } from '../utils'

export default {
	namespace: 'syslog',
	state: {
		...comState,
		title: null
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/syslog') {
					dispatch({type: 'getList', payload: {pageIndex: 1, pageSize: 10}})
				}
			})
		}
	},
	effects: {
		*getList ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(service.getListService, payload)
			if (data) {
				yield put({type: 'success', payload: {dataSource: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {dataSource: [], total: 0}})
			}
		}
	},
	reducers: {
		...comReducer
	}
}