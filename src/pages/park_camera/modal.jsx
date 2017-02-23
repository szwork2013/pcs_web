import React from 'react'
import { Modal, Form, Input, Select, Checkbox } from 'antd'
import { valid_required, valid_ip } from '../../utils/validation.js'

const FormItem = Form.Item

const ParkCameraModal = ({visible, onCancel, onOk, item, producers,
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
			resetFields()
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
		title: '摄像机管理',
		visible,
		onOk: handleOk,
		onCancel: () => {
			resetFields()
			onCancel()
		},
		wrapClassName: 'vertical-center-modal'
	}

	const ProducerOptions = producers.map(item => (<Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>))

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='IP：' {...formItemLayout}>
					{getFieldDecorator('ip', {
            initialValue: item.ip,
            rules: [valid_required('IP不能为空'), valid_ip()]
          })(<Input />)}
				</FormItem>
				<FormItem label='型号：' {...formItemLayout}>
					{getFieldDecorator('producer', {
            initialValue: item.producer,
						rules: [valid_required('型号不能为空')]
          })(<Select placeholder='请选择型号'>
							{ProducerOptions}
						</Select>)}
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