// base
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import { ReactComponent as IconCross } from '../../public/icon_cross.svg'
import { ReactComponent as IconInactiveCross } from '../../public/icon_inactive_cross.svg'
import { ReactComponent as IconZero } from '../../public/icon_zero.svg'
import { ReactComponent as IconInactiveZero } from '../../public/icon_inactive_zero.svg'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100px',
    height: '54px',
    padding: '0 3px',
    borderRadius: '24px',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '1.21059px 2.42118px 9.68471px rgba(16, 20, 106, 0.09)'
  },
  wrChip: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48px',
    height: '48px',
  },
  wrActiveChip: {
    borderRadius: '50%',
    background: 'linear-gradient(131deg, #FFFFFF -57.77%, #EAEBEB 22.62%, #E8EAEA 73.25%)'
  },
  activeChip: {
    width: '35px',
    height: '35px'
  },
  inactiveChip: {
    width: '30px',
    height: '30px'
  }
}))

const Indicator = (props) => {
  const { isNextMove } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classNames(classes.wrChip, isNextMove && classes.wrActiveChip)}>
        {
          isNextMove
            ? <IconCross className={classes.activeChip}/>
            : <IconInactiveCross className={classes.inactiveChip} />
        }
      </div>
      <div className={classNames(classes.wrChip, !isNextMove && classes.wrActiveChip)}>
        {
          !isNextMove
            ? <IconZero className={classes.activeChip}/>
            : <IconInactiveZero className={classes.inactiveChip} />
        }
      </div>
    </div>
  )
}

Indicator.propTypes = {
  isNextMove: PropTypes.bool.isRequired
}

export default Indicator
