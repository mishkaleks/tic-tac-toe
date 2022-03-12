// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import Typography from '@mui/material/Typography'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  playerName: {
    width: '100px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center'
  },
  score: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '30px',
    margin: '0 15px',
    padding: '3px 25px',
    borderRadius: '35px',
    background: '#fff',
    boxShadow: '3px 4px 14px rgba(0, 0, 0, 0.09)',
    fontSize: '16px'
  }
}))

const Scoreboard = (props) => {
  const { firstPlayer, secondPlayer, xPoints, oPoints } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.playerName}>{firstPlayer}</Typography>
      <div className={classes.score}>
        <Typography variant="h4">{xPoints}</Typography>
        <Typography variant="h4">:</Typography>
        <Typography variant="h4">{oPoints}</Typography>
      </div>
      <Typography variant="h4" className={classes.playerName}>{secondPlayer}</Typography>
    </div>
  )
}

Scoreboard.propTypes = {
  firstPlayer: PropTypes.string.isRequired,
  secondPlayer: PropTypes.string.isRequired,
  xPoints: PropTypes.number.isRequired,
  oPoints: PropTypes.number.isRequired,
}

export default Scoreboard
