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

const RestartGameModal = (props) => {
  const { open, handleClose, handleRestartMatch, handleRestartGame } = props

  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={classes.content}>
        <Typography id="modal-title" variant="h3" component="h3">Restart Game</Typography>
        <div className={classes.buttonContainer}>
          <Button onClick={handleRestartMatch} classes={{ root: classes.buttonRoot }}>
            Restart the match
          </Button>
          <Button onClick={handleRestartGame} classes={{ root: classes.buttonRoot }}>
            Start the game over
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

RestartGameModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRestartMatch: PropTypes.func.isRequired,
  handleRestartGame: PropTypes.func.isRequired
}

export default RestartGameModal
