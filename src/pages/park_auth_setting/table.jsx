import React from 'react'
import { Button } from 'antd'
import MTable from '../../components/table'

const Table = ({dataSource, loading, onDel}) => {
	const columns = [
    {
			title: '开始时间',
			dataIndex: 'begin',
			key: 'begin'
		},
		{
			title: '结束时间',
			dataIndex: 'end',
			key: 'end'
		},
		{
			title: '操作',
			dataIndex: 'oper',
			key: 'oper',
			width: 220,
			render (text, row) {
				return (<Button type='danger' size='small' onClick={() => onDel(row) }>删除</Button>)
			}
		}
  ]

  const tableProps = {
    columns,
    loading,
    showPage: false,
    dataSource,
    rowKey: record =>{
			return record.begin + record.end
		}
  }

  return (
    <MTable {...tableProps}/>
  )
}

export default Table