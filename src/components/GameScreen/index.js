// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import GameBoard from '../GameBoard'
import BasicModal from '../Modals/BasicModal'
import Indicator from '../Indicator'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const GameScreen = (props) => {
  const { fields, isNextMove, gameOver, message, handleMarkField, handleCloseModal } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GameBoard fields={fields} handleMarkField={handleMarkField} />
      <Indicator isNextMove={isNextMove} />
      <BasicModal open={gameOver} message={message} handleClose={handleCloseModal} />
    </div>
  )
}

GameScreen.propTypes = {
  fields: PropTypes.array.isRequired,
  isNextMove: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleMarkField: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

export default GameScreen
