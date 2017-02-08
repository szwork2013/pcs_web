import React, {PropTypes} from 'react'
import { Icon, Switch } from 'antd'
import { config } from '../../utils'
import styles from './layout.less'
import Menus from './menu.js'

const Sider = ({ siderFold, darkTheme, location, changeTheme, userMenus }) => {
	const menusProps = {
    siderFold,
    darkTheme,
    location,
    userMenus
  }
	return (
		<div>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type='bulb' />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
      </div> : ''}
    </div>
	)
}

Sider.propTypes = {
	
}

export default Sider