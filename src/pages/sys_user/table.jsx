import React, {PropTypes} from 'react'
import MTable from '../../components/table'
import { formatSex, formatUserType, formatSysUserStatus } from '../../utils/format'

const Table = ({loading, pageIndex, pageSize, total, dataSource, onPageChange}) => {
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