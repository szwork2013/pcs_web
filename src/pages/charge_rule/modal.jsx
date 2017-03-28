import React from 'react'
import { Modal, Form, Input, Checkbox, Row, Col, InputNumber, Button, Select } from 'antd'
import { formItemLayout, myDispatch, validation } from '../../utils'
import DetailTable from './detail_table'

const FormItem = Form.Item
const MModal = ({dispatch, visible, ipValid, onCancel, onOk, item, rule_type, ruleTypes, loading, dataSource, carTypes,
	form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
	item = item || {}
	ruleTypes = ruleTypes || []
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
      onOk(data)
    })
  }
	const modalProps = {
		title: '计费规则管理',
		visible,
		onOk: handleOk,
		onCancel,
		width: 850,
		maskClosable: false,
		afterClose () {
			resetFields()
			dispatch({type: 'chargerule/common', payload: {ipValid: ''}})
		},
		...rule_type === '003' || rule_type === '004' ? {} : {wrapClassName: 'vertical-center-modal'}
	}
	const ruleTypeChange = value => {
		myDispatch(dispatch, 'chargerule/common', {rule_type: value})
	}
	const tableProps = {
		loading,
		dataSource,
		rule_type
	}
	const colProps = {xs: 24,	sm: 12,	md: 12,	lg: 12}
  return (
    <Modal {...modalProps} style={rule_type === '003' || rule_type === '004' ? {top: 20} : {}}>
			<Form>
				<Row>
					<Col {...colProps}>
						<FormItem label='授权类别' {...formItemLayout(7, 17)}>
							{getFieldDecorator('auth_type', {
								initialValue: item.auth_type || '003',
								rules: [validation.valid_required('授权类别不能为空')]
							})(<Select placeholder='请选择授权类别'>
									<Select.Option value='002'>储值</Select.Option>
									<Select.Option value='003'>临时</Select.Option>
								</Select>)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='车型' {...formItemLayout(7, 17)}>
							{getFieldDecorator('car_type', {
								initialValue: item.car_type,
								rules: [validation.valid_required('车型不能为空')]
							})(<Select placeholder='请选择车型'>
									{carTypes.map(item => (<Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>))}
								</Select>)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='计费类型' {...formItemLayout(7, 17)}>
							{getFieldDecorator('rule_type', {
								initialValue: item.rule_type,
								onChange: ruleTypeChange,
								rules: [validation.valid_required('计费类型不能为空')]
							})(<Select placeholder='请选择计费类型'>
									{ruleTypes.map(item => (<Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>))}
								</Select>)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='免费时长' {...formItemLayout(7, 17)}>
							{getFieldDecorator('free_time', {
								initialValue: item.free_time,
								rules: [validation.valid_required('免费时长不能为空')]
							})(<InputNumber style={{width: '100%'}} />)}
						</FormItem>
					</Col>
					{
						rule_type === '001' || rule_type === '002' ?
						<Col {...colProps}>
							<FormItem label='收费金额' {...formItemLayout(7, 17)}>
								{getFieldDecorator('start_amt', {
									initialValue: item.start_amt,
									rules: [validation.valid_required('收费金额不能为空')]
								})(<InputNumber style={{width: '80%'}} />)}
								<span className="ant-form-text">元/{rule_type === '001' ? '次' : '天'}</span>
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === '003' || rule_type === '004' ?
						<Col {...colProps}>
							<FormItem label='起步价' {...formItemLayout(7, 17)}>
								<Col span={12}>
									{getFieldDecorator('start_time', {
										initialValue: item.start_time
									})(<InputNumber style={{width: '65%'}}/>)}
									<span className="ant-form-text">分钟</span>
								</Col>
								<Col span={12}>
									{getFieldDecorator('start_amt', {
										initialValue: item.start_amt
									})(<InputNumber style={{width: '70%'}}/>)}
									<span className="ant-form-text">角</span>
								</Col>
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === '003' || rule_type === '004' ?
						<Col {...colProps}>
							<FormItem label='单日收费上限' {...formItemLayout(7, 17)}>
								{getFieldDecorator('day_max', {
									initialValue: item.day_max
								})(<InputNumber style={{width: '100%'}} />)}
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === '003' || rule_type === '004' ?
						<Col {...colProps}>
							<FormItem label='24小时收费上限' {...formItemLayout(7, 17)}>
								{getFieldDecorator('twenty_four_max', {
									initialValue: item.twenty_four_max
								})(<InputNumber style={{width: '100%'}} />)}
							</FormItem>
						</Col> : ''
					}
					{
						rule_type === '003' ?
						<Col {...colProps}>
							<FormItem label='超出设置时长' {...formItemLayout(7, 17)}>
								<Col span={12}>
									{getFieldDecorator('over_time', {
										initialValue: item.over_time
									})(<InputNumber style={{width: '65%'}}/>)}
									<span className="ant-form-text">分钟</span>
								</Col>
								<Col span={12}>
									{getFieldDecorator('over_amt', {
										initialValue: item.over_amt
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
				{
					rule_type === '003' || rule_type === '004' ?
					<FormItem>
						<Button type='primary'>添加明细</Button>
					</FormItem> : ''
				}
				{
					rule_type === '003' || rule_type === '004' ?
					<FormItem>
						<DetailTable {...tableProps}/>
					</FormItem> : ''
				}
			</Form>
		</Modal>
  )
}

export default Form.create()(MModal)