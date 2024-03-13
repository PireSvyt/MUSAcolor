import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import Landing from './Landing/Landing.js'
import MyPractice from './MyPractice/MyPractice.js'
// Shared
import Appbar from '../Appbar/Appbar.js'

export default function Home() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Home')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    loaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    userState: useSelector((state) => state.userSlice.state),
    usertype: useSelector((state) => state.userSlice.type),
  }

  return (
    <Box
      data-testid="page-home"
    >
      <Appbar route="home" title={t('generic.label.product')} />
      <Box sx={{ height: 70 }} />
      {select.loaded === false ? (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? (
        <Landing />
      ) : select.userState.details === 'available' ? (
        <Box>
          {select.usertype === 'practician' || select.usertype === 'admin' ? (
            <MyPractice />
          ) : // Means user is patient / not yet available
          null}
        </Box>
      ) : (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  )
}
