import React from 'react'
import { Modal, Transfer } from 'antd'

const RoleUserSettingModal = ({visible, onCancel, onOk, menus, checkMenus, onMenuCheck, onSave}) => {
	const test = [
		{
			key: '3',
			title: 'ddd'
		}
	]
	const modalProps = {
		title: '用户角色管理',
		visible,
		onCancel,
		onOk: onSave,
		width: 440,
		wrapClassName: 'vertical-center-modal'
	}

	return (
		<Modal {...modalProps}>
			<Transfer
        dataSource={test}
        titles={['角色列表', '已选择']}
        render={item => item.title}
      />
		</Modal>
	)
}

export default RoleUserSettingModal