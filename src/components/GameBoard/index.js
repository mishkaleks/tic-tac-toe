// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import Box from './Box'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '252px',
    padding: '30px',
    borderRadius: '20px',
    background: 'linear-gradient(223.26deg, #FFFFFF 1.5%, #F3F3F3 80.41%)',
    boxShadow: '3px 4px 16px rgba(16, 20, 106, 0.09)'
  }
}))

const GameScreen = (props) => {
  const { fields, handleMarkField } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {
        fields.map((field, index) => {
          return (
            <Box key={index} field={field} handleMarkField={handleMarkField} />
          )
        })
      }
    </div>
  )
}

GameScreen.propTypes = {
  fields: PropTypes.array.isRequired,
  handleMarkField: PropTypes.func.isRequired
}

export default GameScreen
