import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatSex, formatUserType, formatSysUserStatus } from '../../utils/format'
import { Button, Popconfirm } from 'antd'

const ButtonGroup = Button.Group

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange, onDel, onEdit}) => {
  const columns = [
    {
			title: '姓名',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: '手机号',
			dataIndex: 'phone',
			key: 'phone'
		},
    {
			title: '邮箱',
			dataIndex: 'email',
			key: 'email'
		},
    {
			title: '登录名',
			dataIndex: 'loginName',
			key: 'loginName'
		},
    {
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			render: text => formatSex(text)
		},
    {
			title: '用户类别',
			dataIndex: 'userType',
			key: 'userType',
			render: text => formatUserType(text)
		},
    {
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: text => formatSysUserStatus(text)
		},
		{
			title: '操作',
			dataIndex: 'oper',
			key: 'oper',
			render (text, row) {
				let del = <div></div>
				if (row.status !== 'aa') {
					del = <Popconfirm title = '确认删除该账户么?' onConfirm = {() => onDel(row.id)}>
									<Button type='danger' size='small'>删除</Button>
								</Popconfirm>
				}
				return (
					<ButtonGroup>
						<Button type='primary' size='small' onClick={() => onEdit(row.id) }>编辑</Button>
						{del}
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