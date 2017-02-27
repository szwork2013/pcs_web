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
		if (!localStorage.getItem('pcs_login')) {
      replace({
				pathname: '/login'
			})
		}
	}

  // const genRouter = (path, modelPath, componentPath) => {
  //   return {
  //     path,
  //     name: path,
  //     onEnter: requireAuth,
  //     getComponent (nextState, cb) {
  //       require.ensure([], require => {
  //         registerModel(app, require(modelPath))
  //         cb(null, require(componentPath))
  //       })
  //     }
  //   }
  // }

	const routes = [
    {
      path: 'login',
      name: 'login',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./com_page/login'))
        })
      }
    },
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
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./pages/main'))
            })
          }
        },
        {
          path: 'profile',
          name: 'profile',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./com_page/profile'))
            })
          }
        },
				{
          path: 'sysuser',
          name: 'sysuser',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/sys_user'))
							// app.model(require('./models/sys_user'));
              cb(null, require('./pages/sys_user'))
            })
          }
        },
				{
          path: 'sysrole',
          name: 'sysrole',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/sys_role'))
              cb(null, require('./pages/sys_role'))
            })
          }
        },
        {
          path: 'syslog',
          name: 'syslog',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/sys_log'))
              cb(null, require('./pages/sys_log'))
            })
          }
        },
        {
          path: 'parkcamera',
          name: 'parkcamera',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/park_camera'))
              cb(null, require('./pages/park_camera'))
            })
          }
        },
        {
          path: 'parkterminal',
          name: 'parkterminal',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/park_terminal'))
              cb(null, require('./pages/park_terminal'))
            })
          }
        },
        {
          path: 'parkarea',
          name: 'parkarea',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/park_area'))
              cb(null, require('./pages/park_area'))
            })
          }
        },
        {
          path: 'parkauth',
          name: 'parkauth',
          onEnter: requireAuth,
          getComponent (nextState, cb) {
            require.ensure([], require => {
							registerModel(app, require('./models/park_auth'))
              cb(null, require('./pages/park_auth'))
            })
          }
        },
        // genRouter('parkarea', './models/park_area', './pages/park_area'),
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
