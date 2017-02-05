import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styles from './layout.less'
import { menu } from '../../utils'

let pathSet = []
const getPathSet = (menuArray, parentPath) => {
  menuArray = menuArray || []
  parentPath = parentPath || '/'
  menuArray.map(item => {
    pathSet[(parentPath + item.key)] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined
    }
    if (item.child) {
      getPathSet(item.child, parentPath + item.key + '/')
    }
  })
}
getPathSet(menu)

const Bread = ({ location }) => {
  let pathNames = []
  location.pathname.substr(1).split('/').map((item, key) => {
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + item))
    } else {
      pathNames.push((item))
    }
  })
  let temp = []
  const tempBread = pathNames.map((item, key) => {
    if (pathSet[temp] !== undefined) {
      temp.push(item)
    }
  })

  const breads = temp.map((item, key) => {
    return (
        <Breadcrumb.Item key={key} {...((pathNames.length - 1 === key) || !pathSet[item].clickable) ? '' : { href: '#' + pathSet[item].path }}>
          {pathSet[item].icon
            ? <Icon type={pathSet[item].icon} />
            : ''}
          <span>{pathSet[item].name}</span>
        </Breadcrumb.Item>
      )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item href='#/'><Icon type='home' />
          <span>主页</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object
}

export default Bread
