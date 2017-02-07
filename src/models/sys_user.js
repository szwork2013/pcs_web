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
		*getOne ({payload}, {call, put}) {
			yield put({ type: 'common', payload: {currentKey: payload.id}})
			const data = yield call(sysUser.getOne, {id: payload.id})
			if (data) {
				yield put({type: 'showModal', payload: {currentItem: data, modalType: 'edit'}})
			} else {
				yield put({type: 'fail', payload: {currentItem: null}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(sysUser.addSysUser, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(sysUser.uptSysUser, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*del ({payload}, {call, put}) {
			const data = yield call(sysUser.delSysUser, payload)
      if (data) {
        yield put({type: 'getList', payload})
      } else {
				yield put({type: 'fail'})
			}
		}
	},
	reducers: {
		...comReducer
	}
}