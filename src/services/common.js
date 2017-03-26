import { get } from '../utils/request'

export async function getRoleService(params) {
	return get("common/getRole", params)
}

export async function getDictItemService(params) {
	return get("common/getDictItem", params)
}

export async function getParkAreaService(params) {
	return get("common/getParkArea", params)
}

export async function getParkTerminalService(params) {
	return get("common/getParkTerminal", params)
}

export async function getParkChannelService(params) {
	return get("common/getParkChannel", params)
}

export async function getParkCameraService(params) {
	return get("common/getParkCamera", params)
}

export async function getParkAreaTreeService(params) {
	return get(`parkarea/areaTree`, params)
}