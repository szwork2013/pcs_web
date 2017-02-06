import React from 'react'
import Table from './table'
import { connect } from 'dva'
import Search from './search'
import Modal from './modal'

const SysUser = ({dispatch, sysuser}) => {
  const { total, pageIndex, pageSize, dataSource, loading, currentItem, modalType, modalVisible, currentKey} = sysuser

  const searchProps = {
    onSearch (data) {
      dispatch({type: 'sysuser/getList', payload: {pageIndex: 1, pageSize, key: data.keyword}})
    },
    onAdd () {
      dispatch({type: 'sysuser/showModal', payload: {modalType: 'create'}})
    }
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      if (currentKey) {
        data.id = currentKey
        dispatch({type: 'sysuser/update', payload: {data}})
      } else {
        dispatch({type: 'sysuser/create', payload: {data}})
      }      
    },
    onCancel () {
      dispatch({type: 'sysuser/hideModal'})
    }
  }

  const tableProps = {
    total,
    dataSource,
    loading,
    pageIndex,
    pageSize,
    onPageChange (page) {
      dispatch({type: 'sysuser/getList', payload: {pageIndex: page, pageSize}})
    },
    onDel (id) {
      dispatch({type: 'sysuser/del', payload: {id}})
    },
    onEdit (id) {
      dispatch({type: 'sysuser/getOne', payload: {id, modalType: 'edit'}})
    }
  }

  const ModalGen = () => <Modal {...modalProps}/>

  return (
    <div className='content-inner'>
      <Search {...searchProps}/>
      <Table {...tableProps}/>
      <ModalGen/>
    </div>
  )
}

export default connect(({sysuser}) => ({sysuser}))(SysUser)