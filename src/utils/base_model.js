// 公用state
const comState = {
	loading: false,
	dataSource: [],
	total: 0,
	pageIndex: 1,
	pageSize: 10,
	modalType: 'create',
	modalVisible: false,
	currentItem: null,
	currentKey: null,
	search: null
}
// 公用reducer
const comReducer = {
	showLoading (state, action) {
		return {...state, ...action.payload, loading: true}
	},
	success (state, action) {
		return {...state, ...action.payload, loading: false}
	},
	fail (state, action) {
		return {...state, ...action.payload, loading: false}
	},
	showModal (state, action) {
		return {...state, ...action.payload, modalVisible: true}
	},
	hideModal (state, action) {
		return {...state, ...action.payload, modalVisible: false}
	},
	common (state, action) {
		return {...state, ...action.payload}
	}
}


/**
 * 基础model
 * 
 * @param {any} namespace 命名空间
 * @param {any} state
 * @param {any} effects 异步方法
 * @param {any} setup 启动方法
 * @param {any} reducers 更新state
 * @returns
 */
function comModel (namespace, state, effects, setup, reducers) {
	return {
		namespace: namespace,
		state: {
			...comState,
			...state
		},
		subscriptions: {
			setup ({dispatch, history}) {
				if (!setup) {
					history.listen(location => {
						if (location.pathname === '/' + namespace) {
							dispatch({type: 'getPaging', payload: {pageIndex: 1, pageSize: 10}})
						}
					})
				} else {
					setup(dispatch, history)
				}
			}
		},
		effects: {
			...effects
		},
		reducers: {
			...comReducer,
			...reducers
		}	
	}
}


/**
 * 带CRUD model
 * 
 * @param {any} namespace 命名空间
 * @param {any} state 
 * @param {any} service 接口
 * @param {any} effects 异步方法
 * @param {any} setup 启动方法
 * @param {any} reducers 更新state
 */
function comCRUDModel (namespace, state, service, effects, setup, reducers) {
	let crudEffects = {
		...effects,
		*getPaging ({payload}, {call, put}) {
			if (!service.getPagingService) return
			payload = payload || {pageIndex: 1, pageSize: 10}
			yield put({type: 'showLoading', payload})
			const data = yield call(service.getPagingService, {pageIndex: payload.pageIndex, pageSize: payload.pageSize, ...payload.search})
			if (data) {
				yield put({type: 'success', payload: {dataSource: data.data, total: data.total}})
			} else {
				yield put({type: 'fail', payload: {dataSource: [], total: 0}})
			}
		},
		*create ({payload}, {call, put}) {
			if (!service.addService) return
			yield put({ type: 'hideModal'})
      yield put({ type: 'showLoading' })
			const data = yield call(service.addService, payload.data)
      if (data) {
        yield put({type: 'getPaging', payload: {pageIndex: 1, pageSize: 10}})
      } else {
				yield put({type: 'fail'})
			}
		},
		*update ({payload}, {call, put}) {
			if (!service.uptService) return
			yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
			const data = yield call(service.uptService, payload.data)
      if (data) {
        yield put({type: 'getPaging', payload: {pageIndex: 1, pageSize: 10}})
      } else {
				yield put({type: 'fail'})
			}
		},
		*remove ({payload}, {call, put}) {
			if (!service.delService) return
			const data = yield call(service.delService, payload)
      if (data) {
        yield put({type: 'getPaging', payload: {pageIndex: 1, pageSize: 10}})
      } else {
				yield put({type: 'fail'})
			}
		}
	}
	return comModel(namespace, state, crudEffects, setup, reducers)
}

export {comState, comReducer, comModel, comCRUDModel}

