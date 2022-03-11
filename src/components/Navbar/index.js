// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ReactComponent as IconRestart } from '../../public/icon_restart.svg'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonRoot: {
    width: '40px',
    minWidth: '40px !important',
    height: '40px',
    borderRadius: '50% !important',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  currentPlayer: {
    width: '200px',
    padding: '0 15px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center'
  }
}))

const Navbar = (props) => {
  const { isNextMove, firstPlayer, secondPlayer, handleOpenRestartGameModal } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button onClick={handleOpenRestartGameModal} classes={{ root: classes.buttonRoot }}>
        <IconRestart />
      </Button>
      <Typography variant="h4" className={classes.currentPlayer}>
        {
          isNextMove
            ? firstPlayer
            : secondPlayer
        }
      </Typography>
      <Button classes={{ root: classes.buttonRoot }}>Set</Button>
    </div>
  )
}

Navbar.propTypes = {
  isNextMove: PropTypes.bool.isRequired,
  firstPlayer: PropTypes.string.isRequired,
  secondPlayer: PropTypes.string.isRequired,
  handleOpenRestartGameModal: PropTypes.func.isRequired
}

export default Navbar
