import React, {PropTypes} from 'react'
import { Row, Col, Input, Select, Button, Form } from 'antd'
import styles from './index.less'
import { formItemLayout } from '../../utils'

const FormItem = Form.Item
const MSearch = ({onSearch, onAdd, onBatchAdd, authTypes, form: {
    getFieldDecorator,
    getFieldsValue
}}) => {
	authTypes = authTypes || []
	const handleOk = () => {
		const data = {...getFieldsValue()}
		onSearch(data)
  }
	const AuthTypeOptions = authTypes.map((item, key) => (
		<Select.Option key={key} value={item.itemCode}>{item.itemName}</Select.Option>)
	)

	return (
		<Form layout='inline' style={{marginBottom: 12}}>
			<FormItem>
					{getFieldDecorator('key')(<Input placeholder='车牌号、卡号'/>)}
			</FormItem>
			<FormItem label='卡类：'>
					{getFieldDecorator('auth_type', {initialValue: ''})(<Select style={{width: 150}}>
						<Select.Option value=''>全部</Select.Option>
						{AuthTypeOptions}
						</Select>)}
			</FormItem>
			<FormItem>
					<Button type='primary' onClick={() => handleOk()}>查询</Button>
			</FormItem>
			<FormItem style={{float: 'right'}}>
				<Button size='large' type='goest' onClick={() => onAdd()} style={{marginRight: 12}}>添加</Button>
				<Button size='large' type='goest' onClick={() => onBatchAdd()}>批量添加</Button>
			</FormItem>
		</Form>
	)
}

MSearch.propTypes = {
	
}

export default Form.create()(MSearch)