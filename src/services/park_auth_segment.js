import { get, post, remove, put } from '../utils/request'

const url = 'parkauthsegment'

export async function addService(params) {
	return post(url, params)
}

export async function delService(params) {
	return remove(url, params)
}

export async function uptService(params) {
	return put(url, params)
}