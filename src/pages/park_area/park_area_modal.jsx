import React, {PropTypes} from 'react'
import { Form, Input, Checkbox, Button, InputNumber } from 'antd'
import { valid_required } from '../../utils/validation.js'

const FormItem = Form.Item
const ParkAreaModal = ({item, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
	item = item || {}
	const formItemLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 6
		}
	}
	return (
		<Form horizontal style={{marginTop: 12}}>
			<FormItem label='上级停车场：' {...formItemLayout}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(<Input />)}
			</FormItem>
			<FormItem label='停车场名称：' {...formItemLayout}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(<Input />)}
			</FormItem>
			<FormItem label='总车位：' {...formItemLayout}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(<InputNumber style={{width: '100%'}}/>)}
			</FormItem>
			<FormItem label='剩余车位：' {...formItemLayout}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(<InputNumber style={{width: '100%'}}/>)}
			</FormItem>
			<FormItem label='状态：' {...formItemLayout}>
				{getFieldDecorator('status', {
					valuePropName: 'checked',
					initialValue: item.status !== 'nn'
				})(<Checkbox />)}
			</FormItem>
			<FormItem wrapperCol={{offset: 6, span: 6}}>
				<Button type='primary'>保存</Button>
			</FormItem>
		</Form>
	)
}

ParkAreaModal.propTypes = {
	
}

export default Form.create()(ParkAreaModal)