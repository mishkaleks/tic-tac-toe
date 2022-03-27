// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

// components
import ContentGameModal from './ContentGameModals'

const useStyles = makeStyles(() => ({
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '230px',
    padding: '30px 30px 60px 30px',
    borderRadius: '20px',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '3px 4px 16px rgba(16, 20, 106, 0.09)',
    textAlign: 'center'
  }
}))

const GameModal = (props) => {
  const { modalType, modalData, lastStep, firstName, secondName } = props
  const { open, message, handleClose, handlePlayAgain, handleRestartMatch, handleRestartGame,
    handleReenter } = modalData
  const name = lastStep ? secondName : firstName

  const classes = useStyles()

  const getData = (modalType) => {
    if (modalType === 'gameOver') {
      return {
        title: message,
        labelFirstButton: 'Play again',
        labelSecondButton: 'Exit',
        handleFirstButton: handlePlayAgain,
        handleSecondButton: handleRestartGame
      }
    }

    if (modalType === 'pause') {
      return {
        title: 'Restart game',
        labelFirstButton: 'Restart the match',
        labelSecondButton: 'Start the game over',
        handleFirstButton: handleRestartMatch,
        handleSecondButton: handleRestartGame
      }
    }

    return {
      title: `Player ${name} already exists`,
      labelFirstButton: 'Keep playing',
      labelSecondButton: 'Create a new player',
      handleFirstButton: handleReenter,
      handleSecondButton: handleClose
    }
  }
  const data = getData(modalType)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
    >
      <Box className={classes.content}>
        <ContentGameModal data={data} />
      </Box>
    </Modal>
  )
}

GameModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  modalData: PropTypes.object.isRequired,
  lastStep: PropTypes.bool,
  firstName: PropTypes.string,
  secondName: PropTypes.string
}

export default GameModal
