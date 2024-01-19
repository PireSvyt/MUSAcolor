import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import App from './App/App.js'

// Config
import './i18n/i18n.config.js'
// Reducers
import appStore from './App/store.js'

// Theme
import { themeOptions } from './configs/themeOptions.js'
const theme = createTheme(themeOptions)

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

//document.body.requestFullscreen();
