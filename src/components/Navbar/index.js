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
import { ReactComponent as IconLeaders } from '../../public/icon_leaders.svg'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonRoot: {
    width: '40px',
    minWidth: '40px !important',
    height: '40px',
    borderRadius: '50% !important',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '1.21059px 3.42px 9.68471px rgba(63, 148, 225, 0.22)'
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
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '1.21059px 3.42px 9.68471px rgba(63, 148, 225, 0.22)',
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
      <Link to="/tic-tac-toe/leaderboard" className={classes.toLeaderboard}>
        <IconLeaders />
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
