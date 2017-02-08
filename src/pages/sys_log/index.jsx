import React from 'react'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import Table from './table'

const SysLog = ({dispatch, syslog}) => {
  const { total, pageIndex, pageSize, dataSource, loading, title} = syslog
  const searchProps = {
    placeholder: '日志标题',
    onSearch (data) {
      dispatch({type: 'syslog/getList', payload: {pageIndex: 1, pageSize, title: data.keyword}})
    }
  }

  const tableProps = {
    dataSource,
    loading,
		total,
		pageIndex,
		pageSize,
		onPageChange (page) {
      dispatch({type: 'syslog/getList', payload: {pageIndex: page, pageSize, title}})
    }
  }

  return (
    <div className='content-inner'>
      <SearchPanel {...searchProps}/>
      <Table {...tableProps}/>
    </div>
  )
}

export default connect(({syslog}) => ({syslog}))(SysLog)