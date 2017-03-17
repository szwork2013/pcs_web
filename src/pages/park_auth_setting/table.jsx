import React from 'react'
import { Button } from 'antd'
import MTable from '../../components/table'

const ButtonGroup = Button.Group
const Table = ({dataSource, loading}) => {
	const columns = [
    {
			title: '开始时间',
			dataIndex: 'itemCode',
			key: 'itemCode'
		},
		{
			title: '结束时间',
			dataIndex: 'itemName',
			key: 'itemName'
		},
		{
			title: '操作',
			dataIndex: 'oper',
			key: 'oper',
			width: 220,
			render (text, row) {
				return (
					<ButtonGroup>
						<Button type='primary' size='small' onClick={() => onEdit(row) }>全时段</Button>
						<Button type='primary' size='small' onClick={() => onEdit(row) }>禁止通行</Button>
						<Button type='primary' size='small' onClick={() => onEdit(row) }>删除</Button>
					</ButtonGroup>
				)
			}
		}
  ]

  const tableProps = {
    columns,
    loading,
    showPage: false,
    // dataSource,
    rowKey: record => record.id
  }

  return (
    <MTable {...tableProps}/>
  )
}

export default Table