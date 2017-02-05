import React, {PropTypes} from 'react'
import MTable from '../../components/table'

const Table = props => {
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
			key: 'sex'
		},
    {
			title: '用户类别',
			dataIndex: 'userType',
			key: 'userType'
		},
    {
			title: '状态',
			dataIndex: 'status',
			key: 'status'
		},
    {
			title: '备注',
			dataIndex: 'brief',
			key: 'brief'
		}
  ]

  const tableProps = {
    columns,
    loading: false,
    current: 1,
    total: 12,
    dataSource: [
      {
        "unicode": "11111111",
        "brief": "vvvvvvvvvvv"
      },
      {
        "unicode": "11111111",
        "brief": "vvvvvvvvvvv"
      },
      {
        "unicode": "11111111",
        "brief": "vvvvvvvvvvv"
      },
      {
        "unicode": "11111111",
        "brief": "vvvvvvvvvvv"
      },
      {
        "unicode": "11111111",
        "brief": "vvvvvvvvvvv"
      },
      {
        "unicode": "11111111",
        "brief": "vvvvvvvvvvv"
      }
    ],
    onChange (page) {

    }
  }

  return (
    <MTable {...tableProps}/>
  )
}

Table.propTypes = {
  
}

export default Table