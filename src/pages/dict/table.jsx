import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatStatus } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, dataSource, onDel, onEdit}) => {
  const columns = [
    {
			title: '字典编码',
			dataIndex: 'itemCode',
			key: 'itemCode'
		},
		{
			title: '字典名称',
			dataIndex: 'itemName',
			key: 'itemName'
		},
		{
			title: '系统字典',
			dataIndex: 'isSys',
			key: 'isSys',
			render: text => {
				if (text === 'n') {
					return '否'
				} else {
					return '是'
				}
			}
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
			width: 220,
			render (text, row) {
				if (row.isSys !== 'n') {
					return ""
				}
				if (row.status === 'aa') {
					return (<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>)
				} else {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							<Popconfirm title='确认删除该字典？' onConfirm={() => {onDel(row.id)}}>
								<Button type='ghost' size='small'>删除</Button>
							</Popconfirm>
						</ButtonGroup>
					)
				}
			}
		}
  ]

  const tableProps = {
    columns,
    loading,
    showPage: false,
    dataSource,
    rowKey: record => record.id
  }

  return (
    <MTable {...tableProps}/>
  )
}

Table.propTypes = {
  
}

export default Table