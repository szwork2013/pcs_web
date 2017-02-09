import React from 'react'
import { Modal, Input, Form } from 'antd'
import { valid_required, valid_max, valid_confirm_pwd, valid_pwd } from '../../utils/validation'

const FormItem = Form.Item
const ChangePwd = ({visible, onCancel, onOk, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }}) => {
	const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        originPwd: getFieldsValue()['originPwd'],
				password: getFieldsValue()['confirmPwd']
      }
      onOk(data)
			resetFields()
    })
  }

	const formItemLayout = {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 14
		}
	}

	const modalProps = {
		title: '密码修改',
		visible,
		onCancel,
		onOk: handleOk,
		wrapClassName: 'vertical-center-modal'
	}

  return (
    <Modal {...modalProps}>
      <Form horizontal>
				<FormItem label='原密码：' {...formItemLayout}>
					{getFieldDecorator('originPwd', {
            rules: [valid_required('原密码不能为空')]
          })(<Input type='password' />)}
				</FormItem>
				<FormItem label='新密码：' {...formItemLayout}>
					{getFieldDecorator('newPwd', {
            rules: [valid_required('新密码不能为空', valid_pwd(), valid_max(20, "密码长度最大20位"))]
          })(<Input type='password'/>)}
				</FormItem>
				<FormItem label='确认密码：' {...formItemLayout}>
					{getFieldDecorator('confirmPwd', {
            rules: [valid_required('确认密码不能为空'), valid_confirm_pwd(getFieldsValue()['newPwd'])]
          })(<Input type='password'/>)}
				</FormItem>
			</Form>
    </Modal>
  )
}

export default Form.create()(ChangePwd)