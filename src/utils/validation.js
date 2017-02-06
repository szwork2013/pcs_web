
/**
 * validation
 * 非空验证
 * @export
 * @param {any} errMsg
 * @returns
 */
export function valid_required (errMsg) {
	return {
		required: true,
		message: errMsg || '不能为空'
	}
}


/**
 * validation
 * 最大长度验证
 * @export
 * @param {any} max
 * @param {any} errMsg
 * @returns
 */
export function valid_max (max, errMsg) {
	return {
		max,
		message: errMsg || '最大长度为' + max
	}
}

/**
 * validation
 * 邮箱验证
 * @export
 * @param {any} max
 * @param {any} errMsg
 * @returns
 */
export function valid_email (errMsg) {
	return {
		type: 'email',
		message: errMsg || '邮箱格式错误'
	}
}

/**
 * validation
 * 手机号验证
 * @export
 * @param {any} cb
 * @returns
 */
export function valid_phone (cb) {
	return {
		validator (rule, value, callback) {
			if (!value || value === '') {
				callback()
			} else if (checkPhone(value)) {
				callback()
				cb && cb('success')
			} else {
				callback('手机号格式错误')
				cb && cb('error')
			}
		}
	}
}

const checkPhone = (phone) => {
	if (!(/^1[34578]\d{9}$/.test(phone))) { 
		return false
	} else {
		return true
	}
}