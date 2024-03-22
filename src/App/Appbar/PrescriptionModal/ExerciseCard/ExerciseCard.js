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
  TextField,
  FormControl
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
    console.log('ExerciseCard')
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
    posology: (e) => {
      appStore.dispatch({
        type: 'prescriptionModalSlice/change',
        payload: {
          index: props.index,
          posology: e.target.value
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
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {props.exercise === undefined ? (null) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography>{ props.exercise.name }</Typography>
              <Typography variant="caption">{toMinutesString(props.exercise.duration)}</Typography>
            </Box>
          )}
          
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

        <Box
          sx={{width: '100%'}}
        >
          <TextField
            name="posology"
            label={t('prescription.label.posology')}
            placeholder={t('prescription.label.optional')}
            variant="standard"
            value={props.posology}
            onChange={changes.posology}
            autoComplete="off"
            fullWidth
            multiline
          />
        </Box>
      </Box>
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