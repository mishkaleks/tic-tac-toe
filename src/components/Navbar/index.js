// base
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// components
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
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  currentPlayer: {
    width: '200px',
    padding: '0 15px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center'
  },
  toLeaderboard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50% !important',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    textDecoration: 'none',
    '&:hover, &:active, &:focus': {
      textDecoration: 'none'
    }
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
      <Link to="/leaderboard" className={classes.toLeaderboard}>
        Set
      </Link>
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
