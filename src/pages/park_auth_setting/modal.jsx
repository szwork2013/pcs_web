import React from 'react'
import { Card, Form, Input, Row, Col, Checkbox } from 'antd'
import { formItemLayout } from '../../utils'
import MTable from './table'

const FormItem = Form.Item
const MModal = ({item, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
  item = item || {}
  const colProps = {xs: 24, sm: 12, md: 12, lg: 12}
  return (
    <Card title='卡类权限设置'>
      <Form>
        <Row>
          <Col {...colProps}>
            <FormItem label='备注：' {...formItemLayout(6,18)}>
              {getFieldDecorator('brief', {
                initialValue: item.brief,
                rules: [valid_max(50)]
              })(<Input/>)}
            </FormItem>
          </Col>
					<Col {...colProps}>
            <FormItem label='自动放行：' {...formItemLayout(6,18)}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox />)}
            </FormItem>
            <FormItem label='车满允许放行：' {...formItemLayout(6,18)}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox />)}
            </FormItem>
          </Col>
          <Col {...colProps}>
            
          </Col>
          <Col {...colProps}>
            <FormItem label='运行重复出/入场：' {...formItemLayout(6,18)}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox />)}
            </FormItem>
          </Col>
          <Col {...colProps}>
            <FormItem label='过期按临时车处理：' {...formItemLayout(6,18)}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox />)}
            </FormItem>
          </Col>
          <Col {...colProps}>
            <FormItem label='播报车牌号：' {...formItemLayout(6,18)}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox />)}
            </FormItem>
          </Col>
        </Row>        
        <FormItem>
          <MTable/>
        </FormItem>
      </Form>
    </Card>
  )
}

export default Form.create()(MModal)