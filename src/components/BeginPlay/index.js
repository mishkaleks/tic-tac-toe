// base
import React, { useState } from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import GameScreen from '../GameScreen'
import InitPlayer from '../InitPlayer'
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'

// helpers
import { findWinner } from '../../helpers/findWinner'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  icon: {
    width: '132px',
    height: '132px'
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

const BeginPlay = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    lastStep: false,
    showGameBoard: false,
    initError: false,
    firstName: '',
    secondName: '',
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
    isNextMove: true,
    gameOver: false,
    message: ''
  })
  const { lastStep, showGameBoard, initError, firstName, secondName, fields, isNextMove, gameOver, message } = state

  const formData = lastStep
    ? {
      icon: <IconZero className={classes.icon} />,
      inputLabelText: 'Second player',
      buttonText: 'Let\'s play!',
      playerName: secondName,
      error: initError
    }
    : {
      icon: <IconCross className={classes.icon} />,
      inputLabelText: 'First player',
      buttonText: 'Continue',
      playerName: firstName,
      error: initError
    }

  const handleContinue = () => {
    if (firstName === '' || firstName.length < 4) {
      return setState({ ...state, initError: true })
    }
    return setState({ ...state, lastStep: true, initError: false })
  }

  const handlePlay = () => {
    if (secondName === '' || secondName.length < 4) {
      return setState({ ...state, initError: true })
    }
    return setState({ ...state, showGameBoard: true, initError: false })
  }
  const handleClick = lastStep ? handlePlay : handleContinue

  const handleChangeName = (e) => {
    const value = e.target.value

    lastStep
      ? setState({ ...state, secondName: value, initError: false })
      : setState({ ...state, firstName: value, initError: false })
  }

  const handleMarkField = (id) => () => {
    const chip = isNextMove ? 'x' : 'o'

    if (fields[id].value === '') {
      fields[id].value = chip
    }

    const winner = findWinner(fields)
    // game over if is there a winner
    if (winner) {
      return setState({ ...state, isNextMove: !isNextMove, gameOver: !gameOver, message: winner })
    }
    // player move change
    return setState({ ...state, isNextMove: !isNextMove })
  }

  const handleCloseModal = () => {
    setState({ ...state, gameOver: false })
  }

  return (
    <div className={classes.root}>
      {
        showGameBoard
          ? (
            <GameScreen
              fields={fields}
              isNextMove={isNextMove}
              gameOver={gameOver}
              message={message}
              handleMarkField={handleMarkField}
              handleCloseModal={handleCloseModal}
            />
          )
          : <InitPlayer formData={formData} handleClick={handleClick} handleChangeName={handleChangeName} />
      }
    </div>
  )
}

export default BeginPlay
