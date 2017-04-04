import React from 'react'
import Table from './table'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import Modal from './modal'
// import RoleUserSettingModal from '../sys_role_user/role_user_setting'

const SysUser = ({dispatch, sysuser, common}) => {
  const { total, search, pageIndex, pageSize, dataSource, loading, currentItem, modalType, modalVisible, currentKey, loginNameValid, phoneValid} = sysuser
  const { roleList } = common

  const searchProps = {
    placeholder: '姓名、登录名或手机号',
    onSearch (data) {
      dispatch({type: 'sysuser/getList', payload: {pageIndex: 1, pageSize, search: {key: data.keyword}}})
    },
    onAdd () {
      dispatch({type: 'sysuser/showModal', payload: {modalType: 'create', currentKey: null}})
      dispatch({type: 'common/getRoleList'})
    }
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    roleList,
    loginNameValid,
    phoneValid,
    dispatch,
    currentKey,
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
      dispatch({type: 'sysuser/getList', payload: {pageIndex: page, pageSize, search}})
    },
    onDel (id) {
      dispatch({type: 'sysuser/del', payload: {id}})
    },
    onEdit (id) {
      dispatch({type: 'sysuser/getOne', payload: {id}})
      dispatch({type: 'common/getRoleList'})
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