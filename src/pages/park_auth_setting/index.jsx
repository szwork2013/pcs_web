import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import _ from 'lodash'
import MTree from './tree'
import MModal from './modal'
import AddSegmentModal from './add_segment_modal'
import { myDispatch, defaultModalProps } from '../../utils'

const Main = ({dispatch, common, parkauthsetting}) => {
  const { areaAuthTree, selectedKeys, selectTree, currentItem, segments, loading } = parkauthsetting
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
		selectTree,
		item: currentItem,
		segments,
		loading,
		onAddSegment () {
			myDispatch(dispatch, 'parkauthsetting/showModal')
		},
		onEditSegment (type) {
			let temp = []
			if (type === 'full') {
				temp = [{begin: '00:00', end: '23:59'}]
			} else if (type === 'none') {
				temp = [{begin: '00:00', end: '00:00'}]
			}
			myDispatch(dispatch, 'parkauthsetting/common', {segments: temp})
		},
		onDelSegment (data) {
			_.remove(segments, item => {
				return item.begin === data.begin && item.end === data.end
			})
			myDispatch(dispatch, 'parkauthsetting/common', {segments})
		},
		onOk (data) {			
			myDispatch(dispatch, 'parkauthsetting/addOrUpt', {segments, currentItem: data, ...selectTree})
		}
	}
	const addModalProps = defaultModalProps(parkauthsetting, {
		onCancel () {
			myDispatch(dispatch, 'parkauthsetting/hideModal')
		},
		onOk (data) {
			segments.push(data)
			myDispatch(dispatch, 'parkauthsetting/hideModal', {segments})
		}
	})
	const GenModal = () => <MModal {...modalProps}/>
  return (
    <div className='content-inner'>
			<Row>
				<Col  span={4}>
					<MTree {...treeProps}/>			
				</Col>
				<Col span={14}>
					{
						selectTree && selectTree.channel_id ? <GenModal /> : ''
					}					
				</Col>
			</Row>
			<AddSegmentModal {...addModalProps}/>
		</div>
  )
}

export default connect(({common, parkauthsetting}) => ({common, parkauthsetting}))(Main)