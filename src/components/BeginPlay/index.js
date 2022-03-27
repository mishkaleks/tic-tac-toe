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
import PageBg from '../../public/mobile_page_bg.png'

// helpers
import { findWinner } from '../../helpers/findWinner'
import { allFieldsClicked } from '../../helpers/allFieldsClicked'
import { scoring } from '../../helpers/scoring'

// local storage
import { Storage } from '../../storage/storage'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    background: `url(${PageBg})`,
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: 'center center !important',
    backgroundSize: 'cover !important'
  },
  icon: {
    width: '132px',
    height: '132px'
  },
  customButtonRoot1: {
    borderRight: `1px solid ${theme.palette.color.lightBlue} !important`,
    borderBottom: `1px solid ${theme.palette.color.lightBlue} !important`
  },
  customButtonRoot2: {
    borderBottom: `1px solid ${theme.palette.color.lightBlue} !important`
  },
  customButtonRoot3: {
    borderRight: `1px solid ${theme.palette.color.lightBlue} !important`
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
  const showGameScreen = showGameBoard || showGameBoardStorage

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
        helperText: 'Name is already use',
        pause: true,
        modalType: 'reenter'
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
    const nameLabel = lastStep ? 'secondName' : 'firstName'

    // work with local storage
    const data = storage.getData()
    const newData = { ...data, [nameLabel]: value }
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
        const nameWinner = winner === 'x' ? firstName : secondName

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
          message: `${nameWinner} you win!`,
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
          message: 'Dead heat!',
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

  // enter the game under an existing name
  const handleReenter = () => {
    // load data from previous games from local storage
    const data = storage.getData()

    if (lastStep) {
      // work with local storage
      const newData = { ...data, showGameBoard: true }
      storage.update(newData)

      setState({ ...state, showGameBoard: true, initError: false, pause: false })
    }
    setState({ ...state, lastStep: true, initError: false, pause: false })
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
          handleRestartGame
        }
      case 'pause':
        return {
          open: pause,
          handleClose: handleCloseModal,
          handleRestartMatch,
          handleRestartGame
        }
      case 'reenter':
        return {
          open: pause,
          handleClose: handleCloseModal,
          handleReenter
        }
      default:
        return false
    }
  }
  const modalData = getModalData(modalType)

  return (
    <div className={classes.root}>
      {
        showGameScreen
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
          : (
            <InitPlayer
              formData={formData}
              modalData={modalData}
              lastStep={lastStep}
              firstName={firstName}
              secondName={secondName}
              handleClick={handleClick}
              handleChangeName={handleChangeName}
            />
          )
      }
    </div>
  )
}

export default BeginPlay
