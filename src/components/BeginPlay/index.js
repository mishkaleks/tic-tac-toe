// base
import React, { useState } from 'react'
import _ from 'lodash'

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
import { scoring } from '../../helpers/scoring'

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
    helperText: '',
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
  const { showGameBoard, lastStep, initError, helperText, fields, isNextMove, pause, message, modalType } = state

  // create instance of storage object
  const storage = new Storage()
  const { showGameBoard: showGameBoardStorage, firstName = '', secondName = '', crossPoints = 0, zeroPoints = 0,
    numberCrossWins = 0, numberZeroWins = 0, numberDraws = 0, leaders = [] } = storage.getData()

  const formData = lastStep
    ? {
      icon: <IconZero className={classes.icon} />,
      inputLabelText: 'Second player',
      buttonText: 'Let\'s play!',
      playerName: secondName,
      error: initError,
      helperText
    }
    : {
      icon: <IconCross className={classes.icon} />,
      inputLabelText: 'First player',
      buttonText: 'Continue',
      playerName: firstName,
      error: initError,
      helperText
    }

  // initialize players
  const handleClick = () => {
    const name = lastStep ? secondName : firstName

    // get a list of names of all players
    const listNames = leaders.reduce((total, amount) => {
      total.push(amount.name)
      return total
    }, [])

    // name validation
    if (name === '' || name.length < 3) {
      return setState({
        ...state,
        initError: true,
        helperText: 'Enter your name (at least 3 characters)'
      })
    }

    // checking name for uniqueness
    if (_.includes(listNames, name)) {
      return setState({
        ...state,
        initError: true,
        helperText: 'Name is already use'
      })
    }

    // load data from previous games from local storage
    const data = storage.getData()
    const newData = lastStep
      ? { ...data, showGameBoard: true, leaders: [...leaders, { name, victories: 0 }] }
      : { ...data, leaders: [...leaders, { name, victories: 0 }] }
    storage.update(newData)

    return lastStep
      ? setState({ ...state, showGameBoard: true, initError: false })
      : setState({ ...state, lastStep: true, initError: false })
  }

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
        const newLeaders = scoring(leaders, true, isNextMove, firstName, secondName)
        const newData = {
          ...data,
          crossPoints: isNextMove ? crossPoints + 1 : crossPoints,
          zeroPoints: isNextMove ? zeroPoints : zeroPoints + 1,
          numberCrossWins: isNextMove ? numberCrossWins + 1 : numberCrossWins,
          numberZeroWins: isNextMove ? numberZeroWins : numberZeroWins + 1,
          leaders: newLeaders
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
        const newLeaders = scoring(leaders, false, isNextMove, firstName, secondName)
        const newData = {
          ...data,
          numberDraws: numberDraws + 1,
          leaders: newLeaders
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
        (showGameBoard || showGameBoardStorage)
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
              leaders={leaders}
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
