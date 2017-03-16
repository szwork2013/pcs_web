import React, {PropTypes} from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({areas, selectedKeys, onAreaSelect}) => {
	const genTreeNodes = data => data.map(item => {
		let type = item.type === 'area' ? '停车场' : '通道'
    if (item.children) {
      return (
        <TreeNode title={`${item.title}(${type})`} key={`${item.key}-${item.type}-${item.title}`}>
          {genTreeNodes(item.children)}
        </TreeNode>
      )
    }
		return (<TreeNode title={`${item.title}(${type})`} key={`${item.key}-${item.type}-${item.title}`}/>)
  })

	const treeProps = {
		defaultExpandAll: true,
		selectedKeys,
		onSelect (keys) {
			if (!keys || keys.length === 0) {
				return
			} else {
				onAreaSelect(keys)
			}
		}
	}

	return (
		<div>
			{ areas.length === 0 ? <span>暂无数据</span> : <Tree {...treeProps}>{genTreeNodes(areas)}</Tree> }			
		</div>
	)
}

MTree.propTypes = {
	
}

export default MTree