import React, {PropTypes} from 'react'
import { Dropdown, Menu, Alert } from 'antd'
import styles from './index.less'

const TopPanel = ({selectTree}) => {
	selectTree = selectTree || {}

	function handleButtonClick(e) {

	}

	function handleMenuClick(e) {

	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="del_area" style={{width: 115}}>删除停车场</Menu.Item>
			<Menu.Item key="add_channel">添加通道</Menu.Item>
			<Menu.Item key="del_channel">删除通道</Menu.Item>
		</Menu>
	)
	return (
		<div>
			<Dropdown.Button type='primary' overlay={menu} className={styles.topBtn}>
				添加停车场
			</Dropdown.Button>
			<Alert message={`已选择：${selectTree.title || ''}`} type="success" />
		</div>
	)
}

TopPanel.propTypes = {
	
}

export default TopPanel