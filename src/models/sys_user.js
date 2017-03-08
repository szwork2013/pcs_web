import { comState, comReducer } from '../utils/base_model'
import * as sysUser from '../services/sys_user'
import * as message from '../utils/message_box'

export default {
	namespace: 'sysuser',
	state: {
		...comState,
		roleUserModalVisible: false,
		loginNameValid: '',
		phoneValid: ''
	},
	subscriptions: {
		setup ({dispatch, history}) {
			history.listen(location => {
				if (location.pathname === '/sysuser') {
					dispatch({type: 'getList', payload: {pageIndex: 1, pageSize: 10}})
				}
			})
		}
	},
	effects: {
		*getList ({payload}, {call, put}) {
			yield put({type: 'showLoading', payload})
			const data = yield call(sysUser.getSysUsers, payload)
			if (data) {
				yield put({type: 'success', payload: {dataSource: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {dataSource: [], total: 0}})
			}
		},
		*getOne ({payload}, {call, put}) {
			yield put({ type: 'showModal', payload: {currentItem: null, currentKey: payload.id, modalType: 'edit'}})
			const data = yield call(sysUser.getOne, {id: payload.id})
			if (data) {
				yield put({type: 'success', payload: {currentItem: data}})
			} else {
				yield put({type: 'fail', payload: {currentItem: null}})
			}
		},
		*create ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(sysUser.addSysUser, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(sysUser.uptSysUser, payload.data)
      if (data) {
        yield put({type: 'getList'})
      } else {
				yield put({type: 'fail'})
			}
		},
		*del ({payload}, {call, put}) {
			const data = yield call(sysUser.delSysUser, payload)
      if (data) {
        yield put({type: 'getList', payload})
      } else {
				yield put({type: 'fail'})
			}
		},
		*resetPwd ({payload}, {call, put}) {
			const data = yield call(sysUser.resetPwdService, payload)
      if (data) {
        yield put({type: 'success'})
				message.successBox("密码重置成功")
      } else {
				yield put({type: 'fail'})
			}
		},
		// *openModal ({payload}, {call, put}) {
		// 		yield put({type: 'common/getRoleList'})
		// 		yield put({type: 'showModal', payload})
		// },
		*checkLoginName ({payload}, {call, put}) {
			yield put({type: 'common', payload: {loginNameValid: 'validating'}})
			const data = yield call(sysUser.checkLoginNameService, payload)
			if (data === 'success') {
				yield	put({type: 'success', payload: {loginNameValid: 'success'}})
				payload.callback()
			} else {
				payload.callback('登录名不能重复')
				yield put({type: 'fail', payload: {loginNameValid: 'error'}})
			}
		},
		*checkPhone ({payload}, {call, put}) {
			yield put({type: 'common', payload: {phoneValid: 'validating'}})
			const data = yield call(sysUser.checkPhoneService, payload)
			if (data === 'success') {
				yield	put({type: 'success', payload: {phoneValid: 'success'}})
				payload.callback()
			} else {
				payload.callback('手机号不能重复')
				yield put({type: 'fail', payload: {phoneValid: 'error'}})
			}
		}
	},
	reducers: {
		...comReducer,
		showRoleUserSetting (state, action) {
			return {...state, ...action.payload, roleUserModalVisible: true}
		},
		hideRoleUserSetting (state, action) {
			return {...state, ...action.payload, roleUserModalVisible: false}
		}
	}
}