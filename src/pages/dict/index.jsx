import React, { PropTypes } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import MTree from './tree'
import Top from './top'
import Table from './table'
import Modal from './modal'
import { myDispatch, defaultModalProps } from '../../utils'

const Dict = ({dispatch, dict}) => {
  const { dictIndexTree, selectedKeys, dictItems, loading } = dict
  const treeProps = {
		dictIndexTree,
		selectedKeys,
		onDictSelect (key) {
			myDispatch(dispatch, 'dict/getDictItem', {dictCode: key, selectedKeys: [key]})
		}
	}
	const tableProps = {
		dataSource: dictItems,
    loading,
		onEdit (data) {
			myDispatch(dispatch, 'dict/showModal', {currentItem: data, modalType: 'edit'})
		}
	}
	const modalProps = defaultModalProps(dict, {
		onCancel () {
			myDispatch(dispatch, 'dict/hideModal')
		}
	})
  return (
    <div className='content-inner'>
      <Row><Top /></Row>
			<Row>
				<Col span={4}><MTree {...treeProps}/></Col>
				<Col span={18}>
					<Table {...tableProps}/>
				</Col>
			</Row>
			<Modal {...modalProps}/>
		</div>
  )
}

Dict.propTypes = {
  
}

export default connect(({dict}) => ({dict}))(Dict)