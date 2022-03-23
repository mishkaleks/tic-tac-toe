// base
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// components
import Home from '../../page/home'
import LeaderBoard from '../../page/leader-board'

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
      <Route path="/leader-board" element={<LeaderBoard />} />
    </Routes>
  )
}

export default GameScreen
