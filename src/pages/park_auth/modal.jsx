import React from 'react'
import { Row, Col, Modal, Form, Input, Select, Checkbox, Card } from 'antd'
import { valid_required, valid_phone, valid_IDCard, valid_max } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const ParkAuthModal = ({authTypes, visible, onCancel, onOk, item, producers, isTempAuth, onAuthChange, isBlackAuth,
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
		title: '授权管理',
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
			<Form horizontal>
				<Card title='卡类信息' style={{marginBottom: 12}} bodyStyle={{padding: 8}}>
					<Row>
						<Col {...colProps}>
							<FormItem label='卡内编码：' {...formItemLayout(6,18)}>
								{getFieldDecorator('card_inside_num', {
									initialValue: item.card_inside_num,
									rules: [valid_required('卡内编码不能为空'), valid_max(30)]
								})(<Input />)}
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem label='卡号：' {...formItemLayout(6,18)}>
								{getFieldDecorator('card_num', {
									initialValue: item.card_num,
									rules: [valid_required('卡号不能为空'), valid_max(30)]
								})(<Input />)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col {...colProps}>
							<FormItem label='车牌号：' {...formItemLayout(6,18)}>
								{getFieldDecorator('plate_num', {
									initialValue: item.plate_num,
									rules: [valid_required('车牌号不能为空'), valid_max(10)]
								})(<Input />)}
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem label='授权类别：' {...formItemLayout(6,18)}>
								{getFieldDecorator('auth_type', {
									initialValue: item.auth_type,
									onChange: onAuthChange,
									rules: [valid_required('授权类别不能为空')]
								})(<Select placeholder='请选择授权类别'>
										{AuthTypeOptions}
									</Select>)}
							</FormItem>
						</Col>
						{
							isBlackAuth ? '' : <Col {...colProps}>
								<FormItem label='计费规则：' {...formItemLayout(6,18)}>
									{getFieldDecorator('charge_id', {
										initialValue: item.charge_id
									})(<Select />)}
								</FormItem>
							</Col>
						}
						<Col {...colProps}>
							<FormItem label='备注：' {...formItemLayout(6,18)}>
								{getFieldDecorator('brief', {
									initialValue: item.brief,
									rules: [valid_max(50)]
								})(<Input/>)}
							</FormItem>
						</Col>
						<Col {...colProps}>
							<FormItem label='状态：' {...formItemLayout(6,18)}>
								{getFieldDecorator('status', {
									valuePropName: 'checked',
									initialValue: item.status !== 'nn'
								})(<Checkbox />)}
							</FormItem>
						</Col>
					</Row>				
				</Card>
				{
					isTempAuth || isBlackAuth ? '' : <Card title='用户信息' style={{marginBottom: 12}} bodyStyle={{padding: 8}}>
					<Col {...colProps}>
						<FormItem label='用户名：' {...formItemLayout(6,18)}>
							{getFieldDecorator('user_name', {
								initialValue: item.user_name,
								rules: [valid_required('用户名不能为空'), valid_max(10)]
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='手机号：' {...formItemLayout(6,18)}>
							{getFieldDecorator('phone', {
								initialValue: item.phone,
								rules: [valid_required('手机号不能为空'), valid_phone()]
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='身份证：' {...formItemLayout(6,18)}>
							{getFieldDecorator('id_card', {
								initialValue: item.id_card,
								rules: [valid_IDCard()]
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='地址：' {...formItemLayout(6,18)}>
							{getFieldDecorator('address', {
								initialValue: item.address,
								rules: [valid_required('地址不能为空'), valid_max(80)]
							})(<Input />)}
						</FormItem>
					</Col>
				</Card>
				}
			</Form>
		</Modal>
	)
}

export default Form.create()(ParkAuthModal)