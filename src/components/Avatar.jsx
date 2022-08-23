import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Avatar = ({ name }) => {
  const url = `https://ui-avatars.com/api/?name=${_.replace(name, ' ', '+')}&size=30`
  return (
        <img src={url} className="rounded-full"/>
  )
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired
}

export default Avatar
