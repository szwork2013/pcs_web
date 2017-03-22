import React from 'react'
import { Row, Col, Modal, Form, Input, DatePicker, InputNumber } from 'antd'
import { valid_required } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const AuthChargeModal = ({visible, onCancel, onOk, item,
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

	const colProps = {
		xs: 24,
		sm: 12,
		md: 12,
		lg: 12
	}
	return (
		<Modal {...modalProps}>
			<Form>
				<Row>
					<Col {...colProps}>
						<FormItem label='开始时间：' {...formItemLayout(8,16)}>
							{getFieldDecorator('card_inside_num', {
								initialValue: item.card_inside_num,
							})(<DatePicker  disabled style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='结束时间：' {...formItemLayout(8,16)}>
							{getFieldDecorator('card_num', {
								initialValue: item.card_num,
								rules: [valid_required('结束时间')]
							})(<DatePicker style={{width: '100%'}} />)}
						</FormItem>
					</Col>
					{
						item.auth_type === '001' ? 
						<Col {...colProps}>
							<FormItem label='续费至：' {...formItemLayout(8,16)}>
								{getFieldDecorator('card_num', {
									initialValue: item.card_num,
									rules: [valid_required('结束时间')]
								})(<DatePicker style={{width: '100%'}} format='YYYY-MM-DD'/>)}
							</FormItem>
						</Col> :
						<Col {...colProps}>
							<FormItem label='续费：' {...formItemLayout(8,16)}>
								{getFieldDecorator('amt', {
									initialValue: item.amt,
									rules: [valid_required('结束时间')]
								})(<InputNumber formatter={value => `￥ ${value}`} min={0} max={10000} step={1.00} style={{width: '100%'}} />)}
							</FormItem>
						</Col>
					}
				</Row>			
			</Form>
		</Modal>
	)
}

export default Form.create()(AuthChargeModal)