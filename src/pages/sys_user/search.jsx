import React from 'react'
import MSearch from '../../components/search'
import { Row, Col, Button } from 'antd'

const Search = ({onSearch, onAdd}) => {
  const searchProps = {
    placeholder: '姓名、登录名或手机号',
    size: 'large',
    onSearch
  }

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
        <MSearch {...searchProps} />
      </Col>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
        <Button size='large' type='goest' onClick={onAdd}>添加</Button>
      </Col>
    </Row>
  )
}

export default Search