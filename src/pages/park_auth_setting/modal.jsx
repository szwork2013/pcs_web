import React from 'react'
import { Card, Form, Input, Row, Col, Checkbox, Select, InputNumber, Button, Spin } from 'antd'
import { formItemLayout, validation } from '../../utils'
import MTable from './table'

const FormItem = Form.Item
const InputGroup = Input.Group
const MModal = ({item, recognitionTypes, matchTypes, selectTree, loading, segments, onAddSegment, onEditSegment, onDelSegment, onOk, form: {
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
    dataSource: segments,
    onDel: onDelSegment
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
			const filedsValue = getFieldsValue()
      const data = {
        ...filedsValue,
        autoPass: filedsValue['autoPass'] ? 'y' : 'n',
        expiredAsTemp: filedsValue['expiredAsTemp'] ? 'y' : 'n',
        fullPass: filedsValue['fullPass'] ? 'y' : 'n',
        noPlateNumConfirm: filedsValue['noPlateNumConfirm'] ? 'y' : 'n',
        playPlateNum: filedsValue['playPlateNum'] ? 'y' : 'n',
        reInOrOut: filedsValue['reInOrOut'] ? 'y' : 'n',
        specialPass: filedsValue['specialPass'] ? 'y' : 'n',
        notifyNum: filedsValue['notifyNum'].toString()
      }
      onOk(data)
    })
  }
  return (
    <Card title='卡类权限设置'>
      <Spin spinning={loading}>
        <Form>
          <Row>
            <Col {...colProps}>
              <FormItem label='模糊匹配字数' {...formItemLayout(6,18)}>
                {getFieldDecorator('matchNum', {
                  initialValue: item.matchNum,
                  rules: [validation.valid_required('模糊匹配字数不能为空')]
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
                  {getFieldDecorator('notifyNum', {
                    initialValue: isNaN(item.notifyNum) ? 0 : parseInt(item.notifyNum),
                    rules: [validation.valid_required('该字段不能为空')]
                  })(<InputNumber min={1} max={9999} style={{width: '40%'}}/>)}
                  <span className="ant-form-text">{selectTree.auth_type === '001' ? '天' : '元'}语音提醒</span>
                </FormItem>
              </Col> : ''
            }
            <Col {...colProps}>
              <FormItem label='鉴权模式' {...formItemLayout(6,18)}>
                {getFieldDecorator('recognitionType', {
                  initialValue: item.recognitionType,
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
                {getFieldDecorator('autoPass', {
                  valuePropName: 'checked',
                  initialValue: item.autoPass === 'y'
                })(<Checkbox>自动放行</Checkbox>)}
              </FormItem>
            </Col>
            <Col {...colCheckBoxProps}>
              <FormItem wrapperCol={{offset: 9, span: 15}}>
                {getFieldDecorator('fullPass', {
                  valuePropName: 'checked',
                  initialValue: item.fullPass === 'y'
                })(<Checkbox>车满允许放行</Checkbox>)}
              </FormItem>
            </Col>
            <Col {...colCheckBoxProps}>
              <FormItem wrapperCol={{offset: 9, span: 15}}>
                {getFieldDecorator('reInOrOut', {
                  valuePropName: 'checked',
                  initialValue: item.reInOrOut === 'y'
                })(<Checkbox>允许重复出/入场</Checkbox>)}
              </FormItem>
            </Col>
            <Col {...colCheckBoxProps}>
              <FormItem wrapperCol={{offset: 9, span: 15}}>
                {getFieldDecorator('playPlateNum', {
                  valuePropName: 'checked',
                  initialValue: item.playPlateNum === 'y'
                })(<Checkbox>播报车牌号</Checkbox>)}
              </FormItem>
            </Col>
            {
              selectTree.auth_type === '001' || selectTree.auth_type === '004' ? 
              <Col {...colCheckBoxProps}>
                <FormItem wrapperCol={{offset: 9, span: 15}}>
                  {getFieldDecorator('expiredAsTemp', {
                    valuePropName: 'checked',
                    initialValue: item.expiredAsTemp === 'y'
                  })(<Checkbox>过期按临时车处理</Checkbox>)}
                </FormItem>
              </Col> : ''
            }
            {
              selectTree.auth_type === '003' ?           
              <Col {...colCheckBoxProps}>
                <FormItem wrapperCol={{offset: 9, span: 15}}>
                  {getFieldDecorator('noPlateNumConfirm', {
                    valuePropName: 'checked',
                    initialValue: item.noPlateNumConfirm === 'y'
                  })(<Checkbox>无牌车刷卡需确认</Checkbox>)}
                </FormItem>
              </Col> : ''
            }
            {
              selectTree.auth_type === '003' ? 
              <Col {...colCheckBoxProps}>
                <FormItem wrapperCol={{offset: 9, span: 15}}>
                  {getFieldDecorator('specialPass', {
                    valuePropName: 'checked',
                    initialValue: item.specialPass === 'y'
                  })(<Checkbox>特种车自动放行</Checkbox>)}
                </FormItem>
              </Col> : ''
            }
          </Row>      
          <FormItem>
            <Button type='primary' onClick={onAddSegment} className='ant-form-text' style={{marginRight: 8}}>添加时段</Button>
            <Button type='primary' onClick={() => onEditSegment('full')} className='ant-form-text' style={{marginRight: 8}}>全时段通行</Button>
            <Button type='danger' onClick={() => onEditSegment('none')} className='ant-form-text' style={{marginRight: 8}}>全时段禁止通行</Button>
          </FormItem>  
          <FormItem>
            <MTable {...tableProps}/>
          </FormItem>
          <Row justify='center' type='flex'>
            <Col>
              <Button type='primary' onClick={handleOk}>保存</Button>
            </Col>
          </Row>  
        </Form>
      </Spin>
    </Card>
  )
}

export default Form.create()(MModal)