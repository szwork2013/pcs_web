import moment from 'moment'

/**
 * format
 * 性别编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatSex (origin) {
	if (origin === '1') return '男'
	else if (origin === '2') return '女'
	else return '未知'
}

/**
 * format
 * 账户类别编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatUserType (origin) {
	if (origin === 'web') return 'web用户'
	else if (origin === 'terminal') return '终端用户'
	else return '其他'
}


/**
 * format
 * 通用状态码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatStatus (origin) {
	if (origin === 'aa')	return '启用'
	else if (origin === 'nn')	return '停用'
	else return origin
}

/**
 * format
 * 时间转化
 * @export
 * @param {any} origin
 * @param {string} [format='YYYY-MM-DD HH:mm:ss']
 * @param {any} originFormat 原始时间格式
 * @returns
 */
export function formatDate (origin, format = 'YYYY-MM-DD HH:mm:ss', originFormat) {
	if (!origin || origin.indexOf('0001-01-01') !== -1) return ''
	let temp
	if (originFormat) temp = moment(origin, originFormat)
	else temp = moment(origin)
	if (temp.isValid()) return temp.format(format)
	else return ''
}

/**
 * format
 * 日志类别编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatLogType (origin) {
	if (origin === 'web') return 'web日志'
	else if (origin === 'terminal') return '终端日志'
	else return origin
}

/**
 * format
 * 授权类别编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatAuthType (origin) {
	if (origin === '001') return '月租'
	else if (origin === '002') return '储值'
	else if (origin === '003') return '临时'
	else if (origin === '004') return '免费'
	else if (origin === '005') return '黑名单'
	else return origin
}


/**
 * format
 * 计费类别编码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatRuleType (origin) {
	if (origin === '001') return '按次计费'
	else if (origin === '002') return '按天计费'
	else if (origin === '003') return '按时长计费'
	else if (origin === '004') return '按时段计费'
	else return origin
}


/**
 * format
 * 转换成int
 * @export
 * @param {any} origin
 * @param {any} defaultVlu
 * @returns
 */
export function toInt(origin, defaultVlu = 0) {
	return isNaN(origin) ? defaultVlu : parseInt(origin)
}