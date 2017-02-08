import React from 'react'
import { Modal, Form, Input, Radio, Select, Checkbox } from 'antd'
import { valid_required, valid_max, valid_phone, valid_email } from '../../utils/validation.js'

const FormItem = Form.Item

const SysUserModal = ({visible, onCancel, onOk, item, roleList,  
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
		title: '用户管理',
		visible,
		onOk: handleOk,
		onCancel: () => {
			resetFields()
			onCancel()
		},
		wrapClassName: 'vertical-center-modal'
	}

	const RoleOptions = roleList.map(item => {
		return (
			<Select.Option key={item.id} value={item.id}>{item.roleName}</Select.Option>
		)
	})

	return (
		<Modal {...modalProps}>
			<Form horizontal>
				<FormItem label='姓名：' {...formItemLayout}>
					{getFieldDecorator('userName', {
            initialValue: item.userName,
            rules: [valid_required('姓名不能为空'), valid_max(10, "姓名最大长度为10")]
          })(<Input />)}
				</FormItem>
				<FormItem label='登录名：' {...formItemLayout}>
					{getFieldDecorator('loginName', {
            initialValue: item.loginName,
            rules: [valid_required('登录名不能为空'), valid_max(10, "登录名最大长度为10")]
          })(<Input />)}
				</FormItem>
				<FormItem label='手机号：' {...formItemLayout}>
					{getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [valid_required('手机号不能为空'), valid_phone()]
          })(<Input />)}
				</FormItem>
				<FormItem label='邮箱：' {...formItemLayout}>
					{getFieldDecorator('email', {
            initialValue: item.email,
            rules: [valid_max(25, "邮箱最大长度为25"), valid_email()]
          })(<Input />)}
				</FormItem>
				<FormItem label='性别：' {...formItemLayout}>
					{getFieldDecorator('sex', {
            initialValue: item.sex,
            rules: [valid_required('性别不能为空')]
          })(<Radio.Group>
              <Radio value='1'>男</Radio>
              <Radio value='2'>女</Radio>
            </Radio.Group>)}
				</FormItem>
				<FormItem label='所属角色：' {...formItemLayout}>
					{getFieldDecorator('roleId', {
            initialValue: item.roleId,
						rules: [valid_required('所属角色不能为空')]
          })(<Select placeholder='请选择角色'>
							{RoleOptions}
						</Select>)}
				</FormItem>
				<FormItem label='用户类别：' {...formItemLayout}>
					{getFieldDecorator('userType', {
            initialValue: item.userType || 'web'
          })(<Select placeholder='请选择用户类别'>
							<Select.Option value='web'>web用户</Select.Option>
							<Select.Option value='terminal'>终端用户</Select.Option>
						</Select>)}
				</FormItem>
				<FormItem label='备注：' {...formItemLayout}>
					{getFieldDecorator('brief', {
            initialValue: item.brief
          })(<Input type="textarea" />)}
				</FormItem>
				<FormItem label='状态：' {...formItemLayout}>
					{getFieldDecorator('status', {
						valuePropName: 'checked',
            initialValue: item.status !== 'nn'
          })(<Checkbox />)}
				</FormItem>
			</Form>
		</Modal>
	)
}

export default Form.create()(SysUserModal)