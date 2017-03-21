import React from 'react'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import MTable from './table'
import MModal from './modal'
import { defaultTableProps, myDispatch, defaultModalProps } from '../../utils'

const Main = ({dispatch, parkgatelog}) => {
  const {pageSize, search, capture_img} = parkgatelog
  const searchProps = {
    placeholder: '通道名称、操作人',
    onSearch (data) {
      myDispatch(dispatch, 'parkgatelog/get', {pageIndex: 1, pageSize, search: {key: data.keyword}})
    }
  }
  const tableProps = defaultTableProps(parkgatelog, {
    onPageChange (page) {
      myDispatch(dispatch, 'parkgatelog/get', {pageIndex: page, pageSize, search})
    },
    onLookUpPic (img) {
      myDispatch(dispatch, 'parkgatelog/showModal', {capture_img: img})
    }
  })
  const modalPorps = defaultModalProps(parkgatelog, {
    capture_img,
    onCancel () {
      myDispatch(dispatch, 'parkgatelog/hideModal')
    }
  })

  return (
    <div className='content-inner'>
      <SearchPanel {...searchProps}/>
      <MTable {...tableProps}/>
      <MModal {...modalPorps}/>
    </div>
  )
}

export default connect(({parkgatelog}) => ({parkgatelog}))(Main)