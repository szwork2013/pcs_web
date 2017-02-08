import React from 'react'
import MTable from '../../components/table'
import { formatDate, formatLogType } from '../../utils/format'
import { Button } from 'antd'

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange}) => {
	const columns = [
    {
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '日志类别',
			dataIndex: 'type',
			key: 'type',
			render: text => formatLogType(text)
		},
		{
			title: '日志标题',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: '操作人',
			dataIndex: 'opUserName',
			key: 'opUserName'
		},
		{
			title: '操作时间',
			dataIndex: 'opTime',
			key: 'opTime',
			render: text => formatDate(text)
		}
  ]

	const tableProps = {
    columns,
    loading,
    dataSource,
		pageIndex,
    pageSize,
    total,
		onChange: onPageChange,
		expandedRowRender: record => record.info,
    rowKey: record => record.id
  }

  return (
    <MTable {...tableProps}/>
  )
}

export default Table