import React from 'react'
import { Row, Col, Modal, Form, Input, Alert } from 'antd'
import { valid_required } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const ParkAuthModal = ({authTypes, visible, onCancel, onOk, item, producers,
	form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }}) => {
	item = item || {}
	authTypes = authTypes || []
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
	const AuthTypeOptions = authTypes.map((item, key) => (
		<Select.Option key={key} value={item.itemCode}>{item.itemName}</Select.Option>)
	)
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

	// const ProducerOptions = producers.map(item => (<Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>))
	const colProps = {
		xs: 24,
		sm: 12,
		md: 12,
		lg: 12
	}
	return (
		<Modal {...modalProps}>
			<Alert showIcon message="批量模式只针对临时卡授权" type="warning" />
			<Form horizontal>
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
				</Row>			
			</Form>
		</Modal>
	)
}

export default Form.create()(ParkAuthModal)