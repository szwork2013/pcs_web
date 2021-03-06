import { get, post, remove, put } from '../utils/request'

const url = 'parkcamera'

export async function getPagingService(params) {
	return get(url, params)
}

export async function checkCameraIp(params) {
	return get(`${url}/checkCameraIp`, params)
}

export async function addService(params) {
	return post(url, params)
}

export async function delService(params) {
	return remove(url, params)
}

export async function uptService(params) {
	return put(url, params)
}
