import React from 'react'
import { Modal, Form, Input, Select, Checkbox } from 'antd'
import { valid_required, valid_ip } from '../../utils/validation.js'

const FormItem = Form.Item

const ParkCameraModal = ({visible, onCancel, onOk, item,
	form: {
		resetFields,
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
		title: '终端管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
		},
		wrapClassName: 'vertical-center-modal'
	}

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='IP：' {...formItemLayout}>
					{getFieldDecorator('ip', {
            initialValue: item.ip,
            rules: [valid_required('IP不能为空'), valid_ip()]
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

export default Form.create()(ParkCameraModal)