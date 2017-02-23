import React, {PropTypes} from 'react'
import Table from './table'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import Modal from './modal'

const ParkTerminal = ({dispatch, parkterminal}) => {
	const { total, pageIndex, pageSize, dataSource, loading, currentItem, modalType, modalVisible, currentKey, search} = parkterminal

  const searchProps = {
    placeholder: 'IP',
    onSearch (data) {
      dispatch({type: 'parkterminal/getList', payload: {pageIndex: 1, pageSize, search: {key: data.keyword}}})
    },
    onAdd () {
      dispatch({type: 'parkterminal/showModal', payload: {modalType: 'create', currentKey: null}})
    }
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      if (currentKey) {
        data.id = currentKey
        dispatch({type: 'parkterminal/update', payload: {data}})
      } else {
        dispatch({type: 'parkterminal/create', payload: {data}})
      }      
    },
    onCancel () {
      dispatch({type: 'parkterminal/hideModal'})
    }
  }

  const tableProps = {
    total,
    dataSource,
    loading,
    pageIndex,
    pageSize,
    onPageChange (page) {
      dispatch({type: 'parkterminal/getList', payload: {pageIndex: page, pageSize, search}})
    },
    onDel (id) {
      dispatch({type: 'parkterminal/remove', payload: {id}})
    },
    onEdit (data) {
      dispatch({type: 'parkterminal/showModal', payload: {currentKey:data.id, currentItem: data, modalType: 'edit'}})
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

ParkTerminal.propTypes = {
	
}

export default connect(({parkterminal}) => ({parkterminal}))(ParkTerminal)