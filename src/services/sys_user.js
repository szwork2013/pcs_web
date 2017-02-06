import { get, post } from '../utils/request'

const url = 'sysuser'


/**
 * sysuser
 * 获取系统用户
 * @export
 * @param {any} params
 * @returns
 */
export async function getSysUsers(params) {
	return get(url, params)
}


/**
 * sysuser
 * 用户登录
 * @export
 * @param {any} params
 * @returns
 */
export async function login(params) {
	return post(`${url}/login`, params)
}


/**
 * sysuser
 * 新增用户
 * @export
 * @param {any} params
 * @returns
 */
export async function addSysUser(params) {
	return post(url, params)
}