import fetch from 'dva/fetch'
import qs from 'qs'
import * as message from '../utils/message_box'

const parseJSON = response => {
  return response.json();
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const parseErrorMessage = data => {
	const { success, code } = data
	if (success !== 'T' && success !== 't') {
		throw new Error(code)
	}
	return data
}

/**
 * get
 * 获取
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function get (url, params, options) {
	return request(`${url}?${qs.stringify(params)}`, options)
}
/**
 * post
 * 新增
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function post (url, params, options) {
	options = options || {}
	options.method = 'post'
	options.headers = options.headers || {}
	options.headers['Accept'] = 'application/json'
	options.headers['Content-Type'] = 'application/json'
	options.body = JSON.stringify(params)
	return request(url, options)
}

/**
 * put
 * 更新
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function put (url, params, options) {
	options = options || {}
	options.method = 'put'
	options.headers = options.headers || {}
	options.headers['Accept'] = 'application/json'
	options.headers['Content-Type'] = 'application/json'
	options.body = JSON.stringify(params)
	return request(url, options)
}

/**
 * remove
 * 删除
 * @export
 * @param {any} url
 * @param {any} options
 * @returns
 */
export function remove (url, params, options) {
	options = options || {}
	options.method = 'delete'
	if (params) {
		return request(`${url}?${qs.stringify(params)}`, options)
	} else {
		return request(`${url}`, options)
	}
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  url = '/webapi/' + url
  if (process.env.NODE_ENV !== 'production') {
		url = 'http://localhost:8080' + url
	}
  options = options || {}
	options.headers = options.headers || {}
	options.headers['token'] = localStorage.getItem("pcs_token")

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(parseErrorMessage)
    		.then((data) => {
			if (process.env.NODE_ENV !== 'production') {
				console.log(data)
			}
			return data.r || true
		})
		.catch((err) => {
			if (process.env.NODE_ENV !== 'production') {
				console.log(err.message)
			}
			switch (err.message) {
			case '登录失效':
				hashHistory.push({pathname: '/login'})
				break
			case '2001':
				message.warnBox('用户名密码错误，请重新输入', 3)
				break
			default:
				message.errorBox('服务器繁忙', 3)
				break
			}
			return undefined
		})
}
