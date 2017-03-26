import React, {PropTypes} from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({trees, selectKeys, onSelect}) => {
	selectKeys = selectKeys || []
	const genTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={`${item.title}`} key={`${item.key}`}>
          {genTreeNodes(item.children)}
        </TreeNode>
      )
    }
		return (<TreeNode title={`${item.title}`} key={`${item.key}`}/>)
  })

	const treeProps = {
		defaultExpandAll: true,
		selectedKeys: selectKeys,
		onSelect
	}

	return (
		<div>
			{ !trees || trees.length === 0 ? <span>暂无数据</span> : <Tree {...treeProps}>{genTreeNodes(trees)}</Tree> }			
		</div>
	)
}

export default MTree