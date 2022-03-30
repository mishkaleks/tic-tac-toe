// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'

// components
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'
import { ReactComponent as IconDraw } from '../../public/icon_draw.svg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '60px'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 30px'
  },
  icon: {
    width: '25px',
    height: '25px',
    marginBottom: '2px'
  },
  text: {
    color: theme.palette.color.light,
    textAlign: 'center'
  }
}))

const InfoPanel = (props) => {
  const { numberCrossWins, numberZeroWins, numberDraws } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <IconCross className={classes.icon} />
        <Typography variant="h6" className={classes.text}>{`${numberCrossWins} wins`}</Typography>
      </div>
      <div className={classes.wrapper}>
        <IconZero className={classes.icon} />
        <Typography variant="h6" className={classes.text}>{`${numberZeroWins} wins`}</Typography>
      </div>
      <div className={classes.wrapper}>
        <IconDraw className={classes.icon} />
        <Typography variant="h6" className={classes.text}>{`${numberDraws} draws`}</Typography>
      </div>
    </div>
  )
}

InfoPanel.propTypes = {
  numberCrossWins: PropTypes.number.isRequired,
  numberZeroWins: PropTypes.number.isRequired,
  numberDraws: PropTypes.number.isRequired
}

export default InfoPanel
