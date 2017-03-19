import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import MTree from './tree'
import MModal from './modal'
import { myDispatch } from '../../utils'

const Main = ({dispatch, common, parkauthsetting}) => {
  const { areaAuthTree, selectedKeys, selectTree } = parkauthsetting
	const { recognitionTypes, matchTypes } = common
  const treeProps = {
		areaAuthTree,
		selectedKeys,
		onAuthSel (key) {
			let temp = key.split('-')
			myDispatch(dispatch, 'common/getMatchTypeDict')
			myDispatch(dispatch, 'common/getRecognitionTypeDict')
			myDispatch(dispatch, 'parkauthsetting/get', {selectTree: {channel_id: temp[0], auth_type: temp[1]}, selectedKeys: [key]})
		}
	}
	const modalProps = {
		recognitionTypes,
		matchTypes,
		selectTree
	}
  return (
    <div className='content-inner'>
			<Row>
				<Col  span={4}>
					<MTree {...treeProps}/>			
				</Col>
				<Col span={14}>
					{
						selectTree && selectTree.channel_id ? <MModal {...modalProps}/> : ''
					}					
				</Col>
			</Row>
		</div>
  )
}

export default connect(({common, parkauthsetting}) => ({common, parkauthsetting}))(Main)