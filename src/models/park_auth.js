import * as service from '../services/park_auth'
import { comCRUDModel } from '../utils/base_model'

const state = {
	batchModalVisible: false,
	isTempAuth: false,
	isBlackAuth: false
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

export default comCRUDModel('parkauth', state, service, effects, setup)