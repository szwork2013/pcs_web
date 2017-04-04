import React from 'react'
import { Modal, Form, Input, TimePicker } from 'antd'
import { validation, formItemLayout, format } from '../../utils'
import moment from 'moment'

const FormItem = Form.Item
const DetailModal = ({dispatch, visible, onCancel, onOk, item, rule_type,
	form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue
  }}) => {
	item = item || {}
	const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let fields = getFieldsValue()
      const data = {
        ...fields,
        unit_time: format.toInt(fields['unit_time']),
        unit_amt: format.toInt(fields['unit_amt']),
        unit_max: format.toInt(fields['unit_max']),
        begin: fields['begin'] ? fields['begin'].format('HH:mm') : undefined,
        end: rule_type === '003' ? fields['end'] : (fields['end'] ? fields['end'].format('HH:mm') : undefined),
        key: item.key
      }
      onOk(data)
    })
  }

	const modalProps = {
		title: '规则明细管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
		},
		wrapClassName: 'vertical-center-modal'
	}
  const onEndChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setFieldsValue({end: value})
    }
  }
	return (
		<Modal {...modalProps}>
			<Form>
        {
          rule_type === '003' ?
          <FormItem label='时长' {...formItemLayout()}>
            {getFieldDecorator('end', {
              initialValue: item.end,
              onChange: onEndChange,
              rules: [validation.valid_required()]
            })(<Input type='number' addonAfter='分钟' autoComplete='off'/>)}
          </FormItem> : ''
        }
        {
          rule_type === '003' ?
          <FormItem label='收费金额' {...formItemLayout()}>
            {getFieldDecorator('unit_amt', {
              initialValue: item.unit_amt,
              rules: [validation.valid_required()]
            })(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;' autoComplete='off'/>)}
          </FormItem> : ''
        }
				{
          rule_type === '004' ?
          <FormItem label='开始时间' {...formItemLayout()}>
            {getFieldDecorator('begin', {
              initialValue: moment(item.begin),
              rules: [validation.valid_required()]
            })(<TimePicker format='HH:mm' style={{width: '100%'}}/>)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='结束时间' {...formItemLayout()}>
            {getFieldDecorator('end', {
              initialValue: moment(item.end),
              rules: [validation.valid_required()]
            })(<TimePicker format='HH:mm' style={{width: '100%'}}/>)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='计费单元' {...formItemLayout()}>
            {getFieldDecorator('unit_time', {
              initialValue: item.unit_time,
              rules: [validation.valid_required()]
            })(<Input type='number' addonAfter='分钟' autoComplete='off'/>)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='单元金额' {...formItemLayout()}>
            {getFieldDecorator('unit_amt', {
              initialValue: item.unit_amt,
              rules: [validation.valid_required()]
            })(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;' autoComplete='off'/>)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='单元上限' {...formItemLayout()}>
            {getFieldDecorator('unit_max', {
              initialValue: item.unit_max,
              rules: [validation.valid_required()]
            })(<Input type='number' addonAfter='角&nbsp;&nbsp;&nbsp;' autoComplete='off'/>)}
          </FormItem> : ''
        }
			</Form>
		</Modal>
	)
}

export default Form.create()(DetailModal)