import { comState, comReducer } from '../utils/base_model'
import * as sysUser from '../services/sys_user'
import { message } from '../utils'

export default {
	namespace: 'sysuser',
	state: {
		...comState
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/sysuser') {
					dispatch({type: 'getList', payload: location.query})
				}
			})
		}
	},
	effects: {
		*getList ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(sysUser.getSysUsers, payload)
			if (data) {
				yield put({type: 'success', payload: {dataSource: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {dataSource: [], total: 0}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(sysUser.addSysUser, payload.data)
      if (data) {
        yield put({type: 'getList', payload})
      }
		}
	},
	reducers: {
		...comReducer
	}
}