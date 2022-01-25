// base
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// material-ui
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'

// components
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'

const useStyles = makeStyles(() => ({
  buttonRoot: {
    width: '84px',
    height: '84px',
    borderRadius: '0px !important'
  },
  icon: {
    width: '66px',
    height: '66px'
  }
}))

const Box = (props) => {
  const { field, handleMarkField } = props
  const { id, value, customButtonRoot = {} } = field

  const classes = useStyles()

  const getChip = (value) => {
    switch (value) {
      case 'x':
        return <IconCross classes={classes.icon} />
      case 'o':
        return <IconZero classes={classes.icon} />
      default:
        return ''
    }
  }
  const chip = getChip(value)

  return (
    <Button
      onClick={handleMarkField(id)}
      classes={{ root: classNames(classes.buttonRoot, customButtonRoot) }}
    >
      {chip}
    </Button>
  )
}

Box.propTypes = {
  field: PropTypes.object.isRequired,
  handleMarkField: PropTypes.func.isRequired
}

export default Box
