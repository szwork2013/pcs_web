import * as service from '../services/park_area'
import { comCRUDModel } from '../utils/base_model'

const state = {
	areaTree: [],
	selectTree: {}
}

const effects = {
	*getTree ({payload}, {call, put}) {
			const data = yield call(service.getTreeService)
			if (data) {
				yield put({type: 'success', payload: {areaTree: data}})
			} else {
				yield put({type: 'fail', payload: {areaTree: []}})
			}
	}
}

const setup = (dispatch, history) => {
	history.listen(location => {
		if (location.pathname === '/parkarea') {
			dispatch({type: 'getTree'})
		}
	})
}

export default comCRUDModel('parkarea', state, service, effects, setup)