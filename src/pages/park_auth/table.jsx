import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatStatus } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onDel, onEdit}) => {
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
			title: '所属停车场',
			dataIndex: 'area_name',
			key: 'area_name'
		},
		{
			title: '授权类别',
			dataIndex: 'auth_type_name',
			key: 'auth_type_name'
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
				return (
					<ButtonGroup>
						{row.status === 'aa' ? <Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							: <div><Button type='primary' size='small' onClick={() => onEdit(row) }>编辑</Button>
							<Popconfirm title='确认删除该授权？' onConfirm={() => {onDel(row.id)}}><Button type='ghost' size='small'>删除</Button></Popconfirm></div>}
					</ButtonGroup>
				)
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