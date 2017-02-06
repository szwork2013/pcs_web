import React from 'react'
import { Router, Route } from 'dva/router'
import App from './components/layout/app'
import * as cookie from './utils/cookie'

//解决model重复注册问题
const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
		try {
    app.model(model);
    cached[model.namespace] = 1;
  	} catch(e) {}
  }
}

export default ({ history, app }) => {
	const requireAuth = (nextState, replace) => {
		if (!cookie.load('user') && nextState.location.pathname !== '/login') {
			replace({
				pathname: '/login'
			})
		}
	}

	const routes = [
		{
			path: '/',
			onEnter: requireAuth,
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./pages/main')})
        })
      },
			childRoutes: [
				{
          path: 'main',
          name: 'main',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./pages/main'))
            })
          }
        },
				{
          path: 'sysuser',
          name: 'sysuser',
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/sys_user'))
							// app.model(require('./models/sys_user'));
              cb(null, require('./pages/sys_user'))
            })
          }
        },
				{
					path: '*',
					name: 'error',
					getComponent (nextState, cb) {
						require.ensure([], require => {
							cb(null, require('./com_page/page_404'))
						})
					}
				}
			]
		}
	]

	return <Router history={history} routes={routes} />
}

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Route path="/" component={IndexPage} />
//     </Router>
//   );
// }

// export default RouterConfig;
