import React, {PropTypes} from 'react'
import { Button, Alert } from 'antd'
import styles from './index.less'

const TopPanel = ({selectTree}) => {
	selectTree = selectTree || {}
	return (
		<div>
			<Button type='primary' className={styles.topBtn}>添加停车场</Button>
			<Button type='danger' className={styles.topBtn}>删除停车场</Button>
			{/*<Button type='primary' className={styles.topBtn}>添加通道</Button>
			<Button type='danger' className={styles.topBtn}>删除通道</Button>*/}
			<Alert message={`已选择：${selectTree.title || ''}`} type="success" />
		</div>
	)
}

TopPanel.propTypes = {
	
}

export default TopPanel