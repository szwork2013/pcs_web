import { get, post, remove, put } from '../utils/request'

const url = 'parkgatelog'

export async function getPagingService(params) {
	return get(`${url}/page`, params)
}