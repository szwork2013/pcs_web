import React, { PropTypes } from 'react'
import { Modal, Form, TimePicker, Row, Col } from 'antd'
import { formItemLayout, validation, format } from '../../utils'
import moment from 'moment'

const FormItem = Form.Item
const MModal = ({dispatch, visible, onCancel, onOk, item,
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
			const filedsValue = getFieldsValue()
      const data = {
        begin: filedsValue['begin'] ? filedsValue['begin'].format('HH:mm') : undefined,
				end: filedsValue['end'] ? filedsValue['end'].format('HH:mm') : undefined,
      }
      onOk(data)
    })
  }

	const modalProps = {
		title: '时段管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
		},
		wrapClassName: 'vertical-center-modal'
	}

	const checkBeginRule = (rule, value, callback) => {
		if (value) {
			const fieldsValue = getFieldsValue()
			if (fieldsValue['end'] && value > fieldsValue['end']) {
				callback('开始时段不能大于结束时段')
			} else {
				callback()
			}
		} else {
			callback('开始时段不能为空')
		}
	}
	const checkEndRule = (rule, value, callback) => {
		if (value) {
			const fieldsValue = getFieldsValue()
			if (fieldsValue['begin'] && value < fieldsValue['begin']) {
				callback('结束时段不能小于开始时段')
			} else {
				callback()
			}
		} else {
			callback('结束时段不能为空')
		}
	}
	const colProps = {xs: 24, sm: 12, md: 12, lg: 12}
	return (
		<Modal {...modalProps}>
			<Form>
				<Row>
					<Col {...colProps}>
						<FormItem label='开始时段' {...formItemLayout(10,14)}>
							{getFieldDecorator('begin', {
								initialValue: !item.begin ? null :  moment(item.begin),
            		rules: [{validator: checkBeginRule}]
							})(<TimePicker format='HH:mm' style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
					<Col {...colProps}>
						<FormItem label='结束时段' {...formItemLayout(10,14)}>
							{getFieldDecorator('end', {
								initialValue: !item.end ? null : moment(item.end),
            		rules: [{validator: checkEndRule}]
							})(<TimePicker format='HH:mm' style={{width: '100%'}}/>)}
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default Form.create()(MModal)