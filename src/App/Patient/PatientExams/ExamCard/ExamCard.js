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
import CircularProgress from '@mui/material/CircularProgress'

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
      window.location = '/exam/' + props.exam.examid
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
        serviceExamDelete({
          examid: props.exam.examid,
          patientid: props.patientid,
        }).then(() => {
            console.log("ExamCard/delete props", props)
          setDeleting(false)
          servicePatientGet(props.patientid)
        })
        break
      default:
        console.error('ExamCard.confirmCallback unmatched ' + choice)
    }
  }

  function stringifyDate() {
    let date = new Date(props.exam.date);
    return date.toLocaleString("fr-FR");
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }

  return (
    <Card
      index={props.index}
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
            <IconButton size="large" onClick={changes.openMenu}>
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
              >
                {t('generic.button.delete')}
              </MenuItem>
            </Menu>
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
          >      
            <Typography>{props.exam.type}</Typography>
            <Typography variant="caption">{stringifyDate()}</Typography>
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

/**
 

        <IconButton 
            id={props.exam.examid}
            data-testid={"component-my exams-listitem-exam-button-delete exam"}
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
