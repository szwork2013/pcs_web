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
 * 账户状态码转换
 * @export
 * @param {any} origin
 * @returns
 */
export function formatSysUserStatus (origin) {
	if (origin === 'aa')	return '启用'
	else if (origin === 'nn')	return '停用'
	else return origin
}