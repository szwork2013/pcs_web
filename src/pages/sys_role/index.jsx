import React from 'react'
import { connect } from 'dva'
import SearchPanel from '../../components/search_panel'
import Table from './table'
import Modal from './modal'
import MenuSettingModal from '../sys_role_menu/menu_setting_modal'

const SysRole = ({dispatch, sysrole}) => {
  const { dataSource, loading, currentItem, modalType, modalVisible, currentKey, menuSettingVisible, menus, checkMenus, roleNameValid} = sysrole
  const searchProps = {
    placeholder: '角色名',
    onSearch (data) {
      dispatch({type: 'sysrole/getList', payload: {roleName: data.keyword}})
    },
    onAdd () {
      dispatch({type: 'sysrole/showModal', payload: {modalType: 'create', currentKey: null}})
    }
  }

  const modalProps = {
    dispatch,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    roleNameValid,
    currentKey,
    onOk (data) {
      if (currentKey) {
        data.id = currentKey
        dispatch({type: 'sysrole/update', payload: {data}})
      } else {
        dispatch({type: 'sysrole/create', payload: {data}})
      }      
    },
    onCancel () {
      dispatch({type: 'sysrole/hideModal'})
    }
  }

  const tableProps = {
    dataSource,
    loading,
    onStatusChange (id, status) {
      dispatch({type: 'sysrole/update', payload: {data: {id, status}}})
    },
    onEdit (data) {
      dispatch({type: 'sysrole/showModal', payload: {currentKey: data.id, currentItem: data, modalType: 'edit'}})
    },
    onMenuSetting (data) {
      dispatch({type: 'sysrole/getMenuTree', payload: {roleId: data.id}})
      dispatch({type: 'sysrole/showMenuSetting'})
    }
  }
  const menuSettingProps = {
    visible: menuSettingVisible,
    menus,
    checkMenus,
    onCancel () {
      dispatch({type: 'sysrole/hideMenuSetting'})
    },
    onMenuCheck (keys) {
      dispatch({type: 'sysrole/common', payload: {checkMenus: keys}})
    },
    onSave () {
      dispatch({type: 'sysrole/saveMenus', payload: {menuIds: checkMenus, roleId: currentKey}})
    }
  }

  return (
    <div className='content-inner'>
      <SearchPanel {...searchProps}/>
      <Table {...tableProps}/>
      <Modal {...modalProps}/>
      <MenuSettingModal {...menuSettingProps}/>
    </div>
  )
}

export default connect(({sysrole}) => ({sysrole}))(SysRole)