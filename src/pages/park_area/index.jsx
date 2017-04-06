import React, {PropTypes} from 'react'
import { connect } from 'dva'
import { Row, Col, Modal } from 'antd'
import MTree from './tree'
import TopPanel from './top_panel'
import ParkAreaModal from './park_area_modal'
import ChannelModal from './channel_modal'
import { myDispatch } from '../../utils'
import { warnBox } from '../../utils/message_box'

const ParkArea = ({dispatch, common, parkchannel, parkarea}) => {
	const { areaTree, selectTree, type, selectedKeys, isChannelReset, isAreaReset } = parkarea 
	const { parkAreas, parkTerminals, parkCameras } = common
	const treeProps = {
		areas: areaTree,
		selectedKeys,
		onAreaSelect (keys) {
			if (!keys || keys.length === 0) {
				myDispatch(dispatch, 'common/getParkArea')
				if (selectTree.type === 'channel') {
					// myDispatch(dispatch, 'common/getParkTerminal')
					// myDispatch(dispatch, 'common/getParkCamera')
					myDispatch(dispatch, 'parkchannel/getOne', {id: selectTree.key, modalType: 'edit'})
					myDispatch(dispatch, 'parkarea/common', {isChannelReset: true})
					myDispatch(dispatch, 'parkarea/common', {modalType: 'init'})
				} else {
					myDispatch(dispatch, 'parkarea/getOne', {id: selectTree.key, modalType: 'edit'})
					myDispatch(dispatch, 'parkarea/common', {isAreaReset: true})
					myDispatch(dispatch, 'parkchannel/common', {modalType: 'init'})
				}
				return
			}

			let temp = keys[0].split('-')
			myDispatch(dispatch, 'parkarea/common', {selectTree: {key: temp[0], type: temp[1], title: temp[2]}, selectedKeys: keys})
			myDispatch(dispatch, 'common/getParkArea')
			if (temp[1] === 'channel') {
				// myDispatch(dispatch, 'common/getParkTerminal')
				// myDispatch(dispatch, 'common/getParkCamera')
				myDispatch(dispatch, 'parkchannel/getOne', {id: temp[0], modalType: 'edit'})
				myDispatch(dispatch, 'parkarea/common', {isChannelReset: true})
			} else {
				myDispatch(dispatch, 'parkarea/getOne', {id: temp[0], modalType: 'edit'})
				myDispatch(dispatch, 'parkarea/common', {isAreaReset: true})
			}
		}
	}
	const topPanelProps = {
		selectTree,
		onOp (type) {
			myDispatch(dispatch, 'common/getParkArea')
			switch(type) {
				case 'add_channel': {
					myDispatch(dispatch, 'parkchannel/common', {modalType: 'create'})
					myDispatch(dispatch, 'parkarea/common', {modalType: 'init'})
				}break
				case 'del_channel': {
					if (!selectTree || !selectTree.key || selectTree.type !== 'channel') {
						warnBox('请选择需要删除的通道', 3)
						return
					}
					Modal.confirm({
						title: '确认框',
						content: '确认删除该通道？',
						onOk () {
							myDispatch(dispatch, 'parkchannel/remove', {id: selectTree.key})
						}
					})					
				}break
				case 'add_area': {
					myDispatch(dispatch, 'parkarea/common', {modalType: 'create'})
					myDispatch(dispatch, 'parkchannel/common', {modalType: 'init'})
				}break
				case 'del_area': {
					if (!selectTree || !selectTree.key || selectTree.type !== 'area') {
						warnBox('请选择需要删除的停车场', 3)
						return
					}
					Modal.confirm({
						title: '确认框',
						content: '确认删除该停车场？',
						onOk () {
							myDispatch(dispatch, 'parkarea/remove', {id: selectTree.key})
						}
					})		
				}break
			}
		}
	}
	const parkAreaModalProps = {
		parkAreas,
		parkarea,
		isAreaReset,
		onSave (data) {
			if (data.id) {
				myDispatch(dispatch, 'parkarea/edit', {data})
			} else {
				myDispatch(dispatch, 'parkarea/add', {data})
			}
		},
		onReset () {
			myDispatch(dispatch, 'parkarea/common', {isAreaReset: false})
		}
	}
	const channelModalProps = {
		parkAreas,
		parkchannel,
		parkTerminals,
		parkCameras,
		isChannelReset,
		onSave (data) {
			if (data.id) {
				myDispatch(dispatch, 'parkchannel/edit', {data})
			} else {
				myDispatch(dispatch, 'parkchannel/add', {data})
			}
		},
		onReset () {
			myDispatch(dispatch, 'parkarea/common', {isChannelReset: false})
		}
	}
	// const GenChannelModal = () => <ChannelModal {...channelModalProps}/>
	// const GenParkAreaModal = () => <ParkAreaModal {...parkAreaModalProps}/>
	return (
		<div className='content-inner'>
			<Row><TopPanel {...topPanelProps}/></Row>
			<Row>
				<Col span={4}><MTree {...treeProps}/></Col>
				<Col span={18}>
					{selectTree && selectTree.type === 'area' && parkarea.modalType !== 'init' || parkarea.modalType === 'create' ? <ParkAreaModal {...parkAreaModalProps}/> : ''}
					{selectTree && selectTree.type === 'channel' && parkchannel.modalType !== 'init' || parkchannel.modalType === 'create' ? <ChannelModal {...channelModalProps}/> : ''}
				</Col>
			</Row>
		</div>
	);
};

ParkArea.propTypes = {
	
}

export default connect(({common, parkchannel, parkarea}) => ({common, parkchannel, parkarea}))(ParkArea)