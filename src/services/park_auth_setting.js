import { get, post, remove, put } from '../utils/request'

const url = 'parkauthsetting'

export async function getSettingAndSegmentService(params) {
	return get(`${url}/settingandsegment`, params)
}

export async function addOrUptService(params) {
	return post(`${url}/addorupt`, params)
}