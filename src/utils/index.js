import config from './config'
import classnames from 'classnames'
// import menu from './menu'
import * as validation from './validation'
import * as message_box from './message_box'

const myDispatch = (dispatch, type, payload) => {
  dispatch({type: type, payload})
}

const formItemLayout = (labelCol, wrapperCol) => {
  return {
		labelCol: {
			span: labelCol || 6
		},
		wrapperCol: {
			span: wrapperCol || 14
		}
	}
}

const defaultTableProps = (model, extend) => {
  const {total, dataSource, loading, pageIndex, pageSize} = model
  return {
    total,
    dataSource,
    loading,
    pageIndex,
    pageSize,
    ...extend
  }
}

const defaultModalProps = (model, extend) => {
  const {modalType, currentItem, modalVisible} = model
  return {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    ...extend
  }
}

module.exports = {
  config,
  classnames,
  myDispatch,
  formItemLayout,
  defaultTableProps,
  defaultModalProps,
  validation,
  message_box
}