import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import MTree from './tree'
import TopPanel from './top_panel'
import ParkAreaModal from './park_area_modal'
import ChannelModal from './channel_modal'
import { myDispatch } from '../../utils'

const ParkArea = ({dispatch, common, parkchannel, parkarea}) => {
	const { areaTree, selectTree, type } = parkarea 
	const { parkAreas, parkTerminals, parkCameras } = common
	const treeProps = {
		areas: areaTree,
		onAreaSelect (data) {
			myDispatch(dispatch, 'parkarea/common', {selectTree: data})
			if (!data) {
				return
			}
			myDispatch(dispatch, 'common/getParkArea')
			if (data.type === 'channel') {
				myDispatch(dispatch, 'common/getParkTerminal')
				myDispatch(dispatch, 'common/getParkCamera')
				myDispatch(dispatch, 'parkchannel/getOne', {id: data.key, modalType: 'edit'})
			}			
		}
	}
	const topPanelProps = {
		selectTree
	}
	const parkAreaModalProps = {
		parkAreas
	}
	const channelModalProps = {
		parkAreas,
		parkchannel,
		parkTerminals,
		parkCameras
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

export default connect(({common, parkchannel, parkarea}) => ({common, parkchannel, parkarea}))(ParkArea)