import React, {PropTypes} from 'react'
import { Form, Input, Checkbox, Button, Radio, Select } from 'antd'
import { valid_required } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const ChannelModal = ({item, parkAreas, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
	item = item || {}
	parkAreas = parkAreas || []

	const ParkAreaOptions = parkAreas.map((item, key) => (
		<Select.Option key={key} value={item.id}>{item.area_name}</Select.Option>
	))

	return (
		<Form style={{marginTop: 12}}>
			<FormItem label='上级停车场：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(
					<Select disabled>
						<Select.Option value='root'>根节点</Select.Option>
						{ParkAreaOptions}
					</Select>
				)}
			</FormItem>
			<FormItem label='通道名称：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(<Input />)}
			</FormItem>
			<FormItem label='所属终端：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(
					<Select>

					</Select>
				)}
			</FormItem>
			<FormItem label='管理摄像机：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(
					<Select>

					</Select>
				)}
			</FormItem>
			<FormItem label='通道类型：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('pid', {
					initialValue: item.pid
				})(
					<RadioGroup>
						<RadioButton value="in">入口</RadioButton>
						<RadioButton value="out">出口</RadioButton>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem label='状态：' {...formItemLayout(6, 6)}>
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

ChannelModal.propTypes = {
	
}

export default Form.create()(ChannelModal)
