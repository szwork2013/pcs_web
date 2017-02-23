import { get } from '../utils/request'

export async function getRoleService(params) {
	return get("common/getRole", params)
}

export async function getDictItemService(params) {
	return get("common/getDictItem", params)
}