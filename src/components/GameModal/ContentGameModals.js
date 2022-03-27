// base
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// material-ui
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: '30px !important',
    fontFamily: 'EncodeSans !important',
    fontWeight: '700 !important',
    fontSize: '18px !important',
    lineHeight: '27px !important',
    color: theme.palette.baseFont.main
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonRoot: {
    width: '200px',
    minHeight: '44px',
    borderRadius: '30px !important',
    boxShadow: '3px 4px 14px rgba(63, 148, 225, 0.14)',
    textTransform: 'none !important'
  },
  firstButton: {
    marginBottom: '25px !important',
    background: 'linear-gradient(87.74deg, #99CEFF 2.43%, #3F94E1 117.84%)',
    color: '#fff !important'
  },
  secondButton: {
    color: `${theme.palette.baseFont.main} !important`
  }
}))

const ContentGameModal = (props) => {
  const { data } = props
  const { title, labelFirstButton, labelSecondButton, handleFirstButton, handleSecondButton } = data

  const classes = useStyles()

  return (
    <div>
      <Typography id="modal-title" className={classes.title}>{title}</Typography>
      <div className={classes.buttonContainer}>
        <Button
          onClick={handleFirstButton}
          classes={{ root: classNames(classes.buttonRoot, classes.firstButton) }}
        >
          {labelFirstButton}
        </Button>
        <Button
          onClick={handleSecondButton}
          classes={{ root: classNames(classes.buttonRoot, classes.secondButton) }}
        >
          {labelSecondButton}
        </Button>
      </div>
    </div>
  )
}

ContentGameModal.propTypes = {
  data: PropTypes.object.isRequired
}

export default ContentGameModal
