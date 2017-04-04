import React from 'react'
import { Modal, Form, Input, Checkbox, Row, Col, InputNumber, Button, Select, Spin } from 'antd'
import { formItemLayout, myDispatch, validation, format } from '../../utils'
import DetailTable from './detail_table'
import DetailModal from './detail_modal'
import _ from 'lodash'

const FormItem = Form.Item
const MModal = ({dispatch, detailItem, modalLoading, detalModalType, detalModalVisible, visible, onCancel, onOk, item, rule_type, ruleTypes, loading, dataSource, carTypes, area_id,
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
			let fields = getFieldsValue()
      const data = {
        main: {
					...fields,
					status: fields['status'] ? 'aa' : 'nn',
					id: item.id,
					free_time: format.toInt(fields['free_time']),
					pay_amt: format.toInt(fields['pay_amt']),
					start_time: format.toInt(fields['start_time']),
					start_amt: format.toInt(fields['start_amt']),
					over_time: format.toInt(fields['over_time']),
					over_amt: format.toInt(fields['over_amt']),
					twenty_four_max: format.toInt(fields['twenty_four_max']),
					day_max: format.toInt(fields['day_max']),
					area_id,
				},
				details: dataSource
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
			dispatch({type: 'chargerule/common', payload: {rule_type: ''}})
		},
		wrapClassName: 'vertical-center-modal'
		// ...rule_type === '003' || rule_type === '004' ? {} : {wrapClassName: 'vertical-center-modal'}
	}
	const ruleTypeChange = value => {
		resetFields()
		myDispatch(dispatch, 'chargerule/common', {rule_type: value, detailDataSource: []})
	}
	const tableProps = {
		loading,
		dataSource,
		rule_type,
		onDel (data) {
			_.remove(dataSource, item => {
				return item === data
			})
			myDispatch(dispatch, 'chargerule/common', {detailDataSource: dataSource})
		},
		onEdit (data) {
			myDispatch(dispatch, 'chargerule/common', {detalModalVisible: true, detalModalType: 'edit', detailItem: data})
		}
	}
	const detailModalProps = {
		dispatch,
		visible: detalModalVisible,
		rule_type,
		item: detalModalType === 'create' ? {} : detailItem,
		onCancel () {
			myDispatch(dispatch, 'chargerule/common', {detalModalVisible: false})
		},
		onOk (data) {
			if (detalModalType === 'create') {
				dataSource = dataSource || []
				dataSource.push(data)
				myDispatch(dispatch, 'chargerule/common', {detalModalVisible: false, detailDataSource: dataSource})
			} else {
				dataSource[data.key] = {
					...data,
					key: undefined
				}
				myDispatch(dispatch, 'chargerule/common', {detalModalVisible: false, detailDataSource: dataSource})
			}
		}
	}
	const addDetail = () => {
		myDispatch(dispatch, 'chargerule/common', {detalModalVisible: true, detalModalType: 'create'})
	}
	const colProps = {xs: 24,	sm: 12,	md: 12,	lg: 12}
	// style={rule_type === '003' || rule_type === '004' ? {top: 20} : {}}
  return (
    <Modal {...modalProps}>
			<Spin spinning={modalLoading}>
				<Form>
					<Row>
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
							<FormItem label='免费时长' {...formItemLayout(7, 17)}>
								{getFieldDecorator('free_time', {
									initialValue: item.free_time,
									rules: [validation.valid_required('免费时长不能为空'), validation.valid_number()]
								})(<Input type='number' addonAfter='分钟' />)}
							</FormItem>
						</Col>
						{
							rule_type === '001' || rule_type === '002' ?
							<Col {...colProps}>
								<FormItem label='收费金额' {...formItemLayout(7, 17)}>
									{getFieldDecorator('pay_amt', {
										initialValue: item.pay_amt,
										rules: [validation.valid_required('收费金额不能为空'), validation.valid_number()]
									})(<Input type='number' addonAfter={rule_type === '001' ? '角/次' : '角/天'} />)}
								</FormItem>
							</Col> : ''
						}
						{
							rule_type === '003' || rule_type === '004' ?
							<Col {...colProps}>
								<FormItem label='起步价' required {...formItemLayout(7, 17)}>
									<Col span={12}>
										<FormItem>
											{getFieldDecorator('start_time', {
												initialValue: item.start_time,
												rules: [validation.valid_required('时长不能为空'), validation.valid_number()]
											})(<Input type='number' addonAfter='分钟'/>)}
										</FormItem>
									</Col>
									<Col span={12}>
										<FormItem>
											{getFieldDecorator('start_amt', {
												initialValue: item.start_amt,
												rules: [validation.valid_required('金额不能为空'), validation.valid_number()]
											})(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;'/>)}
										</FormItem>
									</Col>
								</FormItem>
							</Col> : ''
						}
						{
							rule_type === '003' || rule_type === '004' ?
							<Col {...colProps}>
								<FormItem label='单日收费上限' {...formItemLayout(7, 17)}>
									{getFieldDecorator('day_max', {
										initialValue: item.day_max,
										rules: [validation.valid_required('单日收费上限不能为空'), validation.valid_number()]
									})(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;' />)}
								</FormItem>
							</Col> : ''
						}
						{
							rule_type === '003' || rule_type === '004' ?
							<Col {...colProps}>
								<FormItem label='24小时收费上限' {...formItemLayout(7, 17)}>
									{getFieldDecorator('twenty_four_max', {
										initialValue: item.twenty_four_max,
										rules: [validation.valid_required('24小时收费上限不能为空'), validation.valid_number()]
									})(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;' />)}
								</FormItem>
							</Col> : ''
						}
						{
							rule_type === '003' ?
							<Col {...colProps}>
								<FormItem label='超出设置时长' required {...formItemLayout(7, 17)}>
									<Col span={12}>
										<FormItem>
											{getFieldDecorator('over_time', {
												initialValue: item.over_time,
												rules: [validation.valid_required('时长不能为空'), validation.valid_number()]
											})(<Input type='number' addonAfter='分钟'/>)}
										</FormItem>
									</Col>
									<Col span={12}>
										<FormItem>
											{getFieldDecorator('over_amt', {
												initialValue: item.over_amt,
												rules: [validation.valid_required('金额不能为空'), validation.valid_number()]
											})(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;'/>)}
										</FormItem>
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
							<Button type='primary' onClick={addDetail}>添加明细</Button>
						</FormItem> : ''
					}
					{
						rule_type === '003' || rule_type === '004' ?
						<FormItem>
							<DetailTable {...tableProps}/>
						</FormItem> : ''
					}
				</Form>
				<DetailModal {...detailModalProps}/>
			</Spin>
		</Modal>
  )
}

export default Form.create()(MModal)