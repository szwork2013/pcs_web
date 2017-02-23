import * as cookie from '../utils/cookie'
import { login, changePwdService, logoutService } from '../services/sys_user'
import { hashHistory } from 'dva/router'
import { successBox, errorBox } from '../utils/message_box'

export default {
	namespace: 'app',
	state: {
		login: localStorage.getItem('pcs_login'),
		loading: false,
		user: JSON.parse(localStorage.getItem('pcs_user')),
		loginBtnLoading: false,
		menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
		userMenus: JSON.parse(localStorage.getItem('pcs_menus')),
		changePwdVisible: false
	},
	subscriptions: {
		setup ({dispatch}) {
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
	},
	effects: {
		*login ({payload}, {call, put}) {
			yield put({type: 'showLoginBtnLoading'})
			const data = yield call(login, payload)
			if (data) {
				cookie.save('user', data, { path: '/' })
				localStorage.setItem('pcs_menus', JSON.stringify(data.menus))
				localStorage.setItem('pcs_user', JSON.stringify(data))
				localStorage.setItem('pcs_login', true)
				localStorage.setItem('pcs_token', data.token)
				hashHistory.push({pathname: '/'})
				yield put({type: 'loginSuccess', payload: {user: data, userMenus: data.menus}})
			} else {
				yield put({type: 'loginFail'})
			}
		},
		*changeTheme ({payload}, {put}) {
			yield put({type: 'handleChangeTheme'})
		},
		*changeNavbar ({payload}, {put}) {
			if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
		},
		*switchMenuPopver ({payload}, {put}) {
      yield put({type: 'handleSwitchMenuPopver'})
    },
		*logout ({payload}, {call, put}) {
			// cookie.remove('user', { path: '/' })
			yield call(logoutService)	
			localStorage.removeItem('pcs_login')
			localStorage.removeItem('pcs_menus')
			localStorage.removeItem('pcs_user')
			localStorage.removeItem('pcs_token')			
			hashHistory.push({pathname: '/login'})		
			yield put({type: 'logoutSuccess'})
		},
		*switchSider ({payload}, {put}) {
			yield put({type: 'handleSwitchSider'})
		},
		*changePwd ({payload}, {call, put}) {
			const data = yield call(changePwdService, payload.data)
			if (data) {
				successBox('密码修改成功')
				yield put({type: 'common', payload: {changePwdVisible: false}})
			}
		}
	},
	reducers: {
		loginSuccess (state, action) {
      return {...state, ...action.payload, login: true, loginBtnLoading: false}
    },
		loginFail (state) {
      return {...state, login: false, loginBtnLoading: false}
    },
		logoutSuccess (state) {
      return {...state, login: false}
    },
		handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {...state, darkTheme: !state.darkTheme}
    },
    showNavbar (state) {
      return {...state, isNavbar: true}
    },
    hideNavbar (state) {
      return {...state, isNavbar: false}
    },
		handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {...state, siderFold: !state.siderFold}
    },
		handleSwitchMenuPopver (state) {
      return {...state, menuPopoverVisible: !state.menuPopoverVisible}
    },
		common (state, action) {
      return {...state, ...action.payload}
    }
	}
}