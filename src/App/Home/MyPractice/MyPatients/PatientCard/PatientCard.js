import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Services
import { servicePatientDelete } from '../../../../services/patient.services.js'
import ConfirmModal from '../../../../ConfirmModal/ConfirmModal.js'
import { random_id } from '../../../../services/toolkit.js'
import { serviceUserGetDetails } from '../../../../services/user.services.js'

import appStore from '../../../../store.js'

export default function PatientCard(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PatientCard ' + props.patient.patientid)
  }
  // i18n
  const { t } = useTranslation()

  // Changes
  let changes = {
    goto: () => {
      setMenuOpen(false)
      window.location = '/patient/' + props.patient.patientid
    },
    editpatient: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'patientModalSlice/load',
        payload: {
          patient: props.patient
        },
      })
    },
    gotodatabaseURL: () => {
      //window.location.href = props.patient.databaseURL
      window.open(props.patient.databaseURL)
    },
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    attemptDelete: () => {
      setConfirmOpen(true)
    },
  }

  // Confirm modal
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  function confirmCallback(choice) {
    switch (choice) {
      case 'close':
        setConfirmOpen(false)
        break
      case 'delete':
        setMenuOpen(false)
        setConfirmOpen(false)
        setDeleting(true)
        servicePatientDelete(props.patient.patientid).then(() => {
          setDeleting(false)
          serviceUserGetDetails()
        })
        break
      default:
        console.error('PatientCard.confirmCallback unmatched ' + choice)
    }
  }

  return (
    <Card
      index={props.index}
      data-testid={"component-patient card"}
      sx={{
        width: '100%',
        p: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box>
            <IconButton 
              size="large" 
              onClick={changes.openMenu}
              data-testid={"listitem-patient-menu+"+props.patient.name}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={menuOpen}
              onClose={changes.closeMenu}
              anchorEl={anchorEl}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                key={random_id()}
                onClick={changes.editpatient}
                data-testid={"listitem-patient-menuitem-edit+"+props.patient.name}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.edit')}</ListItemText>                
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.attemptDelete}
                disabled={deleting}
                data-testid={"listitem-patient-menuitem-delete+"+props.patient.name}
              >
                <ListItemIcon>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.delete')}</ListItemText>                
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
            onClick={changes.goto}
            data-testid={"listitem-patient-click+"+props.patient.name}
          >
            <Typography>{props.patient.name}</Typography>
            
          </Box>
          <Button 
            sx={{'min-width': 'max-content'}}
            size="small"
            onClick={changes.gotodatabaseURL}
            disabled={props.patient.databaseURL === undefined 
              || props.patient.databaseURL === null 
              || props.patient.databaseURL === ''}
          >{t('patient.button.databaseurl')}</Button>
        </Box>
      </Box>

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: 'home.confirm.deletepatient.title',
            content: 'home.confirm.deletepatient.content',
            callToActions: [
              {
                label: 'generic.button.cancel',
                choice: 'close',
              },
              {
                label: 'generic.button.proceed',
                choice: 'delete',
                variant: 'contained',
                color: 'error',
              },
            ],
          }}
          callback={confirmCallback}
        />
      )}
    </Card>
  )
}

/**
 

        <IconButton 
            id={props.patient.patientid}
            data-testid={"component-my patients-listitem-patient-button-delete patient"}
            index={props.index}
            onClick={() => setConfirmOpen(true)} disabled={deleting}
        >
            {deleting ? (
                <CircularProgress size={24} sx={{ color: "grey.500" }} />
            ) : (
                <RemoveCircleOutlineIcon />
            )}
            </IconButton>
 */
