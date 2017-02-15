import React, {PropTypes} from 'react'
import {Button, Row, Form, Input} from 'antd'
import { connect } from 'dva'
import styles from './index.less'
import { config } from '../../utils'

const FormItem = Form.Item
const login = ({
	dispatch,
	loginBtnLoading,
	onOk,
	form: {
		getFieldDecorator,
		validateFieldsAndScroll
	}
}) => {
	const handleOk = () => {
		validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
			dispatch({type: 'app/login', payload: values})
    })
	}

	return (
		<div className={styles.form}>
			<div className={styles.logo}>
				<img src={config.logoSrc}/>
				<span>{config.name}</span>
			</div>
			<form>
				<FormItem hasFeedback>
					{getFieldDecorator('key', {
						rules: [
							{
								required: true,
								message: '请输入用户名'
							}
						]
					})(<Input size='large' onPressEnter={handleOk} placeholder='用户名'/>)}
				</FormItem>
				<FormItem hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: '请输入密码'
							}
						]
					})(<Input type='password' size='large' onPressEnter={handleOk} placeholder='密码'/>)}
				</FormItem>
				<Row>
					<Button type='primary' size='large' onClick={handleOk} loading={loginBtnLoading}>登录</Button>
				</Row>
			</form>
			<p>为了更好的用户体验，请使用谷歌浏览器</p>
		</div>
	)
}

login.propTypes = {
	form: PropTypes.object,
	loginBtnLoading: PropTypes.bool,
	onOk: PropTypes.func
};

export default connect(({app}) => ({app}))(Form.create()(login))