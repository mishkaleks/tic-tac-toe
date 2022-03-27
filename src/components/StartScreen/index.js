// base
import React, { useState, useEffect } from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import Spinner from '../Spinner'
import BeginPlay from '../BeginPlay'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }
}))

const StartScreen = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    isLoading: true
  })
  const { isLoading } = state

  useEffect(() => {
    // artificial spinner
    setTimeout(() => {
      setState(state => ({
        ...state, isLoading: false
      }))
    }, 3000)
  }, [])

  return (
    <div className={classes.root}>
      {isLoading ? <Spinner /> : <BeginPlay />}
    </div>
  )
}

export default StartScreen
