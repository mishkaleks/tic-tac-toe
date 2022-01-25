// base
import React from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import GameBoard from '../GameBoard'

const useStyles = makeStyles(() => ({
  root: {}
}))

const GameScreen = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GameBoard />
    </div>
  )
}

export default GameScreen
