// base
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

// material-ui
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'

// components
import { ReactComponent as IconBack } from '../../public/icon_back.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0 16px'
  },
  title: {
    marginBottom: '30px !important',
    color: theme.palette.baseFont.main
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
    boxShadow: '3px 4px 10px rgba(63, 148, 225, 0.16)',
    listStyleType: 'none',
    '&:last-child': {
      marginBottom: 0
    }
  },
  index: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.color.blue}`,
    boxShadow: '3px 4px 14px rgba(63, 148, 225, 0.14)',
    color: theme.palette.baseFont.blue
  },
  indexActive: {
    border: 'none !important',
    background: 'linear-gradient(87.74deg, #99CEFF 2.43%, #3F94E1 117.84%)',
    color: '#fff'
  },
  name: {
    flexGrow: 1,
    padding: '0 18px',
    color: theme.palette.baseFont.dark
  },
  numberWins: {
    fontWeight: '800 !important',
    color: theme.palette.baseFont.blue
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
            const active = index === 0 || index === 1 || index === 2

            return (
              <li key={index} className={classes.item}>
                <Typography
                  variant="h5"
                  component="div"
                  className={classNames(classes.index, active && classes.indexActive)}
                >
                  {index + 1}
                </Typography>
                <Typography variant="h4" className={classes.name}>{name}</Typography>
                <Typography variant="h4" className={classes.numberWins}>{victories}</Typography>
              </li>
            )
          })
        }
      </ul>
      <Link to="/tic-tac-toe" className={classes.toLeaderboard}><IconBack /></Link>
    </div>
  )
}

Leaderboard.propTypes = {
  leaders: PropTypes.array.isRequired
}

export default Leaderboard
