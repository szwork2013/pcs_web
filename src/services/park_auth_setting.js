import { get, post, remove, put } from '../utils/request'

const url = 'parkauthsetting'

export async function getService(params) {
	return get(url, params)
}

export async function addOrUptService(params) {
	return post(`${url}/addorupt`, params)
}