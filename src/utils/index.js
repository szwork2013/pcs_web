import config from './config'
import classnames from 'classnames'
// import menu from './menu'

const myDispatch = (dispatch, type, payload) => {
  dispatch({type: type, payload})
}

module.exports = {
  config,
  classnames,
  myDispatch
}