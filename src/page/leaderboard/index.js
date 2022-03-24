// base
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0 16px'
  },
  title: {
    marginBottom: '30px !important',
    color: theme.palette.color.default
  },
  list: {
    width: '100%',
    margin: '0 0 120px 0',
    padding: 0
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    padding: '8px 25px',
    borderRadius: '20px',
    boxShadow: '3px 4px 16px rgba(16, 20, 106, 0.09)',
    listStyleType: 'none',
    '&:last-child': {
      marginBottom: 0
    },
    '&:nth-child(1)': {
      background: 'linear-gradient(91.27deg, #FFCC15 -1.16%, #FFDF70 84.6%)'
    },
    '&:nth-child(2)': {
      background: '#E1E1E1'
    },
    '&:nth-child(3)': {
      background: 'radial-gradient(50% 50% at 49.86% 50%, #DFDCCA 0%, #F3F3F3 81.24%)'
    }
  },
  text: {
    color: theme.palette.color.default
  },
  name: {
    flexGrow: 1,
    padding: '0 18px',
    color: theme.palette.color.default
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

const Leaderboard = (props) => {
  const { leaders = [] } = props

  const classes = useStyles()

  // leaderboard sorting
  leaders.sort((a, b) => (
    (a.victories > b.victories)
      ? -1
      : (a.victories === b.victories)
        ? ((a.name > b.name) ? 1 : -1)
        : 1
  ))

  // show first five players
  const result = leaders.filter((item, index) => { return index < 5 ? item : false })

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="div" className={classes.title}>Leaderboard</Typography>
      <ul className={classes.list}>
        {
          result.map((item, index) => {
            const { name, victories } = item

            return (
              <li key={index} className={classes.item}>
                <Typography variant="h6" className={classes.text}>{index + 1}</Typography>
                <Typography variant="h4" className={classes.name}>{name}</Typography>
                <Typography variant="h4" className={classes.text}>{victories}</Typography>
              </li>
            )
          })
        }
      </ul>
      <Link to="/" className={classes.toLeaderboard}>
        H
      </Link>
    </div>
  )
}

Leaderboard.propTypes = {
  leaders: PropTypes.array.isRequired
}

export default Leaderboard
