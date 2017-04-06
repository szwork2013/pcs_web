import * as service from '../services/park_area'
import { comModel } from '../utils/base_model'
import { successBox } from '../utils/message_box'

const state = {
	areaTree: [],
	selectTree: {},
	type: '',
	selectedKeys: [],
	modalType: 'init',
  isAreaReset: false,
  isChannelReset: false
}

const effects = {
	*getTree ({payload}, {call, put}) {
			const data = yield call(service.getAreaChannelTreeService)
			if (data) {
				yield put({type: 'success', payload: {areaTree: data}})
			} else {
				yield put({type: 'fail', payload: {areaTree: []}})
			}
	},
	*getOne ({payload}, {call, put}) {
    yield put({type: 'success', payload: {...payload, currentItem: {}}})
    const data = yield call(service.getOneService, {id: payload.id})
    if (data) {
      yield put({type: 'success', payload: {currentItem: data}})
    } else {
      yield put({type: 'fail', payload: {currentItem: {}}})
    }
  },
	*add ({payload}, {call, put}) {
    const data = yield call(service.addService, payload.data)
    if (data) {
      successBox("保存成功", 3)
      yield put({type: 'getTree'})
      yield put({type: 'common', payload: {modalType: 'init'}})
    }
  },
  *edit ({payload}, {call, put}) {
    const data = yield call(service.uptService, payload.data)
    if (data) {
      successBox("保存成功", 3)
      yield put({type: 'getTree'})
      yield put({type: 'common'})
    }
  },
	*remove ({payload}, {call, put}) {
    const data = yield call(service.delService, payload)
    if (data) {
      successBox("删除成功", 3)
      yield put({type: 'getTree'})
      yield put({type: 'common', payload: {selectTree: {}, selectedKeys: []}})
    }
  }
}

const setup = (dispatch, history) => {
	history.listen(location => {
		if (location.pathname === '/parkarea') {
			dispatch({type: 'getTree', payload: {modalType: 'init'}})
			dispatch({type: 'common/getParkTerminal'})
			dispatch({type: 'common/getParkCamera'})
		}
	})
}

export default comModel('parkarea', state, effects, setup)