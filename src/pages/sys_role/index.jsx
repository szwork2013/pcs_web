import React from 'react'
import { connect } from 'dva'
import RoleTree from './role_tree'

const SysRole = props => {
  return (
    <div className='content-inner'>
      <RoleTree></RoleTree>
    </div>
  )
}

export default connect()(SysRole)