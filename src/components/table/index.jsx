import React, {PropTypes} from 'react'
import { Table } from 'antd'
// import AnimTableBody from '../anim_table_body'

const DTable = ({columns, total, pageIndex, loading, pageSize, dataSource, onChange, rowKey, showPage = true, expandedRowRender}) => {
  const pagination = showPage ? {
		total,
		pageSize: pageSize || 10,
		defaultCurrent: 1,
		onChange,
		current: pageIndex,
		showTotal (total) {
			return `每页 ${pagination.pageSize} 条， 总共 ${total} 条数据`
		}
	} : false

  // const getBodyWrapperProps = {
  //   page: pageIndex
  // }

  // const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }
  return (
    <Table
      expandedRowRender={expandedRowRender}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
      scroll={{ x: 768 }}
      size='small'
      bordered={true}
      /*getBodyWrapper={getBodyWrapper}*/
      />
  )
}

DTable.propTypes = {
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default DTable