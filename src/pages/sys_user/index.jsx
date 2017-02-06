import React from 'react'
import Table from './table'
import { connect } from 'dva'
import Search from './search'
import Modal from './modal'

const SysUser = ({dispatch, sysuser}) => {
  const { total, pageIndex, pageSize, dataSource, loading, currentItem, modalType, modalVisible} = sysuser

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
      dispatch({type: 'sysuser/create', payload: {data}})
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