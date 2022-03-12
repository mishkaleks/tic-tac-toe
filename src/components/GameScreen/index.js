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
import Scoreboard from '../Scoreboard'
import InfoPanel from '../InfoPanel'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const GameScreen = (props) => {
  const { fields, isNextMove, gameOver, message, firstName, secondName, pause, crossPoints, zeroPoints, numberCrossWins,
    numberZeroWins, numberDraws, handleMarkField, handleCloseModal, handleOpenRestartGameModal,
    handleCloseRestartGameModal, handleRestartMatch, handleRestartGame, handlePlayAgain } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <InfoPanel
        numberCrossWins={numberCrossWins}
        numberZeroWins={numberZeroWins}
        numberDraws={numberDraws}
      />
      <Scoreboard
        crossPoints={crossPoints}
        zeroPoints={zeroPoints}
        firstPlayer={firstName}
        secondPlayer={secondName}
      />
      <GameBoard fields={fields} handleMarkField={handleMarkField} />
      <Indicator isNextMove={isNextMove} />
      <Navbar
        isNextMove={isNextMove}
        firstPlayer={firstName}
        secondPlayer={secondName}
        handleOpenRestartGameModal={handleOpenRestartGameModal}
      />
      <BasicModal open={gameOver} message={message} handleClose={handleCloseModal} handlePlayAgain={handlePlayAgain} />
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
  crossPoints: PropTypes.number.isRequired,
  zeroPoints: PropTypes.number.isRequired,
  numberCrossWins: PropTypes.number.isRequired,
  numberZeroWins: PropTypes.number.isRequired,
  numberDraws: PropTypes.number.isRequired,
  handleMarkField: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleOpenRestartGameModal: PropTypes.func.isRequired,
  handleCloseRestartGameModal: PropTypes.func.isRequired,
  handleRestartMatch: PropTypes.func.isRequired,
  handleRestartGame: PropTypes.func.isRequired,
  handlePlayAgain: PropTypes.func.isRequired
}

export default GameScreen
