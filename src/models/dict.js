import * as service from '../services/dict'
import { comModel } from '../utils/base_model'

const state = {
  dictIndexTree: []
}
const effects = {
  	*getTree ({payload}, {call, put}) {
			const data = yield call(service.getIndexTreeService)
			if (data) {
				yield put({type: 'success', payload: {dictIndexTree: data}})
			} else {
				yield put({type: 'fail', payload: {dictIndexTree: []}})
			}
	},
}
const setup = (dispatch, history) => {
  history.listen(location => {
		if (location.pathname === '/dict') {
			dispatch({type: 'getTree'})
		}
	})
}
export default comModel('dict', state, effects, setup)