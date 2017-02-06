import { message } from 'antd'

/**
 * message
 * 成功消息
 * @export
 * @param {any} content
 * @param {number} [time=3]
 */
export function successBox (content, time = 3) {
	message.success(content, time)
}

/**
 * message
 * 错误消息
 * @export
 * @param {any} content
 * @param {number} [time=3]
 */
export function errorBox (content, time = 3) {
	message.error(content, time)
}

/**
 * message
 * 警告消息
 * @export
 * @param {any} content
 * @param {number} [time=3]
 */
export function warnBox (content, time = 3) {
	message.warn(content, time)
}

/**
 * message
 * 加载消息
 * @export
 * @param {any} content
 */
export function loadingBox (content) {
	return message.loading(content, 0)
}