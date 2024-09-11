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
import LinkIcon from '@mui/icons-material/Link'

// Services
import { serviceExamDelete } from '../../../services/exam.services.js'
import ConfirmModal from '../../../ConfirmModal/ConfirmModal.js'
import { random_id } from '../../../services/toolkit.js'
import { servicePatientGet } from '../../../services/patient.services.js'

export default function ExamCard(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExamCard ' + props.exam.examid)
  }
  // i18n
  const { t } = useTranslation()

  // Changes
  let changes = {
    goto: () => {
      if (props.exam.token === undefined || props.exam.token === '') {
        window.location =
          '/exam?examid=' + props.exam.examid + '&patientid=' + props.patientid
      }
    },
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    copyurl: () => {
      navigator.clipboard.writeText(
        window.location.origin + '/remoteexam/' + props.exam.token
      )
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
        serviceExamDelete({
          examid: props.exam.examid,
          patientid: props.patientid,
        }).then(() => {
          console.log('ExamCard/delete props', props)
          setDeleting(false)
          servicePatientGet(props.patientid)
        })
        break
      default:
        console.error('ExamCard.confirmCallback unmatched ' + choice)
    }
  }

  function stringifyDate() {
    let date = new Date(props.exam.date)
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return date.toLocaleString('fr-FR', options)
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }

  return (
    <Card
      index={props.index}
      sx={{
        width: '100%',
        p: 1,
      }}
      data-testid={'component-exam card'}
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
              data-testid={'listitem-exam-menu+' + props.index}
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
              {props.exam.token === undefined ||
              props.exam.token === '' ? null : (
                <MenuItem
                  key={random_id()}
                  onClick={changes.copyurl}
                  data-testid={
                    'listitem-prescription-menuitem-copyurl+' + props.index
                  }
                >
                  <ListItemIcon>
                    <LinkIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('generic.button.copyurl')}</ListItemText>
                </MenuItem>
              )}
              <MenuItem
                key={random_id()}
                onClick={changes.attemptDelete}
                disabled={deleting}
                data-testid={'listitem-exam-menuitem-delete+' + props.index}
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
              flexDirection: 'column',
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
              onClick={changes.goto}
              data-testid={'listitem-exam-click+' + props.index}
            >
              <Typography>
                {t('exam.exams.' + props.exam.type + '.name')}
              </Typography>
              <Typography variant="caption">{stringifyDate()}</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
              onClick={changes.goto}
              data-testid={'listitem-exam-click+' + props.index}
            >
              {props.exam.token === undefined ||
              props.exam.token === '' ? null : (
                <Chip
                  key={random_id()}
                  label={t('exam.label.pending')}
                  size="small"
                  sx={{ mr: 0.5, mt: 0.5 }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: 'patient.confirm.deleteexam.title',
            content: 'patient.confirm.deleteexam.content',
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
