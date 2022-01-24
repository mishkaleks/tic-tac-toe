import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Helvetica, sans-serif',
    useNextVariants: true,
    h1: {
      fontFamily: 'EncodeSans',
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '34px'
    },
    h2: {
      fontFamily: 'EncodeSans',
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '30px'
    },
    h3: {
      fontFamily: 'EncodeSans',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '30px'
    },
    h4: {
      fontFamily: 'EncodeSans',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px'
    },
    h5: {
      fontFamily: 'EncodeSans',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '21px'
    },
    h6: {
      fontFamily: 'EncodeSans',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '18px'
    }
  },
  palette: {
    bg: {
      light: '#fff'
    },
    baseFont: {
      main: '#414946',
      light: '#DBD6D6',
      blue: '#6FA9DE'
    },
    color: {
      default: '#414946',
      light: '#DBD6D6',
      green: '#33E794',
      red: '#DE272F',
      blue: '#6FA9DE'
    }
  }
})

export default theme
