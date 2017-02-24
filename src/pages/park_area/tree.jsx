import React, {PropTypes} from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({areas, onAreaSelect}) => {
	const Nodes = areas.map(item => {
		if (!item.children) {
			return (
				<TreeNode title={item.title} key={`${item.key}-${item.title}`}/>
			)
		}
		const ChildNodes = item.children.map(child => {
			return (
				<TreeNode title={child.title} key={`${child.key}-${child.title}`}/>
			)
		})
		return (
			<TreeNode title={item.title} key={`${item.key}-${item.title}`}>
				{ChildNodes}
			</TreeNode>
		)
	})

	const treeProps = {
		defaultExpandAll: true,
		onSelect (keys) {
			if (!keys || keys.length === 0) {
				onAreaSelect({})
			} else {
				let temp = keys[0].split('-')
				onAreaSelect({key: temp[0], title: temp[1]})
			}
		}
	}

	return (
		<div>
			{ areas.length === 0 ? <span>暂无数据</span> : <Tree {...treeProps}>{Nodes}</Tree> }			
		</div>
	)
}

MTree.propTypes = {
	
}

export default MTree