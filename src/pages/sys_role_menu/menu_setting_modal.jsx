import React from 'react'
import { Modal, Tree } from 'antd'

const TreeNode = Tree.TreeNode
const MenuSettingModal = ({visible, onCancel, onOk, menus, checkMenus, onMenuCheck, onSave}) => {
	const modalProps = {
		title: '菜单管理',
		visible,
		onCancel,
		onOk: onSave,
		wrapClassName: 'vertical-center-modal'
	}

	const Nodes = menus.map(item => {
		if (!item.children) {
			return (
				<TreeNode title={item.title} key={item.key}/>
			)
		}
		const ChildNodes = item.children.map(child => {
			return (
				<TreeNode title={child.title} key={child.key}/>
			)
		})
		return (
			<TreeNode title={item.title} key={item.key}>
				{ChildNodes}
			</TreeNode>
		)
	})

	const treeProps = {
		showLine: true,
		checkable: true,
		checkedKeys: checkMenus,
		expandedKeys: menus.map(item => item.key),
		onCheck (keys) {
			onMenuCheck(keys)
		}
	}

	return (
		<Modal {...modalProps}>
			<Tree {...treeProps}>
				{Nodes}
			</Tree>
		</Modal>
	)
}

export default MenuSettingModal