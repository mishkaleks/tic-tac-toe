// base
import React, { useState, useEffect } from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import Spinner from '../Spinner'
import BeginPlay from '../BeginPlay'
import PageBg from '../../public/mobile_page_bg.png'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: `url(${PageBg})`,
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: 'center center !important',
    backgroundSize: 'cover !important'
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
