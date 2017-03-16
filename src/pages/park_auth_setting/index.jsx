import React from 'react'
import { connect } from 'dva'
import {  } from 'antd'
import MTree from './tree'
import { myDispatch } from '../../utils'

const Main = ({dispatch, parkauthsetting}) => {
  const { areaAuthTree, selectedKeys } = parkauthsetting
  const treeProps = {
		areaAuthTree,
		selectedKeys,
		onAuthSel (key) {
			// myDispatch(dispatch, 'parkauthsetting/getDictItem', {search: {dictCode: key}, selectedKeys: [key]})
		}
	}

  return (
    <div className='content-inner'>
			<MTree {...treeProps}/>
		</div>
  )
}

export default connect(({parkauthsetting}) => ({parkauthsetting}))(Main)