import * as cookie from '../utils/cookie'
import { login } from '../services/sys_user'
import { hashHistory } from 'dva/router'

export default {
	namespace: 'app',
	state: {
		login: cookie.load('user'),
		loading: false,
		user: null,
		loginBtnLoading: false,
		menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769
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
				cookie.save('user', data)
				hashHistory.push({pathname: '/'})
				yield put({type: 'loginSuccess', payload: {user: data}})
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
			cookie.remove('user')
			yield put({type: 'logoutSuccess'})
		},
		*switchSider ({payload}, {put}) {
			yield put({type: 'handleSwitchSider'})
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
    }
	}
}