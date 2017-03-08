import React from 'react'
import { Modal, Form, Input, Radio, Select, Checkbox } from 'antd'
import { valid_required, valid_max, checkSpecialChar } from '../../utils/validation'
import { formItemLayout } from '../../utils'

const FormItem = Form.Item

const SysRoleModal = ({dispatch, visible, onCancel, onOk, item, roleNameValid, currentKey,
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
		resetFields
  }}) => {
	item = item || {}
	const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
				status: getFieldsValue()['status'] ? 'aa' : 'nn',
				allowOpGate: getFieldsValue()['allowOpGate'] ? 'y' : 'n',
      }
      onOk(data)
    })
  }

	const modalProps = {
		title: '角色管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
			dispatch({type: 'sysrole/common', payload: {roleNameValid: ''}})
		},
		wrapClassName: 'vertical-center-modal'
	}

	const checkRoleName = (rule, value, callback) => {
		if (value) {
			if (value.length > 25) {
				callback('角色名最大长度为25')
				dispatch({type: 'sysrole/common', payload: {roleNameValid: 'error'}})
				return
			}
			if (checkSpecialChar(value)) {
				callback('角色名不能包含特殊字符')
				dispatch({type: 'sysrole/common', payload: {roleNameValid: 'error'}})
				return
			}
			const fieldsValue = getFieldsValue()
			dispatch({type: 'sysrole/checkRoleName', payload: {roleName: fieldsValue['roleName'], callback, id: currentKey}})
		} else {
			callback('角色名不能为空')
			dispatch({type: 'sysrole/common', payload: {roleNameValid: 'error'}})
		}
	}

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='角色名：' {...formItemLayout()} required hasFeedback validateStatus={roleNameValid}>
					{getFieldDecorator('roleName', {
            initialValue: item.roleName,
						validateTrigger: 'onBlur',
            rules: [{validator: checkRoleName}]
          })(<Input />)}
				</FormItem>
				<FormItem label='允许手工开关闸：' {...formItemLayout(6, 4)}>
					{getFieldDecorator('allowOpGate', {
						valuePropName: 'checked',
						initialValue: item.allowOpGate === 'y'
					})(<Checkbox />)}
				</FormItem>
				<FormItem label='状态：' {...formItemLayout(6, 4)}>
					{getFieldDecorator('status', {
						valuePropName: 'checked',
						initialValue: item.status !== 'nn'
					})(<Checkbox />)}
				</FormItem>
			</Form>
		</Modal>
	)
}

export default Form.create()(SysRoleModal)