import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatStatus } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onDel, onEdit}) => {
  const columns = [
    {
			title: 'IP',
			dataIndex: 'ip',
			key: 'ip'
		},
		{
			title: '型号',
			dataIndex: 'producerName',
			key: 'producerName'
		},
		// {
		// 	title: '所属通道',
		// 	dataIndex: 'channelName',
		// 	key: 'channelName'
		// },
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
				if (row.status === 'aa') {
					return (<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>)
				} else {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							<Popconfirm title='确认删除该摄像机？' onConfirm={() => {onDel(row.id)}}>
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
    pageIndex,
    pageSize,
    total,
    dataSource,
    onChange: onPageChange,
    rowKey: record => record.id
  }

  return (
    <MTable {...tableProps}/>
  )
}

Table.propTypes = {
  
}

export default Table