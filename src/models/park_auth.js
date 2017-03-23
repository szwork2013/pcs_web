import * as service from '../services/park_auth'
import { comCRUDModel } from '../utils/base_model'

const state = {
	batchModalVisible: false,
	chargeModalVisible: false,
	isTempAuth: false,
	isBlackAuth: false,
	auth_type: ''
}

const effects = {

}

const setup = (dispatch, history) => {
	history.listen(location => {
		if (location.pathname === '/parkauth') {
			dispatch({type: 'getPaging'})
			dispatch({type: 'common/getAuthTypeDict'})
		}
	})
}

const reducers = {
	success (state, action) {
		return {...state, ...action.payload, loading: false, chargeModalVisible: false}
	},
	fail (state, action) {
		return {...state, ...action.payload, loading: false, chargeModalVisible: false}
	},
}

export default comCRUDModel('parkauth', state, service, effects, setup, reducers)