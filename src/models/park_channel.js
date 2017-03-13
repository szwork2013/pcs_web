import * as service from '../services/park_channel'
import { comCRUDModel } from '../utils/base_model'

const state = {}
const effects = {
  *getOne ({payload}, {call, put}) {
    const data = yield call(service.getOneService, {id: payload.id})
    if (data) {
      yield put({type: 'success', payload: {...payload, currentItem: data}})
    } else {
      yield put({type: 'fail', payload: {...payload, currentItem: {}}})
    }
  }
}
const setup = (dispatch, history) => {}
export default comCRUDModel('parkchannel', state, service, effects, setup)