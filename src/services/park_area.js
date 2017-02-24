import { get, post, remove, put } from '../utils/request'

const url = 'parkarea'

export async function getTreeService(params) {
	return get(`${url}/tree`, params)
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
