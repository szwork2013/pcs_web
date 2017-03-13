import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import MTree from './tree'
import TopPanel from './top_panel'
import ParkAreaModal from './park_area_modal'
import ChannelModal from './channel_modal'
import { myDispatch } from '../../utils'

const ParkArea = ({dispatch, common, parkarea}) => {
	const { areaTree, selectTree, type } = parkarea 
	const { parkAreas } = common
	const treeProps = {
		areas: areaTree,
		onAreaSelect (data) {
			myDispatch(dispatch, 'parkarea/common', {selectTree: data})
			myDispatch(dispatch, 'common/getParkArea')
		}
	}
	const topPanelProps = {
		selectTree
	}
	const parkAreaModalProps = {
		parkAreas
	}
	const channelModalProps = {
		parkAreas
	}
	return (
		<div className='content-inner'>
			<Row><TopPanel {...topPanelProps}/></Row>
			<Row>
				<Col span={4}><MTree {...treeProps}/></Col>
				<Col span={18}>
					{selectTree && selectTree.type === 'area' ? <ParkAreaModal {...parkAreaModalProps}/> : ''}
					{selectTree && selectTree.type === 'channel' ? <ChannelModal {...channelModalProps}/> : ''}
				</Col>
			</Row>
		</div>
	);
};

ParkArea.propTypes = {
	
}

export default connect(({common, parkarea}) => ({common, parkarea}))(ParkArea)