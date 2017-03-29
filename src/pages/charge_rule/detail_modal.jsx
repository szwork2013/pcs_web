import React from 'react'
import { Modal, Form, Input } from 'antd'
import { validation, formItemLayout } from '../../utils'

const FormItem = Form.Item

const DetailModal = ({dispatch, visible, onCancel, onOk, item, rule_type,
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
        ...getFieldsValue()
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

	return (
		<Modal {...modalProps}>
			<Form>
        {
          rule_type === '003' ?
          <FormItem label='时长' {...formItemLayout()}>
            {getFieldDecorator('end', {
              initialValue: item.end,
              rules: [validation.valid_required()]
            })(<Input addonAfter='分钟'/>)}
          </FormItem> : ''
        }
        {
          rule_type === '003' ?
          <FormItem label='收费金额' {...formItemLayout()}>
            {getFieldDecorator('unit_amt', {
              initialValue: item.unit_amt,
              rules: [validation.valid_required()]
            })(<Input addonAfter='角&nbsp;&nbsp;&nbsp;'/>)}
          </FormItem> : ''
        }
				{
          rule_type === '004' ?
          <FormItem label='开始时间' {...formItemLayout()}>
            {getFieldDecorator('begin', {
              initialValue: item.begin,
              rules: [validation.valid_required()]
            })(<Input />)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='结束时间' {...formItemLayout()}>
            {getFieldDecorator('end', {
              initialValue: item.end,
              rules: [validation.valid_required()]
            })(<Input />)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='计费单元' {...formItemLayout()}>
            {getFieldDecorator('unit_time', {
              initialValue: item.unit_time,
              rules: [validation.valid_required()]
            })(<Input addonAfter='分钟'/>)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='单元金额' {...formItemLayout()}>
            {getFieldDecorator('unit_amt', {
              initialValue: item.unit_amt,
              rules: [validation.valid_required()]
            })(<Input addonAfter='角&nbsp;&nbsp;&nbsp;'/>)}
          </FormItem> : ''
        }
        {
          rule_type === '004' ?
          <FormItem label='单元上限' {...formItemLayout()}>
            {getFieldDecorator('unit_max', {
              initialValue: item.unit_max,
              rules: [validation.valid_required()]
            })(<Input addonAfter='角&nbsp;&nbsp;&nbsp;'/>)}
          </FormItem> : ''
        }
			</Form>
		</Modal>
	)
}

export default Form.create()(DetailModal)