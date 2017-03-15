import React, {PropTypes} from 'react'
import { Modal, Form, Input, Checkbox } from 'antd'
import { formItemLayout } from '../../utils'

const FormItem = Form.Item
const MModal = ({visible, onCancel, item, form: {
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
		title: '字典管理',
		visible,
		onOk: handleOk,
		onCancel,
		afterClose () {
			resetFields()
			dispatch({type: 'parkcamera/common', payload: {ipValid: ''}})
		},
		wrapClassName: 'vertical-center-modal'
	}

	return (
		<Modal {...modalProps}>
			<Form>
				<FormItem label='IP：' {...formItemLayout()}>
					{getFieldDecorator('ip', {
            initialValue: item.ip
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
