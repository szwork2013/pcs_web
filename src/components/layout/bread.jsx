import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styles from './layout.less'
// import { menu } from '../../utils'

const Bread = ({ location, userMenus }) => {
  let pathSet = []
  const getPathSet = (menuArray, parentPath) => {
    menuArray = menuArray || []
    menuArray.map(item => {
      pathSet.push({
        key: item.key,
        path: item.href,
        name: item.name,
        icon: item.icon || ''
      })
      if (item.child) {
        getPathSet(item.child, item.href + '/')
      }
    })
  }
  getPathSet(userMenus)
  let pathNames = []
  location.pathname.substr(1).split('/').map((item) => {
    if (item !== '') {
      pathNames.push(item)
    }
  })

  let temp = []
  const tempBread = pathNames.map((item, key) => {
    pathSet.map(menu => {
      if (menu.path === item) {
        temp.push(menu)
      }
    })
  })

  const Breads = temp.map((item, key) => {
    return (
        <Breadcrumb.Item key={key}>
          {item.icon
            ? <Icon type={item.icon} />
            : ''}
          <span>{item.name}</span>
        </Breadcrumb.Item>
      )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item href='#/'><Icon type='home' />
          <span>主页</span>
        </Breadcrumb.Item>
        {Breads}
      </Breadcrumb>  
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object
}

export default Bread
