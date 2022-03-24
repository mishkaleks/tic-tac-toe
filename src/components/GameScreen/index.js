// base
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// components
import Home from '../../page/home'
import Leaderboard from '../../page/leaderboard'

const GameScreen = (props) => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home
            {...props} // eslint-disable-line
          />
        }
      />
      <Route
        path="/leaderboard"
        element={
          <Leaderboard
            {...props} // eslint-disable-line
          />
        }
      />
    </Routes>
  )
}

export default GameScreen
