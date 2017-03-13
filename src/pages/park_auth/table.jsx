import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatStatus, formatAuthType } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onDel, onEdit, onRecharge}) => {
  const columns = [
    {
			title: '车牌号',
			dataIndex: 'plate_num',
			key: 'plate_num'
		},
		{
			title: '卡号',
			dataIndex: 'card_num',
			key: 'card_num'
		},
		{
			title: '用户名',
			dataIndex: 'user_name',
			key: 'user_name'
		},
		{
			title: '手机号',
			dataIndex: 'phone',
			key: 'phone'
		},
		{
			title: '授权类别',
			dataIndex: 'auth_type',
			key: 'auth_type',
			render: text => formatAuthType(text)
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
				if (row.status === 'aa') {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							<Button type='ghost' size='small' onClick={() => onRecharge(row) }>续费</Button>
						</ButtonGroup>
						)
				} else {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							<Popconfirm title='确认删除该授权？' onConfirm={() => {onDel(row.id)}}><Button type='ghost' size='small'>删除</Button></Popconfirm>
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