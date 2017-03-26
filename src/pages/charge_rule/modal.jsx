import React from 'react'
import { Modal, Form, Input, Checkbox, Row, Col, InputNumber, Button } from 'antd'
import { formItemLayout } from '../../utils'
import DetailTable from './detail_table'

const FormItem = Form.Item
const MModal = ({dispatch, visible, ipValid, onCancel, onOk, item, rule_type,
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
		title: '计费规则管理',
		visible,
		onOk: handleOk,
		onCancel,
		width: 750,
		height: 600,
		afterClose () {
			resetFields()
			dispatch({type: 'parkterminal/common', payload: {ipValid: ''}})
		}
	}
	const colProps = {xs: 24,	sm: 12,	md: 12,	lg: 12}
  return (
    <Modal {...modalProps} style={{top: 20}}>
			<Form>
				<Row>
					<Col {...colProps}>
						<FormItem label='授权类别' {...formItemLayout(7, 17)}>
							{getFieldDecorator('ip', {
								initialValue: item.ip
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='车型' {...formItemLayout(7, 17)}>
							{getFieldDecorator('ip', {
								initialValue: item.ip
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='计费类型' {...formItemLayout(7, 17)}>
							{getFieldDecorator('ip', {
								initialValue: item.ip
							})(<Input />)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='免费时长' {...formItemLayout(7, 17)}>
							{getFieldDecorator('ip', {
								initialValue: item.ip
							})(<Input />)}
						</FormItem>
					</Col>
					{
						rule_type === undefined ?
						<Col {...colProps}>
							<FormItem label='收费金额' {...formItemLayout(7, 17)}>
								{getFieldDecorator('status', {
									valuePropName: 'checked',
									initialValue: item.status !== 'nn'
								})(<InputNumber style={{width: '70%'}} />)}
								<span className="ant-form-text">元/{rule_type === undefined ? '天' : '元'}</span>
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === undefined ?
						<Col {...colProps}>
							<FormItem label='起步价' {...formItemLayout(7, 17)}>
								<Col span={12}>
									{getFieldDecorator('status', {
										valuePropName: 'checked',
										initialValue: item.status !== 'nn'
									})(<InputNumber style={{width: '65%'}}/>)}
									<span className="ant-form-text">分钟</span>
								</Col>
								<Col span={12}>
									{getFieldDecorator('status', {
										valuePropName: 'checked',
										initialValue: item.status !== 'nn'
									})(<InputNumber style={{width: '70%'}}/>)}
									<span className="ant-form-text">角</span>
								</Col>
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === undefined ?
						<Col {...colProps}>
							<FormItem label='收费金额' {...formItemLayout(7, 17)}>
								{getFieldDecorator('status', {
									valuePropName: 'checked',
									initialValue: item.status !== 'nn'
								})(<InputNumber style={{width: '70%'}} />)}
								<span className="ant-form-text">元/{rule_type === undefined ? '天' : '元'}</span>
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === undefined ?
						<Col {...colProps}>
							<FormItem label='单日收费上限' {...formItemLayout(7, 17)}>
								{getFieldDecorator('status', {
									valuePropName: 'checked',
									initialValue: item.status !== 'nn'
								})(<InputNumber style={{width: '100%'}} />)}
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === undefined ?
						<Col {...colProps}>
							<FormItem label='24小时收费上限' {...formItemLayout(7, 17)}>
								{getFieldDecorator('status', {
									valuePropName: 'checked',
									initialValue: item.status !== 'nn'
								})(<InputNumber style={{width: '100%'}} />)}
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === undefined ?
						<Col {...colProps}>
							<FormItem label='超出设置时长' {...formItemLayout(7, 17)}>
								<Col span={12}>
									{getFieldDecorator('status', {
										valuePropName: 'checked',
										initialValue: item.status !== 'nn'
									})(<InputNumber style={{width: '65%'}}/>)}
									<span className="ant-form-text">分钟</span>
								</Col>
								<Col span={12}>
									{getFieldDecorator('status', {
										valuePropName: 'checked',
										initialValue: item.status !== 'nn'
									})(<InputNumber style={{width: '70%'}}/>)}
									<span className="ant-form-text">角</span>
								</Col>
							</FormItem>
						</Col> : ''
					}
					<Col {...colProps}>
						<FormItem wrapperCol={{offset: 7, span: 17}}>
							{getFieldDecorator('status', {
								valuePropName: 'checked',
								initialValue: item.status !== 'nn'
							})(<Checkbox>启用</Checkbox>)}
						</FormItem>
					</Col>
				</Row>	
				<FormItem>
					<Button type='primary'>添加明细</Button>
				</FormItem>
				<FormItem>
					<DetailTable/>
				</FormItem>	
			</Form>
		</Modal>
  )
}

export default Form.create()(MModal)