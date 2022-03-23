// base
import React from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {}
}))

const LeaderBoard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      leader
    </div>
  )
}

export default LeaderBoard
