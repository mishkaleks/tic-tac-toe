// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import BaseModal from '../Modals/BaseModal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  icon: {
    width: '132px',
    height: '132px'
  },
  title: {
    paddingTop: '50px',
    color: theme.palette.baseFont.main
  },
  formControlRoot: {
    margin: '30px 0 60px !important'
  },
  inputLabelRoot: {
    fontFamily: 'EncodeSans !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    lineHeight: '24px !important',
    color: `${theme.palette.color.blue} !important`
  },
  inputRoot: {
    fontFamily: 'EncodeSans !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    lineHeight: '24px !important',
    color: `${theme.palette.color.light} !important`,
    '&:before': {
      borderBottom: `1px solid ${theme.palette.color.blue} !important`
    },
    '&:after': {
      borderBottom: `1px solid ${theme.palette.color.blue} !important`
    }
  },
  error: {
    '&:after': {
      borderBottom: '1px solid red !important'
    }
  },
  buttonRoot: {
    minWidth: '165px !important',
    border: 'none ',
    borderRadius: '24px !important',
    padding: '8px 40px !important',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '1.16165px 2.3233px 9.29321px rgba(16, 20, 106, 0.09)'
  },
  buttonText: {
    textTransform: 'capitalize',
    color: theme.palette.baseFont.blue
  }
}))

const InitPlayer = ({ formData, modalData, handleClick, handleChangeName }) => {
  const { icon, inputLabelText, playerName, buttonText, error, helperText } = formData

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {icon}
      <Typography variant="h3" component="div" className={classes.title}>Enter your name</Typography>
      <TextField
        id="input-player-name"
        label={inputLabelText}
        value={playerName}
        error={error}
        helperText={error && helperText}
        variant="standard"
        placeholder="Name"
        onChange={handleChangeName}
        classes={{ root: classes.formControlRoot }}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.inputLabelRoot
          }
        }}
        InputProps={{
          classes: {
            root: classes.inputRoot,
            error: classes.error
          }
        }}
      />
      <Button
        onClick={handleClick}
        classes={{ root: classes.buttonRoot }}
      >
        <Typography variant="h4" className={classes.buttonText}>{buttonText}</Typography>
      </Button>
      <BaseModal modalData={modalData} />
    </div>
  )
}

InitPlayer.propTypes = {
  formData: PropTypes.object.isRequired,
  modalData: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChangeName: PropTypes.func.isRequired
}

export default InitPlayer
