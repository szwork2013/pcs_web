import { get, post, remove, put } from '../utils/request'

const url = 'parkchannel'

export async function getOneService(params) {
	return get(`${url}/one`, params)
}

export async function getChannelAuthTreeService(params) {
	return get(`${url}/auth_tree`, params)
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
