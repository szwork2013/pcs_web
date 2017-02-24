import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import MTree from './tree'
import TopPanel from './top_panel'
import ParkAreaModal from './park_area_modal'
import ChannelModal from './channel_modal'
import { myDispatch } from '../../utils'

const ParkArea = ({dispatch, parkarea}) => {
	const { areaTree, selectTree } = parkarea 
	const treeProps = {
		areas: areaTree,
		onAreaSelect (data) {
			myDispatch(dispatch, 'parkarea/common', {selectTree: data})
		}
	}
	const topPanelProps = {
		selectTree
	}
	const parkAreaModalProps = {

	}
	return (
		<div className='content-inner'>
			<Row><TopPanel {...topPanelProps}/></Row>
			<Row>
				<Col span={4}><MTree {...treeProps}/></Col>
				<Col span={18}>
					<ParkAreaModal {...parkAreaModalProps}/>
				</Col>
			</Row>
		</div>
	);
};

ParkArea.propTypes = {
	
}

export default connect(({parkarea}) => ({parkarea}))(ParkArea)