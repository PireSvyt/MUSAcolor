import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import BiotechIcon from '@mui/icons-material/Biotech';

// Services
import { servicePrescriptionDelete } from '../../../services/prescription.services.js'
import ConfirmModal from '../../../ConfirmModal/ConfirmModal.js'
import { random_id } from '../../../services/toolkit.js'
import { servicePatientGet } from '../../../services/patient.services.js'

export default function PrescriptionCard(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PrescriptionCard ' + props.prescription.prescriptionid)
  }
  // i18n
  const { t } = useTranslation()

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
    edit: () => {
      //
    },
    copyurl: () => {
      navigator.clipboard.writeText(
        "https://musacolor.vercel.app/" + 'prescription/' + props.prescription.prescriptionid
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

  function stringifyDate() {
    let date = new Date(props.prescription.editionDate)
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    return date.toLocaleString('fr-FR', options)
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }

  // Duration
  let prescrptionDuration = 0
  props.prescription.exercises.forEach(exercise => {
    prescrptionDuration += exercise.duration
  })

  return (
    <Card
      index={props.index}
      sx={{
        width: '100%',
        p: 1,
      }}
      data-testid={"component-prescription card"}
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
                onClick={changes.edit}
                data-testid={"listitem-prescription-menuitem-edit+"+props.index}
                disabled={true}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.edit')}</ListItemText> 
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
          >
            <Typography variant="body1">{stringifyDate() + " / " + toMinutesString(prescrptionDuration)}</Typography>
            <Stack
              spacing={{ xs: 0, sm: 0.5 }} 
              direction="row" 
              useFlexGap 
              flexWrap="wrap"
            >
              {props.prescription.exercises.map(exercise => {
                //console.log("exercise",exercise)
                return (<Chip label={exercise.name} size="small" />)
              })}
            </Stack>
          </Box>
        </Box>
      </Box>

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