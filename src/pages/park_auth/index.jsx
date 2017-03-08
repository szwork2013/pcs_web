import React, {PropTypes} from 'react'
import Table from './table'
import { connect } from 'dva'
import Modal from './modal'
import BatchModal from './batch_modal'
import Search from './search'
import { myDispatch, defaultTableProps, defaultModalProps } from '../../utils'

const ParkAuth = ({dispatch, parkauth, common}) => {
	const { pageSize, currentKey, search, batchModalVisible, isTempAuth, isBlackAuth} = parkauth
	const { authTypes } = common
	const modalProps = defaultModalProps(parkauth, {
		authTypes,
		isTempAuth,
		isBlackAuth,
		onOk (data) {
      if (currentKey) {
        data.id = currentKey
				myDispatch(dispatch, 'parkauth/update', {data})
      } else {
				myDispatch(dispatch, 'parkauth/create', {data})
      }      
    },
    onCancel () {
			myDispatch(dispatch, 'parkauth/hideModal')
    },
		onAuthChange (data) {
			myDispatch(dispatch, 'parkauth/common', {isTempAuth: data === '003', isBlackAuth: data === '005' })
		}
	})

  const tableProps = defaultTableProps(parkauth, {
		onPageChange (page) {
			myDispatch(dispatch, 'parkauth/getPaging', {pageIndex: page, pageSize, search})
    },
    onDel (id) {
			myDispatch(dispatch, 'parkauth/remove', {id})
    },
    onEdit (data) {
			myDispatch(dispatch, 'parkauth/showModal', {currentKey:data.id, currentItem: data, modalType: 'edit'})
    }
	})

	const searchProps = {
		authTypes,
		onSearch (data) {
			myDispatch(dispatch, 'parkauth/getPaging', {pageIndex: 1, pageSize, search: {...data}})
		},
		onAdd () {
			myDispatch(dispatch, 'parkauth/showModal', {modalType: 'create', currentKey: null, isTempAuth: false, isBlackAuth: false})
		},
		onBatchAdd () {
			myDispatch(dispatch, 'parkauth/common', {batchModalVisible: true})
		}
	}

	const batchModalProps = {
		visible: batchModalVisible,
		onCancel () {
			myDispatch(dispatch, 'parkauth/common', {batchModalVisible: false})
    }
	}

	return (
		<div className='content-inner'>
			<Search {...searchProps}/>
			<Table {...tableProps}/>
      <Modal {...modalProps}/>
			<BatchModal {...batchModalProps}/>
		</div>
	)
}

ParkAuth.propTypes = {
	
}

export default connect(({parkauth, common}) => ({parkauth, common}))(ParkAuth)