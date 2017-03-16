import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({areaAuthTree, selectedKeys, onAuthSel}) => {
  const genTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={`${item.title}`} disabled={item.type === 'area'} key={`${item.key}`}>
          {genTreeNodes(item.children)}
        </TreeNode>
      )
    }
		return (<TreeNode title={`${item.title}`} disabled={item.type === 'area'} key={`${item.key}`}/>)
  })
  const treeProps = {
		defaultExpandAll: true,
		selectedKeys,
		onSelect (keys) {
			if (!keys || keys.length === 0) {
				return
			} else {
				onAuthSel(keys[0])
			}
		}
	}

  return (
    <div>
      { areaAuthTree.length === 0 ? <span>暂无数据</span> : <Tree {...treeProps}>{genTreeNodes(areaAuthTree)}</Tree> }
    </div>
  )
}

export default MTree