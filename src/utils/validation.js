
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
		message: errMsg || '必填项不能为空'
	}
}


/**
 * validation
 * 验证空格
 * @export
 * @param {any} errMsg
 * @returns
 */
export function valid_whitespace (errMsg) {
	return {
		whitespace: true,
		message: errMsg || '不能输入空格'
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

export function valid_number (cb) {
	return {
		validator (rule, value, callback) {
			if (!value || value === '') {
				callback()
			} else if (/^(0|[1-9]\d*)$/.test(value)) {
				callback()
				cb && cb('success')
			} else {
				callback('此项必须为正整数')
				cb && cb('error')
			}
		}
	}
}

/**
 * validation
 * IP验证
 * @export
 * @param {any} cb
 * @returns
 */
export function valid_ip (cb) {
	return {
		validator (rule, value, callback) {
			if (!value || value === '') {
				callback()
			} else if (checkIP(value)) {
				callback()
				cb && cb('success')
			} else {
				callback('IP格式错误')
				cb && cb('error')
			}
		}
	}
}

/**
 * validation
 * 密码强度验证
 * @export
 * @param {any} cb
 * @returns
 */
export function valid_pwd (cb) {
	return {
		validator (rule, value, callback) {
			callback()
		}
	}
}

/**
 * validation
 * 密码确认验证
 * @export
 * @param {any} cb
 * @returns
 */
export function valid_confirm_pwd (password, cb) {
	return {
		validator (rule, value, callback) {
			if (!value || value === '') {
				callback()
			} else if (password === value) {
				callback()
				cb && cb('success')
			} else {
				callback('两次输入密码不一致')
				cb && cb('error')
			}
		}
	}
}

/**
 * validation
 * 身份证验证
 * @export
 * @param {any} cb
 * @returns
 */
export function valid_IDCard (cb) {
	return {
		validator (rule, value, callback) {
			if (!value || value === '') {
				callback()
			} else if (checkIDCard(value)) {
				callback()
				cb && cb('success')
			} else {
				callback('身份证格式错误')
				cb && cb('error')
			}
		}
	}
}

/**
 * validation
 * 车牌号验证
 * @export
 * @param {any} cb
 * @returns
 */
export function valid_PlateNum (cb) {
	return {
		validator (rule, value, callback) {
			if (!value || value === '') {
				callback()
			} else if (checkPlateNum(value)) {
				callback()
				cb && cb('success')
			} else {
				callback('车牌号格式错误')
				cb && cb('error')
			}
		}
	}
}

export function checkPlateNum (plateNum) {
	if (!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(plateNum))) { 
		return false
	} else {
		return true
	}
}

const checkIDCard = card => {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   return reg.test(card) 
}

export function checkPhone (phone) {
	if (!(/^1[34578]\d{9}$/.test(phone))) { 
		return false
	} else {
		return true
	}
}

export function checkIP (ip) {
    var ipRegExp= /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/;
    if(ipRegExp.exec(ip)){
        return true;
    }else{
        return false;
    }
}

//验证是否包含特殊字符（true为包含）
export function checkSpecialChar (s) {
	var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)  (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)  (\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)  (\<)(\>)(\?)(\)]+/)
	return (containSpecial.test(s))
}