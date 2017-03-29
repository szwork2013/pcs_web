import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatStatus, formatAuthType } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, rule_type, dataSource, onDel, onEdit, onRecharge}) => {
  let columns = []
  if (rule_type === '003') {
    columns = [
      {
        title: '时长（分钟）',
        dataIndex: 'end',
        key: 'end'
      },
      {
        title: '收费金额（角）',
        dataIndex: 'unit_amt',
        key: 'unit_amt'
      }
    ]
  } else {
    columns = [
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
        title: '计费单元（分钟）',
        dataIndex: 'unit_time',
        key: 'unit_time'
      }, 
      {
        title: '单元金额（角）',
        dataIndex: 'unit_amt',
        key: 'unit_amt'
      },
      {
        title: '单元上限（角）',
        dataIndex: 'unit_max',
        key: 'unit_max'
      }
    ]
  }
  columns.push({
			title: '操作',
			dataIndex: 'oper',
			key: 'oper',
			width: 220,
			render (text, row) {
				if (row.status === 'aa') {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							{
								row.auth_type === '001' || row.auth_type === '002' ? <Button type='ghost' size='small' onClick={() => onRecharge(row) }>{row.auth_type === '001' ? '续期' : '续费'}</Button> : ''
							}
						</ButtonGroup>
						)
				} else {
					return (
						<ButtonGroup>
							<Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							<Popconfirm title='确认删除该计费规则？' onConfirm={() => {onDel(row.id)}}><Button type='ghost' size='small'>删除</Button></Popconfirm>
						</ButtonGroup>
					)
				}
			}
		})

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