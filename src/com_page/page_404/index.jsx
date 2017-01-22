import React, {PropTypes} from 'react'
import {Icon} from 'antd'
import styles from './index.less'

const Page404 = props => {
	return (
		<div className='content-inner'>
			<div className={styles.error}>
				<Icon type='frown-o' />
				<h1>404 Not Found</h1>
			</div>
		</div>
	)
}

Page404.propTypes = {
	
}

export default Page404