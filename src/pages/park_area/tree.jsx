import React, {PropTypes} from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({areas, onAreaSelect}) => {
	const Nodes = areas.map(item => {
		let type = item.type === 'area' ? '停车场' : '通道'
		if (!item.children) {
			return (
				<TreeNode title={`${item.title}(${type})`} key={`${item.key}-${item.type}-${item.title}`}/>
			)
		}
		const ChildNodes = item.children.map(child => {
			let type = child.type === 'area' ? '停车场' : '通道'
			let title = `${child.title}（${type}）`
			return (
				<TreeNode title={title} key={`${child.key}-${child.type}-${child.title}`}/>
			)
		})
		return (
			<TreeNode title={`${item.title}(${type})`} key={`${item.key}-${item.type}-${item.title}`}>
				{ChildNodes}
			</TreeNode>
		)
	})

	const treeProps = {
		defaultExpandAll: true,
		onSelect (keys) {
			if (!keys || keys.length === 0) {
				onAreaSelect()
			} else {
				let temp = keys[0].split('-')
				onAreaSelect({key: temp[0], type: temp[1], title: temp[2]})
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