export default {
	namespace: 'app',
	state: {
		login: true,
		loading: false,
		user: {
			name: 'ldd'
		},
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
			if (true) {
				yield put({type: 'loginSuccess', payload: {
					user: {name: 'ldd1'}
				}})
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