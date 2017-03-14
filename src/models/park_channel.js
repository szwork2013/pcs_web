import * as service from '../services/park_channel'
import { comModel } from '../utils/base_model'
import { successBox } from '../utils/message_box'

const state = {
  modalType: 'init'
}
const effects = {
  *getOne ({payload}, {call, put}) {
    yield put({type: 'success', payload: {currentItem: {}}})
    const data = yield call(service.getOneService, {id: payload.id})
    if (data) {
      yield put({type: 'success', payload: {...payload, currentItem: data}})
    } else {
      yield put({type: 'fail', payload: {...payload, currentItem: {}}})
    }
  },
  *add ({payload}, {call, put}) {
    const data = yield call(service.addService, payload.data)
    if (data) {
      successBox("保存成功", 3)
      yield put({type: 'parkarea/getTree'})
      yield put({type: 'parkarea/common', payload: {selectTree: {}, selectedKeys: [], modalType: 'init'}})
    }
  },
  *edit ({payload}, {call, put}) {
    const data = yield call(service.uptService, payload.data)
    if (data) {
      successBox("保存成功", 3)
      yield put({type: 'parkarea/getTree'})
      yield put({type: 'parkarea/common', payload: {selectTree: {}, selectedKeys: []}})
    }
  },
  *remove ({payload}, {call, put}) {
    const data = yield call(service.delService, payload)
    if (data) {
      successBox("删除成功", 3)
      yield put({type: 'parkarea/getTree'})
      yield put({type: 'parkarea/common', payload: {selectTree: {}, selectedKeys: []}})
    }
  }
}
const setup = (dispatch, history) => {}
export default comModel('parkchannel', state, effects, setup)