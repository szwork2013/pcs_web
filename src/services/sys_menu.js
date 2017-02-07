import { get, post, remove, put } from '../utils/request'

const url = 'sysmenu'

export async function getListService(params) {
	return get(url, params)
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

export async function getMenuTreeService(params) {
	return get(`${url}/tree`, params)
}