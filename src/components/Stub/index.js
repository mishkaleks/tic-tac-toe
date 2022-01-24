// base
import React from 'react'

// material-ui
// hook pattern
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'

// components
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'
import PageBg from '../../public/pc_page_bg.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: `url(${PageBg})`,
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: 'center center !important',
    backgroundSize: 'cover !important'
  },
  wrContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '132px',
    height: '132px'
  },
  title: {
    color: theme.palette.baseFont.main
  }
}))

const Stub = () => {
  // his returned hook useStyles
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.wrContent}>
        <div>
          <IconCross className={classes.icon} />
          <IconZero className={classes.icon} />
        </div>
        <Typography variant="h3" component="div" className={classes.title}>Open the app on your phone</Typography>
      </div>
    </div>
  )
}

export default Stub
