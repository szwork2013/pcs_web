import React, { PropTypes } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import MTree from './tree'
import Top from './top'
import Table from './table'
import Modal from './modal'
import { myDispatch, defaultModalProps, message_box } from '../../utils'

const Dict = ({dispatch, dict}) => {
  const { dictIndexTree, selectedKeys, dictItems, loading, search, itemNameValid } = dict
  const treeProps = {
		dictIndexTree,
		selectedKeys,
		onDictSelect (key) {
			let temp = key.split('-')
			myDispatch(dispatch, 'dict/getDictItem', {search: {dictCode: temp[0], isSys: temp[1]}, selectedKeys: [key]})
		}
	}
	const tableProps = {
		dataSource: dictItems,
    loading,
		onEdit (data) {
			myDispatch(dispatch, 'dict/showModal', {currentItem: data, modalType: 'edit'})
		},
		onDel (id) {
			myDispatch(dispatch, 'dict/remove', {id, search})
		}
	}
	const modalProps = defaultModalProps(dict, {
		dispatch,
		itemNameValid,
		search,
		onCancel () {
			myDispatch(dispatch, 'dict/hideModal')
		},
		onOk (data) {
			data.dictCode = search.dictCode
			if (data.id) {
        dispatch({type: 'dict/update', payload: {data, search}})
      } else {
        dispatch({type: 'dict/create', payload: {data, search}})
      }
		}
	})
	const topProps = {
		onAdd () {
			if (!search || !search.isSys) {
				message_box.warnBox('请选择需要操作的数据', 3)
				return
			}
			if (search.isSys === 'y') {
				message_box.warnBox('该字典为系统字典，不能添加', 3)
				return
			}
			dispatch({type: 'dict/showModal', payload: {modalType: 'create'}})
		}
	}
  return (
    <div className='content-inner'>
      <Row><Top {...topProps}/></Row>
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