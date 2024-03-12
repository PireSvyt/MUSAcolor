import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'

// Services
import ConfirmModal from '../../../ConfirmModal/ConfirmModal.js'
import { random_id } from '../../../services/toolkit.js'
// Reducers
import appStore from '../../../store.js'

export default function ExerciseCard(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExerciseCard ' + props.exercise.exerciseid)
  }
  // i18n
  const { t } = useTranslation()

  // Changes
  let changes = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    movetotop: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          exerciseid: props.exercise.exerciseid,
          by: 'totop'
        },
      })
    },
    moveup: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          exerciseid: props.exercise.exerciseid,
          by: 'up'
        },
      })
    },
    movedown: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          exerciseid: props.exercise.exerciseid,
          by: 'down'
        },
      })
    },
    movetobottom: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          exerciseid: props.exercise.exerciseid,
          by: 'tobottom'
        },
      })
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
        serviceExerciseDelete({
          exerciseid: props.exercise.exerciseid,
          patientid: props.patientid,
        }).then(() => {
          console.log('ExerciseCard/delete props', props)
          setDeleting(false)
          servicePatientGet(props.patientid)
        })
        break
      default:
        console.error('ExerciseCard.confirmCallback unmatched ' + choice)
    }
  }

  return (
    <Card
      index={props.index}
      sx={{
        width: '100%',
        p: 1,
      }}
      data-testid={"component-exercise card"}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography>{t('prescription.exercise.' + props.exercise.name)}</Typography>
            <Typography variant="caption">{props.exercise.duration}</Typography>
          </Box>
          <Box>
            <IconButton 
              size="large" 
              onClick={changes.openMenu}
              data-testid={"listitem-exercise-menu+"+props.index}
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
                disabled={true}
                //disabled={deleting}
                data-testid={"listitem-exercise-menuitem-delete+"+props.index}
              >
                {t('generic.button.delete')}
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.movetotop}
                data-testid={"listitem-exercise-menuitem-movetotop+"+props.index}
                disabled={true}
              >
                {t('generic.button.movetotop')}
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.moveup}
                data-testid={"listitem-exercise-menuitem-moveup+"+props.index}
                disabled={true}
              >
                {t('generic.button.moveup')}
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.movedown}
                data-testid={"listitem-exercise-menuitem-movedown+"+props.index}
                disabled={true}
              >
                {t('generic.button.movedown')}
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.movetobottom}
                data-testid={"listitem-exercise-menuitem-movetobottom+"+props.index}
                disabled={true}
              >
                {t('generic.button.movetobottom')}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: 'patient.confirm.deleteexercise.title',
            content: 'patient.confirm.deleteexercise.content',
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