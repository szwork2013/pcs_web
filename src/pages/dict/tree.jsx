import React, {PropTypes} from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({dictIndexTree, selectedKeys, onAreaSelect}) => {
	const Nodes = dictIndexTree.map(item => {
		if (!item.children) {
			return (
				<TreeNode title={`${item.title}`} key={`${item.key}`}/>
			)
		}
		const ChildNodes = item.children.map(child => {
			return (
				<TreeNode title={`${child.title}`} key={`${child.key}`}/>
			)
		})
		return (
			<TreeNode title={`${item.title}`} key={`${item.key}`}>
				{ChildNodes}
			</TreeNode>
		)
	})

	const treeProps = {
		defaultExpandAll: true,
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
			{ dictIndexTree.length === 0 ? <span>暂无数据</span> : <Tree {...treeProps}>{Nodes}</Tree> }			
		</div>
	)
}

MTree.propTypes = {
	
}

export default MTree