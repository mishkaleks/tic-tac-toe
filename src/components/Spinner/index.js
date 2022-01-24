// base
import React from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  crossIcon: {
    width: '132px',
    height: '132px',
    animation: '$crossPulse 2s linear infinite',
    WebkitAnimation: '$crossPulse 2s linear infinite'
  },
  '@keyframes crossPulse': {
    '0%': {
      width: '132px'
    },
    '25%': {
      width: '99px'
    },
    '50%': {
      width: '66px'
    },
    '75%': {
      width: '99px'
    },
    '100%': {
      width: '132px'
    },
  },
  zeroIcon: {
    width: '132px',
    height: 'auto',
    animation: '$zeroPulse 2s linear infinite',
    WebkitAnimation: '$zeroPulse 2s linear infinite'
  },
  '@keyframes zeroPulse': {
    '0%': {
      width: '66px'
    },
    '25%': {
      width: '99px'
    },
    '50%': {
      width: '132px'
    },
    '75%': {
      width: '99px'
    },
    '100%': {
      width: '66px'
    },
  }
}))

const Spinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <IconCross className={classes.crossIcon} />
      <IconZero className={classes.zeroIcon} />
    </div>
  )
}

export default Spinner
