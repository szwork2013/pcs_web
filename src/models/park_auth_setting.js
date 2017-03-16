import * as service from '../services/park_auth_setting'
import { getAreaAuthTreeService } from '../services/park_area'
import { comModel } from '../utils/base_model'
import { successBox } from '../utils/message_box'

const state = {
	areaAuthTree: [],
	selectTree: {},
	selectedKeys: []
}

const effects = {
	*getAreaAuthTree ({payload}, {call, put}) {
			const data = yield call(getAreaAuthTreeService)
			if (data) {
				yield put({type: 'success', payload: {areaAuthTree: data}})
			} else {
				yield put({type: 'fail', payload: {areaAuthTree: []}})
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