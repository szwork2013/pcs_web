import React, { PropTypes } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import MTree from './tree'
import Top from './top'
import { myDispatch } from '../../utils'

const Dict = ({dispatch, dict}) => {
  const { dictIndexTree } = dict
  const treeProps = {
		dictIndexTree,
		onAreaSelect (keys) {

		}
	}

  return (
    <div className='content-inner'>
      <Row><Top /></Row>
			<Row>
				<Col span={4}><MTree {...treeProps}/></Col>
				<Col span={18}>
				</Col>
			</Row>
		</div>
  )
}

Dict.propTypes = {
  
}

export default connect(({dict}) => ({dict}))(Dict)