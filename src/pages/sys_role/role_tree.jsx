import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

const RoleTree = props => {
  return (
    <Tree>
      <TreeNode title='admin' key='admin' ></TreeNode>
      <TreeNode title='admin' key='admin1' ></TreeNode>
      <TreeNode title='admin' key='admin2' ></TreeNode>
      <TreeNode title='admin' key='admin3' ></TreeNode>
      <TreeNode title='admin' key='admin4' ></TreeNode>
      <TreeNode title='admin' key='admin5' ></TreeNode>
      <TreeNode title='admin' key='admin6' ></TreeNode>
    </Tree>
  )
}

export default RoleTree