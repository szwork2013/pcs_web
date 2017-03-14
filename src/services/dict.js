import { get, post, remove, put } from '../utils/request'

const url = 'dictitem'

export async function getIndexTreeService(params) {
	return get('dictindex/tree', params)
}

export async function getItemService(params) {
	return get(url, params)
}

export async function addItemService(params) {
	return post(url, params)
}

export async function delItemService(params) {
	return remove(url, params)
}

export async function uptItemService(params) {
	return put(url, params)
}
