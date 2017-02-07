import React from 'react'
import MTable from '../../components/table'
import { formatStatus } from '../../utils/format'
import { Button } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onStatusChange, onEdit}) => {
	const columns = [
    {
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '角色名',
			dataIndex: 'roleName',
			key: 'roleName'
		},
    {
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: text => formatStatus(text)
		},
		{
			title: '操作',
			dataIndex: 'oper',
			key: 'oper',
			render (text, row) {
				return (
					<ButtonGroup>
						{row.status === 'aa' ? <Button type='danger' size='small' onClick={() => onStatusChange(row.id, 'nn') }>停用</Button> 
							: <div><Button type='primary' size='small' onClick={() => onStatusChange(row.id, 'aa') }>启用</Button>
								<Button type='goest' size='small' onClick={() => onEdit(row) }>编辑</Button></div>}
					</ButtonGroup>
				)
			}
		}
  ]

	const tableProps = {
    columns,
    loading,
    dataSource,
		showPage: false,
    rowKey: record => record.id
  }

  return (
    <MTable {...tableProps}/>
  )
}

export default Table