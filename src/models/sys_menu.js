import { comState, comReducer } from '../utils/base_model'
import * as service from '../services/sys_menu'
import { message } from '../utils'

export default {
	namespace: 'sysmenu',
	state: {
		...comState
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/sysmenu') {
					dispatch({type: 'getList', payload: location.query})
				}
			})
		}
	},
	effects: {
		*getList ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(service.getListService, payload)
			if (data) {
				yield put({type: 'success', payload: {dataSource: data}})
			} else {
				yield put({type: 'fail', payload: {dataSource: []}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal'})
      yield put({ type: 'showLoading' })
			const data = yield call(service.addService, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(service.uptService, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		}
	},
	reducers: {
		...comReducer
	}
}