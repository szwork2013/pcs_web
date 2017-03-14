import React, {PropTypes} from 'react'
import Table from './table'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import Modal from './modal'

const ParkCamera = ({dispatch, parkcamera, common}) => {
  const { total, ipValid, pageIndex, pageSize, dataSource, loading, currentItem, modalType, modalVisible, currentKey, search} = parkcamera
	const { producers } = common

  const searchProps = {
    placeholder: 'IP',
    onSearch (data) {
      dispatch({type: 'parkcamera/getList', payload: {pageIndex: 1, pageSize, search: { key: data.keyword}}})
    },
    onAdd () {
      dispatch({type: 'parkcamera/openModal', payload: {modalType: 'create', currentKey: null}})
    }
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
		producers,
    ipValid,
    dispatch,
    onOk (data) {
      if (currentKey) {
        data.id = currentKey
        dispatch({type: 'parkcamera/update', payload: {data}})
      } else {
        dispatch({type: 'parkcamera/create', payload: {data}})
      }      
    },
    onCancel () {
      dispatch({type: 'parkcamera/hideModal'})
    }
  }

  const tableProps = {
    total,
    dataSource,
    loading,
    pageIndex,
    pageSize,
    onPageChange (page) {
      dispatch({type: 'parkcamera/getList', payload: {pageIndex: page, pageSize, search}})
    },
    onDel (id) {
      dispatch({type: 'parkcamera/remove', payload: {id}})
    },
    onEdit (data) {
      dispatch({type: 'parkcamera/openModal', payload: {currentKey:data.id, currentItem: data, modalType: 'edit'}})
    }
  }

	return (
		<div className='content-inner'>
      <SearchPanel {...searchProps}/>
      <Table {...tableProps}/>
      <Modal {...modalProps}/>
    </div>
	)
}

ParkCamera.propTypes = {
	
}

export default connect(({parkcamera, common}) => ({parkcamera, common}))(ParkCamera)