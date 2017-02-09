import React from 'react'
import { Modal, Form, Input, Radio, Select, Checkbox } from 'antd'
import { valid_required, valid_max, valid_phone, valid_email } from '../../utils/validation'

const FormItem = Form.Item

const SysRoleModal = ({visible, onCancel, onOk, item, 
	form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }}) => {
	item = item || {}
	const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
				status: getFieldsValue()['status'] ? 'aa' : 'nn'
      }
      onOk(data)
    })
  }

	const formItemLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 14
		}
	}

	const modalProps = {
		title: '角色管理',
		visible,
		onOk: handleOk,
		onCancel,
		wrapClassName: 'vertical-center-modal'
	}

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='角色名：' {...formItemLayout}>
					{getFieldDecorator('roleName', {
            initialValue: item.roleName,
            rules: [valid_required('角色名不能为空'), valid_max(25, "角色名最大长度为25")]
          })(<Input />)}
				</FormItem>
				<FormItem label='状态：' {...formItemLayout}>
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