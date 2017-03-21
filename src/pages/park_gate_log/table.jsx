import React from 'react'
import MTable from '../../components/table'
import { formatDate } from '../../utils/format'
import { Button } from 'antd'

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onLookUpPic}) => {
	const columns = [
		{
			title: '通道名称',
			dataIndex: 'channel_name',
			key: 'channel_name'
		},
    {
			title: '操作类型',
			dataIndex: 'op',
			key: 'op'
		},
		{
			title: '操作人',
			dataIndex: 'op_user_name',
			key: 'op_user_name'
		},
		{
			title: '操作时间',
			dataIndex: 'op_time',
			key: 'op_time',
			render: text => formatDate(text)
		},
    {
			title: '操作',
			dataIndex: 'capture_img',
			key: 'capture_img',
			render: text => (<Button type='primary' onClick={() => onLookUpPic(text)}>查看图片</Button>)
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
    rowKey: record => record.id
  }

  return (
    <MTable {...tableProps}/>
  )
}

export default Table