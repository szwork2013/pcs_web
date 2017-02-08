import { comState, comReducer } from '../utils/base_model'
import * as service from '../services/sys_role'
import { getMenuTreeService } from '../services/sys_menu'
import { message } from '../utils'
import _ from 'lodash'

export default {
	namespace: 'sysrole',
	state: {
		...comState,
		menuSettingVisible: false,
		menus: [],
		checkMenus: []
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/sysrole') {
					dispatch({type: 'getList' })
				}
			})
		}
	},
	effects: {
		*getList ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(service.getListService, payload)
			if (data) {
				yield put({type: 'success', payload: {dataSource: data}})
			} else {
				yield put({type: 'fail', payload: {dataSource: []}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal'})
      yield put({ type: 'showLoading' })
			const data = yield call(service.addService, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(service.uptService, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*getMenuTree ({payload}, {call, put}) {
			const data = yield call(getMenuTreeService, payload)
      if (data) {
				let checkMenus = []
				let childMenus = []
				let temp = _.uniq(_.map(_.filter(data, o => {
					childMenus = _.concat(childMenus, o.children)
					return o.checked
				}), 'key'))
				checkMenus = _.concat(checkMenus, temp)
				temp = _.uniq(_.map(_.filter(childMenus, o => {
					return o.checked
				}), 'key'))
				checkMenus = _.concat(checkMenus, temp)
        yield put({type: 'success', payload: {menus: data, checkMenus, currentKey: payload.roleId}})
      } else {
				yield put({type: 'fail', payload: {menus: [], checkMenus: []}})
			}
		},
		*saveMenus ({payload}, {call, put}) {
			yield put({ type: 'hideMenuSetting'})
			const data = yield call(service.saveRoleMenuService, payload)
			if (data) {
        yield put({type: 'success'})
      } else {
				yield put({type: 'fail'})
			}
		}
	},
	reducers: {
		...comReducer,
		showMenuSetting (state, action) {
			return {...state, ...action.payload, menuSettingVisible: true}
		},
		hideMenuSetting (state, action) {
			return {...state, ...action.payload, menuSettingVisible: false}
		}
	}
}