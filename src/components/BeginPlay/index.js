// base
import React, { useState } from 'react'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import GameScreen from '../GameScreen'
import InitPlayer from '../InitPlayer'
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'

const useStyles = makeStyles(() => ({
  icon: {
    width: '132px',
    height: '132px'
  }
}))

const BeginPlay = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    lastStep: false,
    showGameBoard: false,
    initError: false,
    firstName: '',
    secondName: ''
  })
  const { lastStep, showGameBoard, initError, firstName, secondName } = state

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

  return (
    <div>
      {
        showGameBoard
          ? <GameScreen />
          : <InitPlayer formData={formData} handleClick={handleClick} handleChangeName={handleChangeName} />
      }
    </div>
  )
}

export default BeginPlay
