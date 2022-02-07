// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
  }
}))

const BasicModal = (props) => {
  const { open, message, handleClose } = props

  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={classes.content}>
        <Typography id="modal-title" variant="h3" component="h3">Game over</Typography>
        <Typography id="modal-description" variant="h4" component="h4">{message}</Typography>
      </Box>
    </Modal>
  )
}

BasicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default BasicModal
