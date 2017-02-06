import React, {PropTypes} from 'react'
import { Table } from 'antd'

const DTable = ({columns, total, pageIndex, loading, pageSize, dataSource, onChange, rowKey}) => {
  const pagination = {
		total,
		pageSize: pageSize || 10,
		defaultCurrent: 1,
		onChange,
		current: pageIndex,
		showTotal (total) {
			return `每页 ${pagination.pageSize} 条， 总共 ${total} 条数据`
		}
	}

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
      scroll={{ x: 768 }}
      size='middle'
      bordered={true}/>
  )
}

DTable.propTypes = {
  columns: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DTable