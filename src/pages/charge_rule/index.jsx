import React from 'react'
import { connect } from 'dva'
import { Row, Col, Button } from 'antd'
import MTree from '../../components/tree'
import MTable from './table'
import MModal from './modal'
import { defaultTableProps, myDispatch, defaultModalProps, message_box } from '../../utils'

const Main = ({dispatch, chargerule, common}) => {
  const {selectKeys, detalModalType, detailItem, selectTree, rule_type, loading, detailDataSource, currentItem, detalModalVisible} = chargerule
  const {parkAreaTree, ruleTypes, carTypes} = common
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
      myDispatch(dispatch, 'common/getCarTypeDict')
      myDispatch(dispatch, 'common/getRuleTypeDict')
      myDispatch(dispatch, 'chargerule/getOne', {id})
    }
  })
  const modalProps = defaultModalProps(chargerule, {
    dispatch,
    rule_type,
    ruleTypes,
    carTypes,
    loading,
    detailItem,
    detalModalType,
    detalModalVisible,
    area_id: selectTree,
    dataSource: detailDataSource,
    onCancel () {
      myDispatch(dispatch, 'chargerule/hideModal')
    },
    onOk (data) {
      if (data.main.id) {
        myDispatch(dispatch, 'chargerule/update', {data})
      } else {
        myDispatch(dispatch, 'chargerule/create', {data})
      }
    }
  })
  const btnAdd = () => {
    if (!selectTree) {
      message_box.warnBox('请选择需要添加规则的停车场', 3)
      return
    }
    myDispatch(dispatch, 'common/getCarTypeDict')
    myDispatch(dispatch, 'common/getRuleTypeDict')
    myDispatch(dispatch, 'chargerule/showModal', {modalType: 'create'})
  }
  return (
    <div className='content-inner'>
      <Row>
        <Button type='primary' style={{marginBottom: 8}} onClick={btnAdd}>添加规则</Button>
      </Row>
      <Row>
        <Col span={4}><MTree {...treeProps}/></Col>
        <Col span={20}><MTable {...tableProps}/></Col>
      </Row>
      <MModal {...modalProps}/>
    </div>
  )
}

export default connect(({chargerule, common}) => ({chargerule, common}))(Main)