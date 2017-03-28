import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatStatus, formatAuthType } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onDel, onEdit, onRecharge}) => {
  const columns = [
    {
			title: '授权类别',
			dataIndex: 'auth_type',
			key: 'auth_type'
		},
		{
			title: '车型',
			dataIndex: 'car_type',
			key: 'car_type'
		},
		{
			title: '计费类型',
			dataIndex: 'rule_type',
			key: 'rule_type'
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
							<Button type='primary' size='small' onClick={() => onEdit(row.id) }>编辑</Button>
							{
								row.auth_type === '001' || row.auth_type === '002' ? <Button type='ghost' size='small' onClick={() => onRecharge(row) }>{row.auth_type === '001' ? '续期' : '续费'}</Button> : ''
							}
						</ButtonGroup>
						)
				} else {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row.id) }>编辑</Button>
							<Popconfirm title='确认删除该计费规则？' onConfirm={() => {onDel(row.id)}}><Button type='ghost' size='small'>删除</Button></Popconfirm>
						</ButtonGroup>
					)
				}
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