// base
import React, { useState } from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import Box from './Box'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '252px',
    padding: '30px',
    borderRadius: '20px',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '3px 4px 16px rgba(16, 20, 106, 0.09)'
  },
  customButtonRoot1: {
    borderRight: `1px solid ${theme.palette.color.light} !important`,
    borderBottom: `1px solid ${theme.palette.color.light} !important`
  },
  customButtonRoot2: {
    borderBottom: `1px solid ${theme.palette.color.light} !important`
  },
  customButtonRoot3: {
    borderRight: `1px solid ${theme.palette.color.light} !important`
  }
}))

const GameScreen = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    fields: [
      {
        id: 0,
        value: '',
        customButtonRoot: classes.customButtonRoot1
      },
      {
        id: 1,
        value: '',
        customButtonRoot: classes.customButtonRoot1
      },
      {
        id: 2,
        value: '',
        customButtonRoot: classes.customButtonRoot2
      },
      {
        id: 3,
        value: '',
        customButtonRoot: classes.customButtonRoot1
      },
      {
        id: 4,
        value: '',
        customButtonRoot: classes.customButtonRoot1
      },
      {
        id: 5,
        value: '',
        customButtonRoot: classes.customButtonRoot2
      },
      {
        id: 6,
        value: '',
        customButtonRoot: classes.customButtonRoot3
      },
      {
        id: 7,
        value: '',
        customButtonRoot: classes.customButtonRoot3
      },
      {
        id: 8,
        value: ''
      }
    ],
    // pointer indicating which player should move next
    isNextMove: true
  })
  const { fields, isNextMove } = state

  const handleMarkField = (id) => () => {
    const chip = isNextMove ? 'x' : 'o'

    if (fields[id].value === '') {
      fields[id].value = chip
    }
    // player move change
    setState({ ...state, isNextMove: !isNextMove })
  }

  return (
    <div className={classes.root}>
      {
        fields.map((field, index) => {
          return (
            <Box key={index} field={field} handleMarkField={handleMarkField} />
          )
        })
      }
    </div>
  )
}

export default GameScreen
