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
  ListItemText
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

// Services
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
          index: props.index,
          by: 'totop'
        },
      })
    },
    moveup: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          index: props.index,
          by: 'up'
        },
      })
    },
    movedown: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          index: props.index,
          by: 'down'
        },
      })
    },
    movetobottom: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/move',
        payload: {
          index: props.index,
          by: 'tobottom'
        },
      })
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    delete: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'prescriptionModalSlice/delete',
        payload: {
          index: props.index
        },
      })
    },
  }

  // Confirm modal
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [deleting, setDeleting] = useState(false)

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
                onClick={changes.delete}
                disabled={deleting}
                data-testid={"listitem-exercise-menuitem-delete+"+props.index}
              >
                <ListItemIcon>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.delete')}</ListItemText>   
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.movetotop}
                data-testid={"listitem-exercise-menuitem-movetotop+"+props.index}
              >
                <ListItemIcon>
                  <KeyboardDoubleArrowUpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.movetotop')}</ListItemText>
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.moveup}
                data-testid={"listitem-exercise-menuitem-moveup+"+props.index}
              >
                <ListItemIcon>
                  <KeyboardArrowUpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.moveup')}</ListItemText>
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.movedown}
                data-testid={"listitem-exercise-menuitem-movedown+"+props.index}
              >
                <ListItemIcon>
                  <KeyboardArrowDownIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.movedown')}</ListItemText>
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.movetobottom}
                data-testid={"listitem-exercise-menuitem-movetobottom+"+props.index}
              >
                <ListItemIcon>
                  <KeyboardDoubleArrowDownIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.movetobottom')}</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}