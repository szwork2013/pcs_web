import React from 'react'
import { Row, Col, Modal, Form, Input, DatePicker, InputNumber } from 'antd'
import { valid_required } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'
import styles from './index.less'
import moment from 'moment'

const FormItem = Form.Item

const AuthChargeModal = ({visible, onCancel, onOk, item, auth_type,
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
				id: item.id,
				amt: getFieldsValue()['amt'] ? (parseFloat(getFieldsValue()['amt']) + parseFloat(getFieldsValue()['has_amt'])) + '' : '0',
				cur_valid_time: undefined,
				has_amt: undefined
      }
      onOk(data)
    })
  }

	const modalProps = {
		title: '续费/期管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
		},
		wrapClassName: 'vertical-center-modal'
	}

	const colProps = {xs: 24,	sm: 12,	md: 12,	lg: 12}
	const disabledDate = (current) => {
		return current && current.valueOf() < moment().startOf('day')
	}
	return (
		<Modal {...modalProps}>
			<Form>
				<Row>
					<Col {...colProps}>
						<FormItem label='开始时间' {...formItemLayout(8,16)}>
							{getFieldDecorator('start_time', {
								initialValue: moment(item.start_time),
							})(<DatePicker  disabled style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='结束时间' {...formItemLayout(8,16)}>
							{getFieldDecorator('end_time', {
								initialValue: moment(item.end_time),
								rules: [valid_required('结束时间不能为空')]
							})(<DatePicker style={{width: '100%'}} format='YYYY-MM-DD' disabledDate={disabledDate}/>)}
						</FormItem>
					</Col>
					{
						auth_type === '001' ? 
						<Col {...colProps}>
							<FormItem label='当前效期' {...formItemLayout(8,16)}>
								{getFieldDecorator('cur_valid_time', {
									initialValue: moment(item.valid_time)
								})(<DatePicker style={{width: '100%'}} disabled format='YYYY-MM-DD'/>)}
							</FormItem>
						</Col> : ''
					}
					{
						auth_type === '001' ? 
						<Col {...colProps}>
							<FormItem label='续费至' {...formItemLayout(8,16)}>
								{getFieldDecorator('valid_time', {
									initialValue: moment(item.valid_time).add(1, 'months'),
									rules: [valid_required('续费至不能为空')]
								})(<DatePicker style={{width: '100%'}} format='YYYY-MM-DD' disabledDate={disabledDate}/>)}
							</FormItem>
						</Col> : ''
					}
					{
						auth_type === '002' ? 
						<Col {...colProps}>
							<FormItem label='剩余金额' {...formItemLayout(8,16)}>
								{getFieldDecorator('has_amt', {
									initialValue: item.amt,
								})(<InputNumber formatter={value => `￥ ${value}`} disabled style={{width: '100%'}} />)}
							</FormItem>
						</Col> : ''
					}
					{
						auth_type === '002' ? 
						<Col {...colProps}>
							<FormItem label='续费金额' {...formItemLayout(8,16)}>
								{getFieldDecorator('amt', {
									rules: [valid_required('续费金额不能为空')]
								})(<InputNumber formatter={value => `￥ ${value}`} min={0} max={10000} step={1.00} style={{width: '100%'}} />)}
							</FormItem>
						</Col> : ''
					}
				</Row>			
			</Form>
		</Modal>
	)
}

export default Form.create()(AuthChargeModal)