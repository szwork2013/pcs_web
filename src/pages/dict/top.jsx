import React, { PropTypes } from 'react'
import { Button } from 'antd'

const Top = ({onAdd}) => {
  return (
    <Button type='primary' style={{marginBottom: 8}} onClick={onAdd}>添加字典项</Button>
  )
}

Top.propTypes = {
  
}

export default Top