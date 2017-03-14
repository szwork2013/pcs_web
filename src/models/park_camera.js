import { comState, comReducer } from '../utils/base_model'
import * as service from '../services/park_camera'
import { message } from '../utils'

export default {
	namespace: 'parkcamera',
	state: {
		...comState,
		ipValid: ''
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/parkcamera') {
					dispatch({type: 'getList', payload: {pageIndex: 1, pageSize: 10}})
				}
			})
		}
	},
	effects: {
		*getList ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(service.getPagingService, {pageIndex: payload.pageIndex, pageSize: payload.pageSize, ...payload.search})
			if (data) {
				yield put({type: 'success', payload: {dataSource: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {dataSource: [], total: 0}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal'})
      yield put({ type: 'showLoading' })
			const data = yield call(service.addService, payload.data)
      if (data) {
        yield put({type: 'getList', payload: {pageIndex: 1, pageSize: 10}})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(service.uptService, payload.data)
      if (data) {
        yield put({type: 'getList', payload: {pageIndex: 1, pageSize: 10}})
      } else {
				yield put({type: 'fail'})
			}
		},
		*remove ({payload}, {call, put}) {
			const data = yield call(service.delService, payload)
      if (data) {
        yield put({type: 'getList', payload: {pageIndex: 1, pageSize: 10}})
      } else {
				yield put({type: 'fail'})
			}
		},
		*openModal ({payload}, {call, put}) {
				yield put({type: 'common/getProducerDict'})
				yield put({type: 'showModal', payload})
		},
		*checkCameraIp ({payload}, {call, put}) {
			yield put({type: 'common', payload: {ipValid: 'validating'}})
			const data = yield call(service.checkCameraIp, payload)
			if (data === 'success') {
				yield	put({type: 'success', payload: {ipValid: 'success'}})
				payload.callback()
			} else {
				payload.callback('IP不能重复')
				yield put({type: 'fail', payload: {ipValid: 'error'}})
			}
		}
	},
	reducers: {
		...comReducer
	}
}