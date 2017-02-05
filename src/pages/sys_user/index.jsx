import React, {PropTypes} from 'react'
import Table from './table'
import MSearch from '../../components/search'

const SysUser = props => {
  return (
    <div>
    <MSearch style={{width: 200, marginBottom: 16}}/>
      <Table/>
    </div>
  )
}

SysUser.propTypes = {
  
}

export default SysUser