// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import GameBoard from '../GameBoard'
import BasicModal from '../Modals/BasicModal'

const useStyles = makeStyles(() => ({
  root: {}
}))

const GameScreen = (props) => {
  const { fields, gameOver, message, handleMarkField, handleCloseModal } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GameBoard fields={fields} handleMarkField={handleMarkField} />
      <BasicModal open={gameOver} message={message} handleClose={handleCloseModal} />
    </div>
  )
}

GameScreen.propTypes = {
  fields: PropTypes.array.isRequired,
  gameOver: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleMarkField: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

export default GameScreen
