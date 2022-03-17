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
import { allFieldsClicked } from '../../helpers/allFieldsClicked'

// local storage
import { Storage } from '../../storage/storage'

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
    showGameBoard: false,
    lastStep: false,
    initError: false,
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
    pause: false,
    message: '',
    modalType: ''
  })
  const { showGameBoard, lastStep, initError, fields, isNextMove, pause, message, modalType } = state

  // create instance of storage object
  const storage = new Storage()
  const { firstName = '', secondName = '', crossPoints = 0, zeroPoints = 0, numberCrossWins = 0, numberZeroWins = 0,
    numberDraws = 0 } = storage.getData()

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

  // second step of player initialization
  const handleContinue = () => {
    if (firstName === '' || firstName.length < 4) {
      return setState({ ...state, initError: true })
    }
    return setState({ ...state, lastStep: true, initError: false })
  }

  // complete player initialization and start the game
  const handlePlay = () => {
    if (secondName === '' || secondName.length < 4) {
      return setState({ ...state, initError: true })
    }

    // load data from previous games from local storage
    const data = storage.getData()
    const newData = { ...data, showGameBoard: true }
    storage.update(newData)

    return setState({ ...state, showGameBoard: true, initError: false })
  }
  // events to initialize players
  const handleClick = lastStep ? handlePlay : handleContinue

  const handleChangeName = (e) => {
    const value = e.target.value
    // load data from previous games from local storage
    const data = storage.getData()

    if (lastStep) {
      // work with local storage
      const newData = { ...data, secondName: value }
      storage.update(newData)

      return setState({ ...state, initError: false })
    }
    // work with local storage
    const newData = { ...data, firstName: value }
    storage.update(newData)

    return setState({ ...state, initError: false })
  }

  const handleMarkField = (id) => () => {
    const chip = isNextMove ? 'x' : 'o'
    // load data from previous games from local storage
    const data = storage.getData()

    if (fields[id].value === '') {
      fields[id].value = chip

      // game over if is there a winner
      const winner = findWinner(fields)
      if (winner) {
        // work with local storage
        const newData = {
          ...data,
          crossPoints: isNextMove ? crossPoints + 1 : crossPoints,
          zeroPoints: isNextMove ? zeroPoints : zeroPoints + 1,
          numberCrossWins: isNextMove ? numberCrossWins + 1 : numberCrossWins,
          numberZeroWins: isNextMove ? numberZeroWins : numberZeroWins + 1
        }
        storage.update(newData)

        return setState({
          ...state,
          pause: true,
          message: winner,
          modalType: 'gameOver'
        })
      }

      // all fields are clicked
      const draw = allFieldsClicked(fields)
      if (draw) {
        // work with local storage
        const newData = {
          ...data,
          numberDraws: numberDraws + 1
        }
        storage.update(newData)

        return setState({
          ...state,
          pause: true,
          message: 'The players agreed to a draw',
          modalType: 'gameOver'
        })
      }

      // player move change
      return setState({ ...state, isNextMove: !isNextMove })
    }

    return false
  }

  const handleCloseModal = () => {
    setState({ ...state, pause: false })
  }

  const handleOpenRestartGameModal = () => {
    setState({ ...state, pause: true, modalType: 'pause' })
  }

  const handleRestartMatch = () => {
    // discard game cells
    const restartFields = fields.map((item) => {
      return {
        ...item,
        value: ''
      }
    })

    setState({ ...state, fields: restartFields, isNextMove: true, pause: false })
  }

  const handleRestartGame = () => {
    // load data from previous games from local storage
    const data = storage.getData()
    const newData = {
      ...data,
      showGameBoard: false,
      crossPoints: 0,
      zeroPoints: 0
    }
    storage.update(newData)

    // discard game cells
    const restartFields = fields.map((item) => {
      return {
        ...item,
        value: ''
      }
    })

    setState({
      ...state,
      showGameBoard: false,
      lastStep: false,
      fields: restartFields,
      isNextMove: true,
      pause: false
    })
  }

  const handlePlayAgain = () => {
    // discard game cells
    const restartFields = fields.map((item) => {
      return {
        ...item,
        value: ''
      }
    })

    setState({ ...state, fields: restartFields, isNextMove: true, pause: false, typeModal: '' })
  }

  // get data for modal windows
  const getModalData = (type) => {
    switch (type) {
      case 'gameOver':
        return {
          open: pause,
          message,
          handleClose: handleCloseModal,
          handlePlayAgain,
        }
      case 'pause':
        return {
          open: pause,
          handleClose: handleCloseModal,
          handleRestartMatch,
          handleRestartGame
        }
      default:
        return false
    }
  }
  const modalData = getModalData(modalType)

  return (
    <div className={classes.root}>
      {
        (showGameBoard || storage.getData().showGameBoard)
          ? (
            <GameScreen
              fields={fields}
              isNextMove={isNextMove}
              firstName={firstName}
              secondName={secondName}
              crossPoints={crossPoints}
              zeroPoints={zeroPoints}
              numberCrossWins={numberCrossWins}
              numberZeroWins={numberZeroWins}
              numberDraws={numberDraws}
              modalType={modalType}
              modalData={modalData}
              handleMarkField={handleMarkField}
              handleOpenRestartGameModal={handleOpenRestartGameModal}
            />
          )
          : <InitPlayer formData={formData} handleClick={handleClick} handleChangeName={handleChangeName} />
      }
    </div>
  )
}

export default BeginPlay
