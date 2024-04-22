import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu.js'
import CloseIcon from '@mui/icons-material/Close.js'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Services
import { random_id } from '../services/toolkit.js'
import { serviceAuthAccessDeny } from '../services/auth.services.js'
// Components
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.js'
import SignInModal from './SignInModal/SignInModal.js'
import PatientModal from './PatientModal/PatientModal.js'
import ExerciseModal from './ExerciseModal/ExerciseModal.js'
import ExamModal from './ExamModal/ExamModal.js'
import PrescriptionModal from './PrescriptionModal/PrescriptionModal.js'

export default function Appbar(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("Appbar");
  }
  // i18n
  const { t } = useTranslation()

  // States
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // Selects
  const select = {
    signedin: useSelector((state) => state.authSlice.signedin),
    usertype: useSelector((state) => state.userSlice.type),
    signInModal: useSelector((state) => state.signinModalSlice.open),
    patientModal: useSelector((state) => state.patientModalSlice.open),
    exerciseModal: useSelector((state) => state.exerciseModalSlice.open),
    examModal: useSelector((state) => state.examModalSlice.open),
    prescriptionModal: useSelector((state) => state.prescriptionModalSlice.open),
  }

  // Handles
  const action = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    toHome: () => {
      setMenuOpen(false)
      window.location = '/'
    },
    toHelp: () => {
      setMenuOpen(false)
      window.location = '/help'
    },
    toAbout: () => {
      setMenuOpen(false)
      window.location = '/about'
    },
    toAccount: () => {
      setMenuOpen(false)
      window.location = '/account'
    },
    toAdmin: () => {
      setMenuOpen(false)
      window.location = '/admin'
    },
    toBack: () => {
      setMenuOpen(false)
      history.back()
    },
    signOut: () => {
      setMenuOpen(false)
      serviceAuthAccessDeny()
      window.location = '/'
    },
    close: () => {
      let currentLocation = window.location
      if (currentLocation.href.includes('/exam?')) {
        // signed in
        let queryString = currentLocation.search.split('?')[1]
        let queries = queryString.split('&')
        let examFlowInputs = {}
        queries.forEach((query) => {
          let queryBreakdown = query.split('=')
          examFlowInputs[queryBreakdown[0]] = queryBreakdown[1]
        })
        if (Object.keys(examFlowInputs).includes('patientid')) {
          window.location = '/patient/' + examFlowInputs.patientid
        }
      } else {
        history.back()
      }
    }
  }

  // MenuItems
  let potentialMenuItems = {
    signOut: {
      item: 'signout',
      label: 'generic.menu.signout',
      onclick: () => {
        action.signOut()
        action.closeMenu()
      },
      signed: true,
      icon: () => { return ( <RemoveCircleOutlineIcon fontSize="small" /> ) }
    },
    toAccount: {
      item: 'account',
      label: 'generic.menu.account',
      onclick: action.toAccount,
      signed: true,
      icon: () => { return ( <AccountCircleIcon fontSize="small" /> ) }
    },
    toHome: {
      item: 'home',
      label: 'generic.menu.home',
      onclick: action.toHome,
      signed: true,
      icon: () => { return ( <PlayCircleFilledIcon fontSize="small" /> ) }
    },
    toHelp: {
      item: 'help',
      label: 'generic.menu.help',
      onclick: action.toHelp,
      signed: false,
      icon: () => { return ( <HelpIcon fontSize="small" /> ) }
    },
    toAbout: {
      item: 'about',
      label: 'generic.menu.about',
      onclick: action.toAbout,
      signed: false,
      icon: () => { return ( <InfoIcon fontSize="small" /> ) }
    },
    toAdmin: {
      item: 'admin',
      label: 'Admin',
      onclick: action.toAdmin,
      signed: true,
      icon: () => { return ( <AdminPanelSettingsIcon fontSize="small" /> ) }
    },
    toBack: {
      item: 'back',
      label: 'Back',
      onclick: action.toBack,
      signed: false,
      icon: () => { return ( <ArrowBackIosNewIcon fontSize="small" /> ) }
    },
  }

  // Constants
  let menuItems = []
  let showLanguageSwitcher = false
  switch (props.route) {
    case 'home':
      //menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toHelp)
      //menuItems.push(potentialMenuItems.toAbout);
      if (select.usertype === 'admin') {
        menuItems.push(potentialMenuItems.toAdmin)
      }
      //menuItems.push(potentialMenuItems.toContact);
      menuItems.push(potentialMenuItems.signOut)
      showLanguageSwitcher = true
      break
    case 'patient':
      menuItems.push(potentialMenuItems.toHome)
      //menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toHelp)
      //menuItems.push(potentialMenuItems.toAbout);
      if (select.usertype === 'admin') {
        menuItems.push(potentialMenuItems.toAdmin)
      }
      //menuItems.push(potentialMenuItems.toContact);
      menuItems.push(potentialMenuItems.signOut)
      showLanguageSwitcher = false
      break
    case 'exam':
      showLanguageSwitcher = false
      break
    case 'prescription':
      menuItems.push(potentialMenuItems.toHome)
      menuItems.push(potentialMenuItems.toBack)
      showLanguageSwitcher = false
      break
    case 'passwordreset':
      showLanguageSwitcher = false
      break
    case 'activation':
      showLanguageSwitcher = false
      break
    case 'account':
      showLanguageSwitcher = false
      break
    case 'help':
      showLanguageSwitcher = false
      break
    case 'about':
      showLanguageSwitcher = false
      break
    case 'admin':
      showLanguageSwitcher = false
      break
    default:
      console.error('Appbar unmatched route', props.route)
  }

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          bottom: 'auto',
        }}
        color={props.route === 'admin' ? 'error' : 'primary'}
        data-testid="component-app bar"
      >
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                data-testid="component-app bar-text-title"
              >
                {props.title}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {showLanguageSwitcher === true ? <LanguageSwitcher /> : null}

              {menuItems.length !== 0 ? (
                <Box>
                  <IconButton
                    size="large"
                    onClick={action.openMenu}
                    data-testid="component-app bar-button-open menu"
                  >
                    <MenuIcon sx={{ color: 'white' }} />
                  </IconButton>

                  <Menu
                    open={menuOpen}
                    onClose={action.closeMenu}
                    anchorEl={anchorEl}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    data-testid="list-app bar menu"
                  >
                    {menuItems.map((item) => {
                      if (item.signed && select.signedin) {
                        return (
                          <MenuItem
                            hidden={!(item.signed && select.signedin)}
                            data-testid={'list-app bar menu-listitem-' + item.item}
                            key={random_id()}
                            onClick={item.onclick}
                          >
                            <ListItemIcon>
                              {item.icon()}
                            </ListItemIcon>
                            <ListItemText>{t(item.label)}</ListItemText>  
                          </MenuItem>
                        )
                      } else {
                        if (item.signed === false) {
                          return (
                            <MenuItem
                              hidden={!(item.signed && select.signedin)}
                              data-testid={'list-app bar menu-listitem-' + item.item}
                              key={random_id()}
                              onClick={item.onclick}
                            >
                              <ListItemIcon>
                                {item.icon()}
                              </ListItemIcon>
                              <ListItemText>{t(item.label)}</ListItemText>  
                            </MenuItem>
                          )
                        } else {
                          return null
                        }
                      }
                    })}
                  </Menu>
                </Box>
              ) : (
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={action.close}
                  data-testid="component-app bar-button-close menu"
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {select.signInModal === true ? <SignInModal /> : null}
      {select.patientModal === true ? <PatientModal /> : null}
      {select.exerciseModal === true ? <ExerciseModal /> : null}
      {select.examModal === true ? <ExamModal /> : null}
      {select.prescriptionModal === true ? <PrescriptionModal /> : null}
    </Box>
  )
}
