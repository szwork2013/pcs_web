import React from 'react'
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'

export default ({ history, app }) => {
	const requireAuth = (nextState, replace) => {
		if (!window.localStorage.getItem(Token) && nextState.location.pathname !== '/login') {
			replace({
				pathname: '/login'
			})
		}
	}

	const routes = [
		{
			path: '/login',
			getComponent (nextState, cb) {
				require.ensure([], require => {
					cb(null, require('./components/login'))
				})
			}
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
