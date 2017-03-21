import React from 'react'
import { Modal } from 'antd'

const MModal = ({visible, capture_img, onCancel}) => {
  const modalProps = {
		title: '图片查看',
		visible,
		onOk: onCancel,
		onCancel,
		afterClose () {
			resetFields()
		},
		wrapClassName: 'vertical-center-modal'
	}
  return (
    <Modal {...modalProps}>
      <img src={capture_img} style={{width: '100%', height: '100%'}}/>
    </Modal>
  )
}

export default MModal