import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Spin } from 'antd'
import Header from './header'
import Footer from './footer'
import Content from './content'
import Sider from './sider'
import Bread from './bread'
import Login from '../../com_page/login'
import { classnames } from '../../utils'
import styles from './layout.less'


const App = ({children, location, dispatch, app}) => {
	const {login, loading, loginBtnLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible} = app
	const loginProps = {
		loading,
		loginBtnLoading,
		onOk (data) {
			dispatch({type: 'app/login', payload: data})
		}
	}

	const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    }
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    }
  }

	return (
		<div>
			{
				login ? <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
				: <div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><Login {...loginProps} /></Spin></div>
			}
		</div>
	)
}

App.propTypes = {
	children: PropTypes.element.isRequired,
	location: PropTypes.object,
	dispatch: PropTypes.func,
	loading: PropTypes.object,
	loginBtnLoading: PropTypes.bool,
	login: PropTypes.bool,
	user: PropTypes.object,
	siderFold: PropTypes.bool,
	darkTheme: PropTypes.bool
}

export default connect(({app}) => ({app}))(App)