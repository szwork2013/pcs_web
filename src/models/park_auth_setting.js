import * as service from '../services/park_auth_setting'
import { getChannelAuthTreeService } from '../services/park_channel'
import { comModel } from '../utils/base_model'
import { successBox } from '../utils/message_box'
import _ from 'lodash'

const state = {
	areaAuthTree: [],
	selectTree: {},
	selectedKeys: [],
	segments: []
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
		yield put({type: 'showLoading'})
		yield put({ type: 'common', payload: {...payload, currentItem: {}, segments: []}})
		const data = yield call(service.getSettingAndSegmentService, payload.selectTree)
		if (data) {
			let currentItem = {}
			_.forEach(data.setting, value => {
				currentItem[value.key] = value.value
			})
			yield put({type: 'success', payload: {currentItem, segments: data.segment}})
		} else {
			yield put({type: 'fail', payload: {currentItem: {}, segments: []}})
		}
	},
	*addOrUpt ({payload}, {call, put}) {
		yield put({type: 'showLoading'})
		let settings = []
		_.mapKeys(payload.currentItem, (value, key) => {
			settings.push({key, value})
		})
		let segments = payload.segments
		const data = yield call(service.addOrUptService, {
			channel_id: payload.channel_id,
			auth_type: payload.auth_type,
			settings,
			segments
		})
		if (data) {
			successBox('保存成功', 3)
			yield put({type: 'success'})
		} else {
			yield put({type: 'fail'})
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