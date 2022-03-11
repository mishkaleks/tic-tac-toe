// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import GameBoard from '../GameBoard'
import BasicModal from '../Modals/BasicModal'
import Indicator from '../Indicator'
import Navbar from '../Navbar'
import RestartGameModal from '../Modals/RestartGameModal'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const GameScreen = (props) => {
  const { fields, isNextMove, gameOver, message, firstName, secondName, pause, handleMarkField, handleCloseModal,
    handleOpenRestartGameModal, handleCloseRestartGameModal, handleRestartMatch, handleRestartGame } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GameBoard fields={fields} handleMarkField={handleMarkField} />
      <Indicator isNextMove={isNextMove} />
      <Navbar
        isNextMove={isNextMove}
        firstPlayer={firstName}
        secondPlayer={secondName}
        handleOpenRestartGameModal={handleOpenRestartGameModal}
      />
      <BasicModal open={gameOver} message={message} handleClose={handleCloseModal} />
      <RestartGameModal
        open={pause}
        handleClose={handleCloseRestartGameModal}
        handleRestartMatch={handleRestartMatch}
        handleRestartGame={handleRestartGame}
      />
    </div>
  )
}

GameScreen.propTypes = {
  fields: PropTypes.array.isRequired,
  isNextMove: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  pause: PropTypes.bool.isRequired,
  handleMarkField: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleOpenRestartGameModal: PropTypes.func.isRequired,
  handleCloseRestartGameModal: PropTypes.func.isRequired,
  handleRestartMatch: PropTypes.func.isRequired,
  handleRestartGame: PropTypes.func.isRequired
}

export default GameScreen
