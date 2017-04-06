import React, {PropTypes} from 'react'
import { Dropdown, Menu, Alert } from 'antd'
import styles from './index.less'

const TopPanel = ({selectTree, onOp}) => {
	selectTree = selectTree || {}

	function handleMenuClick(e) {
		onOp(e.key)
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="del_area" style={{width: 115}}>删除停车场</Menu.Item>
		</Menu>
	)
	const menuChannel = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="del_channel" style={{width: 115}}>删除通道</Menu.Item>
		</Menu>
	)
	return (
		<div>
			<Dropdown.Button type='primary' overlay={menu} className={styles.topBtn} onClick={() => onOp('add_area')}>
				添加停车场
			</Dropdown.Button>
			<Dropdown.Button type='primary' overlay={menuChannel} className={styles.topBtn} onClick={() => onOp('add_channel')}>
				添加通道
			</Dropdown.Button>
			<Alert message={`已选择：${selectTree.title || ''}`} type="success" />
		</div>
	)
}

TopPanel.propTypes = {
	
}

export default TopPanel