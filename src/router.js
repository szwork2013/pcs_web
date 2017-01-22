import React from 'react'
import { Router, Route } from 'dva/router'
import App from './components/layout/app'
export default ({ history, app }) => {
	// const requireAuth = (nextState, replace) => {
	// 	if (!window.localStorage.getItem(Token) && nextState.location.pathname !== '/login') {
	// 		replace({
	// 			pathname: '/login'
	// 		})
	// 	}
	// }

	const routes = [
		{
			path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./pages/main')})
        })
      },
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
