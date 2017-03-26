import * as service from '../services/charge_rule'
import { comModel } from '../utils/base_model'
import { successBox, errorBox } from '../utils/message_box'

const state = {
	selectKeys: [],
	selectTree: null
}

const effects = {
	*get ({payload}, {call, put}) {
		yield put({type: 'showLoading'})
		const data = yield call(service.getService, payload)
		if (data) {
			yield put({type: 'success', payload: {dataSource: data}})
		} else {
			yield put({type: 'fail', payload: {dataSource: []}})
		}
	},
	*getOne ({payload}, {call, put}) {
		const data = yield call(service.getService, payload)
		if (data) {
			yield put({type: 'showModal', payload: {dataSource: data}})
		} else {
			yield put({type: 'fail', payload: {dataSource: []}})
		}
	},
	*remove ({payload}, {call, put}) {
		const data = yield call(service.delService, {id: payload.id})
		if (data) {
			successBox('删除成功', 3)
			yield put({type: 'get', payload: {area_id: payload.selectTree}})
		} else {
			errorBox('删除失败', 3)
			yield put({type: 'fail'})
		}
	}
}

const setup = (dispatch, history) => {
  history.listen(location => {
		if (location.pathname === '/chargerule') {
			dispatch({type: 'common/getParkAreaTree'})
		}
	})
}

export default comModel('chargerule', state, effects, setup)