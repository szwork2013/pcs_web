import React from 'react'
import Table from './table'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import Modal from './modal'
// import RoleUserSettingModal from '../sys_role_user/role_user_setting'

const SysUser = ({dispatch, sysuser, common}) => {
  const { total, pageIndex, pageSize, dataSource, loading, currentItem, modalType, modalVisible, currentKey} = sysuser
  const { roleList } = common

  const searchProps = {
    placeholder: '姓名、登录名或手机号',
    onSearch (data) {
      dispatch({type: 'sysuser/getList', payload: {pageIndex: 1, pageSize, key: data.keyword}})
    },
    onAdd () {
      dispatch({type: 'sysuser/openModal', payload: {modalType: 'create', currentKey: null}})
    }
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    roleList,
    onOk (data) {
      if (currentKey) {
        data.id = currentKey
        dispatch({type: 'sysuser/update', payload: {data}})
      } else {
        dispatch({type: 'sysuser/create', payload: {data}})
      }      
    },
    onCancel () {
      dispatch({type: 'sysuser/hideModal'})
    }
  }

  const tableProps = {
    total,
    dataSource,
    loading,
    pageIndex,
    pageSize,
    onPageChange (page) {
      dispatch({type: 'sysuser/getList', payload: {pageIndex: page, pageSize}})
    },
    onDel (id) {
      dispatch({type: 'sysuser/del', payload: {id}})
    },
    onEdit (id) {
      dispatch({type: 'sysuser/getOne', payload: {id, modalType: 'edit'}})
    },
    onResetPwd (id) {
      dispatch({type: 'sysuser/resetPwd', payload: {id}})
    }
  }
  // const roleUserSettingProps = {
  //   visible: roleUserModalVisible,
  //   onCancel () {
  //     dispatch({type: 'sysuser/hideRoleUserSetting'})
  //   },
  //   onMenuCheck (keys) {
  //     dispatch({type: 'sysuser/common', payload: {checkMenus: keys}})
  //   },
  //   onSave () {
  //     dispatch({type: 'sysuser/saveMenus', payload: {menuIds: checkMenus, roleId: currentKey}})
  //   }
  // }

  return (
    <div className='content-inner'>
      <SearchPanel {...searchProps}/>
      <Table {...tableProps}/>
      <Modal {...modalProps}/>
      {/*<RoleUserSettingModal {...roleUserSettingProps}/>*/}
    </div>
  )
}

export default connect(({sysuser, common}) => ({sysuser, common}))(SysUser)