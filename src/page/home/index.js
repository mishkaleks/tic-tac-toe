// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@mui/styles'

// components
import InfoPanel from '../../components/InfoPanel'
import Scoreboard from '../../components/Scoreboard'
import GameBoard from '../../components/GameBoard'
import Indicator from '../../components/Indicator'
import Navbar from '../../components/Navbar'
import GameModal from '../../components/GameModal'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
}))

const Home = (props) => {
  const { fields, isNextMove, firstName, secondName, crossPoints, zeroPoints, numberCrossWins, numberZeroWins,
    numberDraws, modalType, modalData = {}, handleMarkField, handleOpenRestartGameModal } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <InfoPanel
        numberCrossWins={numberCrossWins}
        numberZeroWins={numberZeroWins}
        numberDraws={numberDraws}
      />
      <Scoreboard
        crossPoints={crossPoints}
        zeroPoints={zeroPoints}
        firstPlayer={firstName}
        secondPlayer={secondName}
      />
      <GameBoard fields={fields} handleMarkField={handleMarkField} />
      <Indicator isNextMove={isNextMove} />
      <Navbar
        isNextMove={isNextMove}
        firstPlayer={firstName}
        secondPlayer={secondName}
        handleOpenRestartGameModal={handleOpenRestartGameModal}
      />
      <GameModal modalType={modalType} modalData={modalData} />
    </div>
  )
}

Home.propTypes = {
  fields: PropTypes.array.isRequired,
  isNextMove: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  crossPoints: PropTypes.number.isRequired,
  zeroPoints: PropTypes.number.isRequired,
  numberCrossWins: PropTypes.number.isRequired,
  numberZeroWins: PropTypes.number.isRequired,
  numberDraws: PropTypes.number.isRequired,
  modalType: PropTypes.string.isRequired,
  modalData: PropTypes.object.isRequired,
  handleMarkField: PropTypes.func.isRequired,
  handleOpenRestartGameModal: PropTypes.func.isRequired
}

export default Home
