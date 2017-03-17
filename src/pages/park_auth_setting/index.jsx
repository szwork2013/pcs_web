import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import MTree from './tree'
import MModal from './modal'
import { myDispatch } from '../../utils'

const Main = ({dispatch, parkauthsetting}) => {
  const { areaAuthTree, selectedKeys } = parkauthsetting
  const treeProps = {
		areaAuthTree,
		selectedKeys,
		onAuthSel (key) {
			let temp = key.split('-')
			myDispatch(dispatch, 'parkauthsetting/get', {search: {channel_id: temp[0], auth_type: temp[1]}, selectedKeys: [key]})
		}
	}

  return (
    <div className='content-inner'>
			<Row>
				<Col  span={4}>
					<MTree {...treeProps}/>			
				</Col>
				<Col  span={18}>
					<MModal/>
				</Col>
			</Row>
		</div>
  )
}

export default connect(({parkauthsetting}) => ({parkauthsetting}))(Main)