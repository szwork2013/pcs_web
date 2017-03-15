import * as service from '../services/dict'
import { comModel } from '../utils/base_model'

const state = {
  dictIndexTree: [],
	selectedKeys: [],
	dictItems: [],
	itemNameValid: ''
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
	*getDictItem ({payload}, {call, put}) {
		yield put({ type: 'showLoading', payload})
		const data = yield call(service.getItemService, payload.search)
		if (data) {
			yield put({type: 'success', payload: {dictItems: data}})
		} else {
			yield put({type: 'fail', payload: {dictItems: []}})
		}
	},
	*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal'})
      yield put({ type: 'showLoading' })
			const data = yield call(service.addItemService, payload.data)
      if (data) {
        yield put({type: 'getDictItem', payload})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(service.uptItemService, payload.data)
      if (data) {
        yield put({type: 'getDictItem', payload})
      } else {
				yield put({type: 'fail'})
			}
		},
		*remove ({payload}, {call, put}) {
			const data = yield call(service.delItemService, payload)
      if (data) {
        yield put({type: 'getDictItem', payload})
      } else {
				yield put({type: 'fail'})
			}
		},
		*checkItemName ({payload}, {call, put}) {
			yield put({type: 'common', payload: {itemNameValid: 'validating'}})
			const data = yield call(service.checkItemNameService, payload)
			if (data === 'success') {
				yield	put({type: 'success', payload: {itemNameValid: 'success'}})
				payload.callback()
			} else {
				payload.callback('字典项不能重复')
				yield put({type: 'fail', payload: {itemNameValid: 'error'}})
			}
		}
}
const setup = (dispatch, history) => {
  history.listen(location => {
		if (location.pathname === '/dict') {
			dispatch({type: 'getTree'})
		}
	})
}
export default comModel('dict', state, effects, setup)