import React, {PropTypes} from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './layout.less'
import Menus from './menu'

const SubMenu = Menu.SubMenu

const Header = ({user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover}) => {
	let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location
  }

	return (
		<div className={styles.header}>
      {isNavbar
        ? <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger='click' content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type='bars' />
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}

      <Menu className='header-menu' mode='horizontal' onClick={handleClickMenu}>
        <SubMenu style={{
          float: 'right'
        }} title={< span > <Icon type='user' />
          {user.userName} < /span>}>
          <Menu.Item key='logout'>
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
	)
}

Header.propTypes = {
	
}

export default Header