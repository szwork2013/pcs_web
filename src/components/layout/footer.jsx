import React, {PropTypes} from 'react'
import styles from './layout.less'
import { config } from '../../utils'

const Footer = props => {
	return (
		<div className={styles.footer}>
			{config.footerText}
		</div>
	)
}

Footer.propTypes = {
	
}

export default Footer