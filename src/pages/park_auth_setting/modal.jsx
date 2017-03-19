import React from 'react'
import { Card, Form, Input, Row, Col, Checkbox, Select, InputNumber, Button } from 'antd'
import { formItemLayout, validation } from '../../utils'
import MTable from './table'

const FormItem = Form.Item
const InputGroup = Input.Group
const MModal = ({item, recognitionTypes, matchTypes, selectTree, form: {
		resetFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue
}}) => {
  item = item || {}
  recognitionTypes = recognitionTypes || []
  matchTypes = matchTypes || []
  const colProps = {xs: 24, sm: 12, md: 12, lg: 12}
  const colCheckBoxProps = {xs: 12, sm: 8, md: 8, lg: 8}
  const tableProps = {
    loading: false
  }
  return (
    <Card title='卡类权限设置'>
      <Form>
        <Row>
          <Col {...colProps}>
            <FormItem label='模糊匹配：' {...formItemLayout(6,18)}>
              {getFieldDecorator('brief', {
                initialValue: item.brief,
                rules: [validation.valid_max(50)]
              })(<Select>
                  {matchTypes.map(item => (
                    <Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>
                  ))}
                </Select>)}
            </FormItem>
          </Col>
          {
            selectTree.auth_type === '001' || selectTree.auth_type === '002' ?
            <Col {...colProps}>
              <FormItem label={selectTree.auth_type === '001' ? '有效期低于：' : '余额低于：'} {...formItemLayout(6,18)}>
                {getFieldDecorator('brief', {
                  initialValue: item.brief,
                  rules: [validation.valid_max(50)]
                })(<InputGroup compact> 
                    <InputNumber style={{width: '40%'}}/>&nbsp;{selectTree.auth_type === '001' ? '天' : '元'}语音提醒
                  </InputGroup>)}
              </FormItem>
            </Col> : ''
          }
          <Col {...colProps}>
            <FormItem label='鉴权模式：' {...formItemLayout(6,18)}>
              {getFieldDecorator('brief', {
                initialValue: item.brief,
                rules: [validation.valid_required('鉴权模式不能为空')]
              })(<Select>
                  {recognitionTypes.map(item => (
                    <Select.Option key={item.id} value={item.itemCode}>{item.itemName}</Select.Option>
                  ))}
                </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
					<Col {...colCheckBoxProps}>
            <FormItem wrapperCol={{offset: 9, span: 15}}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox>自动放行</Checkbox>)}
            </FormItem>
          </Col>
          <Col {...colCheckBoxProps}>
            <FormItem wrapperCol={{offset: 9, span: 15}}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox>车满允许放行</Checkbox>)}
            </FormItem>
          </Col>
          <Col {...colCheckBoxProps}>
            <FormItem wrapperCol={{offset: 9, span: 15}}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox>允许重复出/入场</Checkbox>)}
            </FormItem>
          </Col>
          <Col {...colCheckBoxProps}>
            <FormItem wrapperCol={{offset: 9, span: 15}}>
              {getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: item.status !== 'nn'
              })(<Checkbox>播报车牌号</Checkbox>)}
            </FormItem>
          </Col>
          {
            selectTree.auth_type === '001' || selectTree.auth_type === '004' ? 
            <Col {...colCheckBoxProps}>
              <FormItem wrapperCol={{offset: 9, span: 15}}>
                {getFieldDecorator('status', {
                  valuePropName: 'checked',
                  initialValue: item.status !== 'nn'
                })(<Checkbox>过期按临时车处理</Checkbox>)}
              </FormItem>
            </Col> : ''
          }
          {
            selectTree.auth_type === '003' ?           
            <Col {...colCheckBoxProps}>
              <FormItem wrapperCol={{offset: 9, span: 15}}>
                {getFieldDecorator('status', {
                  valuePropName: 'checked',
                  initialValue: item.status !== 'nn'
                })(<Checkbox>无牌车刷卡需确认</Checkbox>)}
              </FormItem>
            </Col> : ''
          }
          {
            selectTree.auth_type === '003' ? 
            <Col {...colCheckBoxProps}>
              <FormItem wrapperCol={{offset: 9, span: 15}}>
                {getFieldDecorator('status', {
                  valuePropName: 'checked',
                  initialValue: item.status !== 'nn'
                })(<Checkbox>特种车自动放行</Checkbox>)}
              </FormItem>
            </Col> : ''
          }
        </Row>      
        <FormItem>
          <Button type='primary'>添加时段</Button>
        </FormItem>  
        <FormItem>
          <MTable {...tableProps}/>
        </FormItem>
      </Form>
    </Card>
  )
}

export default Form.create()(MModal)