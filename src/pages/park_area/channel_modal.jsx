import React, {PropTypes} from 'react'
import { Form, Input, Checkbox, Button, Radio, Select } from 'antd'
import { valid_required } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const ChannelModal = ({parkchannel, parkAreas, parkTerminals, parkCameras, onSave, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
	const { modalType } = parkchannel
	const item = modalType === 'create' ? {} : parkchannel.currentItem

	const ParkAreaOptions = parkAreas.map((item, key) => (
		<Select.Option key={key} value={item.id}>{item.area_name}</Select.Option>
	))

	const ParkTerminalOptions = parkTerminals.map((item, key) => (
		<Select.Option key={key} value={item.id}>{item.ip}</Select.Option>
	))

	const ParkCameraOptions = parkCameras.map((item, key) => (
		<Select.Option key={key} value={item.id}>{item.ip}</Select.Option>
	))

	const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue()
      }
      onSave(data)
    })
  }

	return (
		<Form style={{marginTop: 12}}>
			<FormItem label='上级停车场：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('area_id', {
					initialValue: item.area_id
				})(
					<Select disabled>
						<Select.Option value='root'>根节点</Select.Option>
						{ParkAreaOptions}
					</Select>
				)}
			</FormItem>
			<FormItem label='通道名称：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('name', {
					initialValue: item.name
				})(<Input />)}
			</FormItem>
			<FormItem label='所属终端：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('terminal_id', {
					initialValue: item.terminal_id
				})(
					<Select>
						{ParkTerminalOptions}
					</Select>
				)}
			</FormItem>
			<FormItem label='管理摄像机：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('cameras', {
					initialValue: item.cameras
				})(
					<Select multiple>
						{ParkCameraOptions}
					</Select>
				)}
			</FormItem>
			<FormItem label='通道类型：' {...formItemLayout(6, 6)}>
				{getFieldDecorator('type', {
					initialValue: item.type || 'in'
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
				<Button type='primary' onClick={handleOk}>保存</Button>
			</FormItem>
		</Form>
	)
}

ChannelModal.propTypes = {
	
}

export default Form.create()(ChannelModal)
