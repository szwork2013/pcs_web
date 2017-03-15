import React, {PropTypes} from 'react'
import { Modal, Form, Input, Checkbox } from 'antd'
import { formItemLayout } from '../../utils'
import { valid_required } from '../../utils/validation'

const FormItem = Form.Item
const MModal = ({dispatch, visible, itemNameValid, onCancel, search, onOk, item, form: {
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
				status: getFieldsValue()['status'] ? 'aa' : 'nn',
				id: item.id,
				dictCode: item.dictCode
      }
      onOk(data)
    })
  }

	const modalProps = {
		title: '字典管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
			dispatch({type: 'dict/common', payload: {itemNameValid: ''}})
		},
		wrapClassName: 'vertical-center-modal'
	}
console.log(item);
	const checkItemName = (rule, value, callback) => {
		if (value) {
			if (value.length > 20) {
				callback('字典项最大长度20')
				dispatch({type: 'dict/common', payload: {itemNameValid: 'error'}})
				return
			}
			const fieldsValue = getFieldsValue()
			dispatch({type: 'dict/checkItemName', payload: {itemName: fieldsValue['itemName'], callback, dictCode: search.dictCode}})
		} else {
			callback('字典项不能为空')
			dispatch({type: 'dict/common', payload: {itemNameValid: 'error'}})
		}
	}

	return (
		<Modal {...modalProps}>
			<Form>
				<FormItem label='字典名称：' {...formItemLayout()} hasFeedback validateStatus={itemNameValid}>
					{getFieldDecorator('itemName', {
            initialValue: item.itemName,
						validateTrigger: 'onBlur',
            rules: [{validator: checkItemName}]
          })(<Input />)}
				</FormItem>
				<FormItem label='状态：' {...formItemLayout()}>
					{getFieldDecorator('status', {
						valuePropName: 'checked',
            initialValue: item.status !== 'nn'
          })(<Checkbox />)}
				</FormItem>
			</Form>
		</Modal>
	)
}

MModal.propTypes = {
	
}

export default Form.create()(MModal)
