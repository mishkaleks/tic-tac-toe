// base
import React from 'react'

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery'

// components
import Stub from '../Stub/index'
import StartScreen from '../StartScreen/index'

const App = () => {
  const isMobile = useMediaQuery('(max-width:500px)')

  return (
    <div>
      {isMobile ? <StartScreen /> : <Stub />}
    </div>
  )
}

export default App
