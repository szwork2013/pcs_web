import { get, post, remove, put } from '../utils/request'

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

/**
 * sysuser
 * 删除用户
 * @export
 * @param {any} params
 * @returns
 */
export async function delSysUser(params) {
	return remove(url, params)
}

/**
 * sysuser
 * 获取单个用户
 * @export
 * @param {any} params
 * @returns
 */
export async function getOne(params) {
	return get(`${url}/one`, params)
}

/**
 * sysuser
 * 编辑用户
 * @export
 * @param {any} params
 * @returns
 */
export async function uptSysUser(params) {
	return put(url, params)
}

export async function resetPwdService(params) {
	return post(`${url}/resetPwd`, params)
}

export async function changePwdService(params) {
	return post(`${url}/changePwd`, params)
}