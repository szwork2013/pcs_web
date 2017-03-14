import React, {PropTypes} from 'react'
import { Form, Input, Checkbox, Button, Radio, Select, Card } from 'antd'
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
	const item = modalType !== 'edit' ? {} : parkchannel.currentItem

	const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
				status: getFieldsValue()['status'] ? 'aa' : 'nn',
				id: item.id
      }
      onSave(data)
    })
  }

	return (
		<Card title={modalType === 'create' ? '新增通道' : '编辑通道'}>
			<Form style={{marginTop: 12}}>
				<FormItem label='上级停车场：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('area_id', {
						initialValue: item.area_id,
						rules: [valid_required('上级停车场不能为空')]
					})(
						<Select disabled={modalType !== 'create'}>				
							{parkAreas.map((item, key) => (<Select.Option key={key} value={item.id}>{item.area_name}</Select.Option>))}
						</Select>
					)}
				</FormItem>
				<FormItem label='通道名称：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('name', {
						initialValue: item.name,
						rules: [valid_required('通道名称不能为空')]
					})(<Input />)}
				</FormItem>
				<FormItem label='所属终端：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('terminal_id', {
						initialValue: item.terminal_id,
						rules: [valid_required('所属终端不能为空')]
					})(
						<Select>
							{parkTerminals.map((item, key) => (<Select.Option key={key} value={item.id}>{item.ip}</Select.Option>))}
						</Select>
					)}
				</FormItem>
				<FormItem label='管理摄像机：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('cameras', {
						initialValue: item.cameras || [],
						rules: [valid_required('管理摄像机不能为空')]
					})(
						<Select multiple>
							{parkCameras.map((item, key) => (<Select.Option key={key} value={item.id}>{item.ip}</Select.Option>))}
						</Select>
					)}
				</FormItem>
				<FormItem label='通道类型：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('type', {
						initialValue: item.type || 'in',
						rules: [valid_required('通道类型不能为空')]
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
		</Card>
	)
}

ChannelModal.propTypes = {
	
}

export default Form.create()(ChannelModal)
