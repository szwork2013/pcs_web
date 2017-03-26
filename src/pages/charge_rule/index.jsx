import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import MTree from '../../components/tree'
import MTable from './table'
import MModal from './modal'
import { defaultTableProps, myDispatch, defaultModalProps } from '../../utils'

const Main = ({dispatch, chargerule, common}) => {
  const {selectKeys, selectTree} = chargerule
  const {parkAreaTree} = common
  const treeProps = {
    trees: parkAreaTree,
    selectKeys,
    onSelect (keys) {
      if (!keys || keys.length ===0) {
        return
      }
      myDispatch(dispatch, 'chargerule/common', {selectTree: keys[0], selectKeys: keys})
      myDispatch(dispatch, 'chargerule/get', {area_id: keys[0]})
    }
  }
  const tableProps = defaultTableProps(chargerule, {
    onDel (id) {
      myDispatch(dispatch, 'chargerule/remove', {id, selectTree})
    },
    onEdit (id) {
      myDispatch(dispatch, 'chargerule/getOne', {id, selectTree})
    }
  })
  const modalProps = defaultModalProps(chargerule, {
    onCancel () {
      myDispatch(dispatch, 'chargerule/hideModal')
    }
  })
  return (
    <div className='content-inner'>
      <Row>
        <Col span={4}><MTree {...treeProps}/></Col>
        <Col span={20}><MTable {...tableProps}/></Col>
      </Row>
      <MModal {...modalProps}/>
    </div>
  )
}

export default connect(({chargerule, common}) => ({chargerule, common}))(Main)