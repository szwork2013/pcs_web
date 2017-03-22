import React from 'react'
import { Row, Col, Modal, Form, Input, Select, Checkbox, Card, DatePicker, InputNumber } from 'antd'
import moment from 'moment'
import { valid_required, valid_phone, valid_max, valid_PlateNum } from '../../utils/validation.js'
import { formItemLayout } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item
const { RangePicker } = DatePicker

const ParkAuthModal = ({authTypes, visible, onCancel, onOk, item, producers, isTempAuth, onAuthChange, isBlackAuth, auth_type,
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
			const fieldsValue = getFieldsValue()
			const rangeDateValue = fieldsValue['rangeDate']
      const data = {
        ...fieldsValue,
				start_time: rangeDateValue[0] ? rangeDateValue[0].startOf('day').format() : undefined,
				end_time: rangeDateValue[1] ? rangeDateValue[1].endOf('day').format() : undefined,
				status: getFieldsValue()['status'] ? 'aa' : 'nn',
				amt: fieldsValue['amt'] ? fieldsValue['amt'] + '' : '0'
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
	const colProps = {xs: 24, sm: 12, md: 12, lg: 12}
	const disabledDate = (current) => {
		return current && current.valueOf() < moment().startOf('day')
	}

	return (
		<Modal {...modalProps}>
			<Form>
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
							isTempAuth ? '' : <Col {...colProps}>
								<FormItem label='卡类效期' {...formItemLayout(6,18)}>
									{getFieldDecorator('rangeDate', {
										initialValue: (item.start_time && item.end_time) ? [moment(item.start_time), moment(item.end_time)]: null,
										rules: [valid_required('卡类效期不能为空')]
									})(<RangePicker style={{width: '100%'}} format='YYYY-MM-DD' disabledDate={disabledDate}/>)}
								</FormItem>
							</Col>
						}
						{
							auth_type !== '001' ? '' : <Col {...colProps}>
								<FormItem label='授权至' {...formItemLayout(6,18)}>
									{getFieldDecorator('valid_time', {
										initialValue: item.valid_time ? moment(item.valid_time): null,
										rules: [valid_required('授权至不能为空')]
									})(<DatePicker style={{width: '100%'}} format='YYYY-MM-DD'/>)}
								</FormItem>
							</Col>
						}
						{
							auth_type !== '002' ? '' : <Col {...colProps}>
								<FormItem label='充值金额' {...formItemLayout(6,18)}>
									{getFieldDecorator('amt', {
										initialValue: item.amt,
										rules: [valid_required('充值金额不能为空')]
									})(<InputNumber style={{width: '100%'}} min={1} max={99999}/>)}
								</FormItem>
							</Col>
						}
						{
							isTempAuth ? '' : <Col {...colProps}>
								<FormItem label='车牌号：' {...formItemLayout(6,18)}>
									{getFieldDecorator('plate_num', {
										initialValue: item.plate_num,
										rules: [valid_required('车牌号不能为空'), valid_PlateNum(), valid_max(10)]
									})(<Input />)}
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
						<FormItem label='行驶证号' {...formItemLayout(6,18)}>
							{getFieldDecorator('driving_num', {
								initialValue: item.driving_num,
								rules: [valid_required('行驶证号不能为空')]
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