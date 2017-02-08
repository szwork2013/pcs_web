import { get } from '../utils/request'

const url = 'syslog'

export async function getListService(params) {
	return get(url, params)
}