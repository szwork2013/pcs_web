import React from 'react'
import { Modal, Form, Input, Select, Checkbox } from 'antd'
import { valid_required, checkIP } from '../../utils/validation.js'

const FormItem = Form.Item

const ParkCameraModal = ({dispatch, visible, ipValid, onCancel, onOk, item, producers,
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
		title: '摄像机管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
			dispatch({type: 'parkcamera/common', payload: {ipValid: ''}})
		},
		wrapClassName: 'vertical-center-modal'
	}

	const ProducerOptions = producers.map(item => (<Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>))

	const checkIPRule = (rule, value, callback) => {
		if (value) {
			if (!checkIP(value)) {
				callback('IP格式错误')
				dispatch({type: 'parkcamera/common', payload: {ipValid: 'error'}})
				return
			}
			const fieldsValue = getFieldsValue()
			dispatch({type: 'parkcamera/checkCameraIp', payload: {ip: fieldsValue['ip'], callback, id: item.id}})
		} else {
			callback('IP不能为空')
			dispatch({type: 'parkcamera/common', payload: {ipValid: 'error'}})
		}
	}

	return (
		<Modal {...modalProps}>
			<Form>
				<FormItem label='IP：' {...formItemLayout} hasFeedback validateStatus={ipValid}>
					{getFieldDecorator('ip', {
            initialValue: item.ip,
            validateTrigger: 'onBlur',
            rules: [{validator: checkIPRule}]
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