import { get, post, remove, put } from '../utils/request'

const url = 'chargerule'

export async function getService(params) {
	return get(url, params)
}

export async function delService(params) {
	return remove(url, params)
}
