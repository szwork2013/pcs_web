import * as service from '../services/park_gate_log'
import { comModel } from '../utils/base_model'

const state = {
  capture_img: ''
}
const effects = {
	*get ({payload}, {call, put}) {
    yield put({type: 'showLoading'})
		const data = yield call(service.getPagingService, {pageIndex: payload.pageIndex, pageSize: payload.pageSize, ...payload.search})
		if (data) {
			yield put({type: 'success', payload: {dataSource: data.data, total: data.total}})
		} else {
			yield put({type: 'fail', payload: {dataSource: [], total: 0}})
		}
	}
}
const setup = (dispatch, history) => {
  history.listen(location => {
		if (location.pathname === '/parkgatelog') {
			dispatch({type: 'get', payload: {pageIndex: 1, pageSize: 10}})
		}
	})
}
export default comModel('parkgatelog', state, effects, setup)