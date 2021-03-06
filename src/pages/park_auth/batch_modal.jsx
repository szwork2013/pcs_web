import React from 'react'
import { Row, Col, Modal, Form, Input, Alert, DatePicker } from 'antd'
import { valid_required } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'
import moment from 'moment'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const ParkAuthModal = ({visible, onCancel, onOk, item,
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
        ...getFieldsValue()
      }
      onOk(data)
    })
  }
	const modalProps = {
		title: '批量授权管理',
		visible,
		width: 650,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
		}
	}

	const colProps = {xs: 24,	sm: 12,	md: 12,	lg: 12}
	const disabledDate = (current) => {
		return current && current.valueOf() < moment().startOf('day')
	}
	return (
		<Modal {...modalProps}>
			<Alert showIcon message="批量模式只针对临时卡授权" type="warning" />
			<Form>
				<Row>
					<Col {...colProps}>
						<FormItem label='卡内编码：' {...formItemLayout(6,18)}>
							{getFieldDecorator('card_inside_num', {
								initialValue: item.card_inside_num,
								rules: [valid_required('卡内编码不能为空')]
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='卡号：' {...formItemLayout(6,18)}>
							{getFieldDecorator('card_num', {
								initialValue: item.card_num,
								rules: [valid_required('卡号不能为空')]
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='卡类效期' {...formItemLayout(6,18)}>
							{getFieldDecorator('rangeDate', {
								initialValue: (item.start_time && item.end_time) ? [moment(item.start_time), moment(item.end_time)]: [moment(), moment().add(1, 'years')],
								rules: [valid_required('卡类效期不能为空')]
							})(<RangePicker style={{width: '100%'}} format='YYYY-MM-DD' disabledDate={disabledDate}/>)}
						</FormItem>
					</Col>
				</Row>			
			</Form>
		</Modal>
	)
}

export default Form.create()(ParkAuthModal)