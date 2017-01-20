import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Card, Form, Input, Icon, Button, Checkbox, Spin } from 'antd'

const Login = () => {
  return (
    <div>
    dddd
    </div>
  )
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps ({ auth }) {
  return { auth }
}


export default connect(mapStateToProps)(Form.create()(Login))