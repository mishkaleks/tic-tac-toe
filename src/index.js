// basic
import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'

// material-ui
import { ThemeProvider } from '@mui/material/styles'

// helpers
import theme from './theme/mu-theme'

// components
import App from './components/App/index'

// icons
import favIcon1 from './public/icon_cross.svg'
import favIcon2 from './public/icon_zero.svg'

// styles
import './index.css'

ReactDOM.render(
  (
    <ThemeProvider theme={theme}>
      <Favicon url={[favIcon1, favIcon2]} />
      <App />
    </ThemeProvider>
  ),
  document.getElementById('root')
)
