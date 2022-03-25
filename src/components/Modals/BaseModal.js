// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const useStyles = makeStyles(() => ({
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    padding: '30px',
    borderRadius: '20px',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '3px 4px 16px rgba(16, 20, 106, 0.09)',
    textAlign: 'center'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonRoot: {
    width: 'auto',
    height: 'auto',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  }
}))

const BaseModal = (props) => {
  const { modalType, modalData } = props
  const { open, message, handleClose, handlePlayAgain, handleRestartMatch, handleRestartGame,
    handleReenter } = modalData

  const classes = useStyles()

  const getContent = (modalType) => {
    if (modalType === 'gameOver') {
      return (
        <div>
          <Typography id="modal-title" variant="h3" component="h3">Game over</Typography>
          <Typography id="modal-description" variant="h4" component="h4">{message}</Typography>
          <Button onClick={handlePlayAgain} classes={{ root: classes.buttonRoot }}>
            Play again
          </Button>
        </div>
      )
    }

    if (modalType === 'pause') {
      return (
        <div>
          <Typography id="modal-title" variant="h3" component="h3">Restart game</Typography>
          <div className={classes.buttonContainer}>
            <Button onClick={handleRestartMatch} classes={{ root: classes.buttonRoot }}>
              Restart the match
            </Button>
            <Button onClick={handleRestartGame} classes={{ root: classes.buttonRoot }}>
              Start the game over
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <Typography id="modal-title" variant="h3" component="h3">Re-enter the game</Typography>
        <Typography id="modal-description" variant="h4" component="h4">The name Tom is already in use.</Typography>
        <div className={classes.buttonContainer}>
          <Button onClick={handleReenter} classes={{ root: classes.buttonRoot }}>
            Log into an existing account
          </Button>
          <Button onClick={handleClose} classes={{ root: classes.buttonRoot }}>
            Create a new player
          </Button>
        </div>
      </div>
    )
  }
  const content = getContent(modalType)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={classes.content}>{content}</Box>
    </Modal>
  )
}

BaseModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  modalData: PropTypes.object.isRequired
}

export default BaseModal
