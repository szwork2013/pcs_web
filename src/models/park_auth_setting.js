import * as service from '../services/park_auth_setting'
import { getChannelAuthTreeService } from '../services/park_channel'
import { comModel } from '../utils/base_model'
import { successBox } from '../utils/message_box'

const state = {
	areaAuthTree: [],
	selectTree: {},
	selectedKeys: []
}

const effects = {
	*getAreaAuthTree ({payload}, {call, put}) {
		const data = yield call(getChannelAuthTreeService)
		if (data) {
			yield put({type: 'success', payload: {areaAuthTree: data}})
		} else {
			yield put({type: 'fail', payload: {areaAuthTree: []}})
		}
	},
	*get ({payload}, {call, put}) {
		yield put({ type: 'common', payload})
		const data = yield call(service.getService, payload.search)
		if (data) {
			yield put({type: 'success', payload: {dataSource: data}})
		} else {
			yield put({type: 'fail', payload: {dataSource: []}})
		}
	}
}

const setup = (dispatch, history) => {
	history.listen(location => {
		if (location.pathname === '/parkauthsetting') {
			dispatch({type: 'getAreaAuthTree'})
		}
	})
}

export default comModel('parkauthsetting', state, effects, setup)