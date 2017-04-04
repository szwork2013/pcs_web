import React, {PropTypes} from 'react'
import { Form, Input, Checkbox, Button, InputNumber, Card, Select } from 'antd'
import { valid_required } from '../../utils/validation'
import { formItemLayout } from '../../utils'

const FormItem = Form.Item
const ParkAreaModal = ({parkarea, parkAreas, onReset, isAreaReset, onSave, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
	const reset = () => {
    resetFields()
    onReset()
  }
  if (isAreaReset) {
    reset()
  }

	const { modalType } = parkarea
	const item = modalType !== 'edit' ? {} : parkarea.currentItem
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
		<Card title={modalType === 'create' ? '新增停车场' : '编辑停车场'}>
			<Form style={{marginTop: 12}}>
				<FormItem label='上级停车场：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('pid', {
						initialValue: item.pid,
						rules: [valid_required('上级停车场不能为空')]
					})(
						<Select disabled={modalType !== 'create'}>				
							<Select.Option value='root'>根级停车场</Select.Option>
							{parkAreas.map((item, key) => (<Select.Option key={key} value={item.id}>{item.area_name}</Select.Option>))}
						</Select>
					)}
				</FormItem>
				<FormItem label='停车场名称：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('area_name', {
						initialValue: item.area_name,
						rules: [valid_required('停车场名称不能为空')]
					})(<Input />)}
				</FormItem>
				<FormItem label='总车位：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('total_lot_num', {
						initialValue: item.total_lot_num,
						rules: [valid_required('总车位不能为空')]
					})(<InputNumber style={{width: '100%'}}/>)}
				</FormItem>
				<FormItem label='剩余车位：' {...formItemLayout(6, 6)}>
					{getFieldDecorator('free_lot_num', {
						initialValue: item.free_lot_num,
						rules: [valid_required('剩余车位不能为空')]
					})(<InputNumber style={{width: '100%'}}/>)}
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

ParkAreaModal.propTypes = {
	
}

export default Form.create()(ParkAreaModal)