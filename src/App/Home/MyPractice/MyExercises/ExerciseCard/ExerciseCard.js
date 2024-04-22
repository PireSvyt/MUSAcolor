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
  Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

// Services
import { serviceExerciseDelete } from '../../../../services/exercise.services.js'
import ConfirmModal from '../../../../ConfirmModal/ConfirmModal.js'
import { random_id } from '../../../../services/toolkit.js'
import { serviceUserGetDetails } from '../../../../services/user.services.js'

import appStore from '../../../../store.js'

export default function ExerciseCard(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExerciseCard ' + props.exercise.exerciseid)
  }
  // i18n
  const { t } = useTranslation()

  function depackageInputs(exercise) {
    let depackagedExercise = { ...exercise }
    if (depackagedExercise.type === 'videoYoutube') {
      depackagedExercise.instructions = depackagedExercise.data.instructions
      depackagedExercise.videoToken = depackagedExercise.data.videoToken
      delete depackagedExercise.data
    }
    return depackagedExercise
  }

  // Changes
  let changes = {
    openexercise: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'exerciseModalSlice/load',
        payload: {
          exercise: depackageInputs(props.exercise),
        },
      })
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
        serviceExerciseDelete(props.exercise.exerciseid).then(() => {
          setDeleting(false)
          serviceUserGetDetails()
        })
        break
      default:
        console.error('ExerciseCard.confirmCallback unmatched ' + choice)
    }
  }

  return (
    <Card
      index={props.index}
      data-testid={'component-exercise card'}
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
              data-testid={'listitem-exercise-menu+' + props.exercise.name}
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
                data-testid={
                  'listitem-exercise-menuitem-delete+' + props.exercise.name
                }
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
              justifyContent: 'space-between',
              width: '100%',
            }}
            onClick={changes.openexercise}
            data-testid={'listitem-exercise-click+' + props.exercise.name}
          >
            <Typography>{props.exercise.name}</Typography>
            <Box>
              <Chip
                label={t('exercise.label.' + props.exercise.type)}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: 'home.confirm.deleteexercise.title',
            content: 'home.confirm.deleteexercise.content',
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

function toMinutesString(seconds) {
  var sec_num = parseInt(seconds, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  return minutes + 'min'
  /*
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
  */
}
