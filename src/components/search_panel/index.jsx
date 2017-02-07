import React from 'react'
import MSearch from '../search'
import { Row, Col, Button } from 'antd'

const SearchPanel = ({placeholder, onSearch, onAdd}) => {
  const searchProps = {
    placeholder,
    size: 'large',
    onSearch
  }

	const AddBtn = () => {
		if (onAdd) {
			return (
				<Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
					<Button size='large' type='goest' onClick={onAdd}>添加</Button>
				</Col>
			)
		} else {
			return <div></div>
		}
	}

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
        <MSearch {...searchProps} />
      </Col>
			<AddBtn/>
    </Row>
  )
}

export default SearchPanel