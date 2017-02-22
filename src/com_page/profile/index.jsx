import React from 'react'
import { Card, Row, Col, Button } from 'antd'
import { formatSex } from '../../utils/format'

const Profile = props => {
  const user = JSON.parse(localStorage.getItem('pcs_user'))

  return (
    <div>
      <Row>
        <Col lg={{span: 8, offset: 8}} md={{span: 10, offset: 7}} sm={{span: 24}} xs={{span: 24}}>
          <Card>
            <img src='http://difang.kaiwind.com/zhejiang/jctp/201407/18/W020140718488039321020.jpg' style={{width: '100%', height: 300, marginBottom: 16}}/>
            <h3>用户名：{user.userName}</h3>
            <br/>
            <h3>手机号：{user.phone}</h3>
            <br/>
            <h3>邮箱：{user.email}</h3>
            <br/>
            <h3>性别：{formatSex(user.sex)}</h3>
            <br/>
            <Row type="flex" justify="start">
              {/*<Button type='primary' style={{marginRight: 16}}>信息修改</Button>*/}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile 