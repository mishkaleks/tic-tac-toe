// base
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery'

// components
import Stub from '../Stub/index'
import StartScreen from '../StartScreen/index'

const App = () => {
  const isMobile = useMediaQuery('(max-width:500px)')

  return (
    <Router>
      {isMobile ? <StartScreen /> : <Stub />}
    </Router>
  )
}

export default App
