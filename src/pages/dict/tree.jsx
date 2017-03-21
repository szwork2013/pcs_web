import React, {PropTypes} from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MTree = ({dictIndexTree, selectedKeys, onDictSelect}) => {
	/*const Nodes = dictIndexTree.map(item => {
		if (!item.children) {
			return (
				<TreeNode title={`${item.title}`} disabled key={`${item.key}`}/>
			)
		}
		const ChildNodes = item.children.map(child => {
			return (
				<TreeNode title={`${child.title}`} key={`${child.key}`}/>
			)
		})
		return (
			<TreeNode title={`${item.title}`} disabled key={`${item.key}`}>
				{ChildNodes}
			</TreeNode>
		)
	})*/
	const genTreeNodes = data => data.map(item => {
		let temp = item.key.split('-')
		let isSys = true
		if (temp.length === 2) {
			isSys = temp[1] === 'y'
		}
    if (item.children) {
      return (
        <TreeNode title={`${item.title}${isSys ? '' : '(可添加)'}`} disabled={item.type === 'type'} key={`${item.key}`}>
          {genTreeNodes(item.children)}
        </TreeNode>
      )
    }
		return (<TreeNode title={`${item.title}${isSys ? '' : '(可添加)'}`} disabled={item.type === 'type'} key={`${item.key}`}/>)
  })

	const treeProps = {
		defaultExpandAll: true,
		selectedKeys,
		onSelect (keys) {
			if (!keys || keys.length === 0) {
				return
			} else {
				onDictSelect(keys[0])
			}
		}
	}

	return (
		<div>
			{ dictIndexTree.length === 0 ? <span>暂无数据</span> : <Tree {...treeProps}>{genTreeNodes(dictIndexTree)}</Tree> }			
		</div>
	)
}

MTree.propTypes = {
	
}

export default MTree