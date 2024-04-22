import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Stack,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LinkIcon from '@mui/icons-material/Link';
import BiotechIcon from '@mui/icons-material/Biotech';

// Services
import { 
  servicePrescriptionDelete, 
  servicePrescriptionGetDuration 
} from '../../../services/prescription.services.js'
import ConfirmModal from '../../../ConfirmModal/ConfirmModal.js'
import { random_id, stringifyDate } from '../../../services/toolkit.js'
import { servicePatientGet } from '../../../services/patient.services.js'

import appStore from '../../../store.js'

export default function PrescriptionCard(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PrescriptionCard ' + props.prescription.prescriptionid)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    userState: useSelector((state) => state.userSlice.state),
    myexercises: useSelector((state) => state.userSlice.exercises),
  }

  // Changes
  let changes = {
    goto: () => {
      window.location = '/prescription?prescriptionid=' + props.prescription.prescriptionid
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
    openprescription: () => {
      //console.log('prescription to open', props.prescription)
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/load',
        payload: {
          prescription: props.prescription
        },
      })
    },
    copyurl: () => {
      navigator.clipboard.writeText(
        window.location.origin + '/prescription/' + props.prescription.prescriptionid
      )
      setMenuOpen(false)
    },
    test: () => {
      setMenuOpen(false)
      window.location = '/prescription/' + props.prescription.prescriptionid
    },
  }

  //console.log("props.prescription",props.prescription)

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
        servicePrescriptionDelete({
          prescriptionid: props.prescription.prescriptionid,
          patientid: props.patientid,
        }).then(() => {
          //console.log('PrescriptionCard/delete props', props)
          setDeleting(false)
          servicePatientGet(props.patientid)
        })
        break
      default:
        console.error('PrescriptionCard.confirmCallback unmatched ' + choice)
    }
  }

  return (
    <Card
      index={props.index}
      sx={{
        width: '100%',
        p: 1,
      }}
      data-testid={"component-prescription card"}
    >
      {select.userState.exercises !== 'available' ? (null) : (
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
                data-testid={"listitem-prescription-menu+"+props.index}
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
                  onClick={changes.attemptDelete}
                  disabled={deleting}
                  data-testid={"listitem-prescription-menuitem-delete+"+props.index}
                >
                  <ListItemIcon>
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('generic.button.delete')}</ListItemText>   
                </MenuItem>
                <MenuItem
                  key={random_id()}
                  onClick={changes.copyurl}
                  data-testid={"listitem-prescription-menuitem-copyurl+"+props.index}
                >
                  <ListItemIcon>
                    <LinkIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('generic.button.copyurl')}</ListItemText> 
                </MenuItem>
                <MenuItem
                  key={random_id()}
                  onClick={changes.test}
                  data-testid={"listitem-prescription-menuitem-test+"+props.index}
                >
                  <ListItemIcon>
                    <BiotechIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('generic.button.test')}</ListItemText> 
                </MenuItem>
              </Menu>
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'left'
              }}
              onClick={changes.openprescription}
            >
              <Typography variant="body1">
                {
                  stringifyDate(props.prescription.editionDate) 
                  //+ " / " + servicePrescriptionGetDuration(props.prescription.exercises)
                }
              </Typography>
              <Stack
                spacing={{ xs: 0, sm: 0.5 }} 
                direction="row" 
                useFlexGap 
                flexWrap="wrap"
              >
                {props.prescription.exercises.map(exercise => {
                  let ex = select.myexercises.filter(ex => ex.exerciseid === exercise.exerciseid)[0]
                  //console.log("ex",ex)
                  if (ex === undefined) {
                    console.log("!! undefined exercise",exercise)
                    return null
                  } else {
                    console.log("exercise",exercise)
                    if (ex.exerciseid === 'userDefined') {
                      return (<Chip key={random_id()} label={t('exercise.label.customExercise')} size="small" sx={{mr:0.5, mt: 0.5}}/>)
                    } else {
                      return (<Chip key={random_id()} label={ex.name} size="small" sx={{mr:0.5, mt: 0.5}}/>)
                    }
                  }
                })}
              </Stack>
            </Box>
          </Box>
        </Box>      
      )}

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: 'prescription.confirm.deleteprescription.title',
            content: 'prescription.confirm.deleteprescription.content',
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

function toMinutesString (seconds) {
  var sec_num = parseInt(seconds, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  return minutes + 'min'
  /*
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
  */
}