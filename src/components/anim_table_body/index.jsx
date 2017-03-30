import React, { PropTypes } from 'react'
import { TweenOneGroup } from 'rc-tween-one'

const AnimTableBody = ({ body, page = 1 }) => {
  if (page !== 1) {
    return body
  }

  return (
    <TweenOneGroup component='tbody' className={body.props.className}>
        {body.props.children}
    </TweenOneGroup>
  )
}

AnimTableBody.propTypes = {
  body: PropTypes.element,
  page: PropTypes.any
}

export default AnimTableBody