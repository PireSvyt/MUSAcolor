import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LinearProgress from '@mui/material/LinearProgress'

// Services
import { random_id } from '../../services/toolkit.js'
// Components
import ExamCard from './ExamCard/ExamCard.js'

import appStore from '../../store.js'

export default function PatientExams() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PatientExams')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    patientState: useSelector((state) => state.patientSlice.state),
    patientPatientid: useSelector((state) => state.patientSlice.patientid),
    patientExams: useSelector((state) => state.patientSlice.exams),
    selectingExams: useSelector((state) => state.patientSlice.selectingexams),
  }
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // Changes
  let changes = {
    new: () => {
      appStore.dispatch({
        type: 'examModalSlice/new',
      })
    },
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    compare: () => {
      setMenuOpen(false);
      // Find exams to compare
      let examtype = ""
      let examids = []
      select.patientExams.forEach(exam => {
        if (exam.selected === true) {
          examids.push(exam.examid)
          examtype = exam.type
        }
      })      
      if (examtype !== "" && examids.length > 1) {
	      let examidsstring = "["
	      examids.forEach (eid => {
		      examidsstring = examidsstring + "\"" + eid + "\"," 
	      })
	      examidsstring = examidsstring.slice(0, -1) + "]"
	      // Go to comparison
	      window.location =
	        '/compare?patientid=' + select.patientPatientid + '&type=' + examtype + '&examids=' + examidsstring
      }
    },
    unselectall: () => {
      appStore.dispatch({
        type: "patientSlice/unselectall",
      });
      setMenuOpen(false);
    }
  }

  let c = -1

  return (
    <Box data-testid="component-patient exams">
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t('patient.label.exams')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >	
	        { !select.selectingExams ? null : (    
		        <Box
            > 
			        <IconButton
			          sx={{ p: 1 }}
			          onClick={changes.openMenu}
			          color="primary"
			          data-testid="component-patient exams-button-exams menu"
			        >
			          <MoreHorizIcon />
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
	                onClick={changes.compare}
	              >
	                <ListItemIcon>
	                  <SsidChartIcon fontSize="small" />
	                </ListItemIcon>
	                <ListItemText>{t('generic.button.compare')}</ListItemText>
	              </MenuItem>
	              <MenuItem
	                key={random_id()}
	                onClick={changes.unselectall}
	              >
	                <ListItemIcon>
	                  <CheckBoxOutlineBlankIcon fontSize="small" />
	                </ListItemIcon>
	                <ListItemText>{t('generic.button.unselectall')}</ListItemText>
	              </MenuItem>
	            </Menu>
		        </Box>
	        )}
	        <IconButton
	          sx={{ p: 2 }}
	          onClick={changes.new}
	          color="primary"
	          data-testid="component-patient exams-button-new exam"
	        >
	          <AddCircleIcon />
	        </IconButton>
        </Box>
      </Stack>

      {select.patientState.details !== 'available' ? (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress />
        </Box>
      ) : select.patientExams.length === 0 ? (
        <Box
          sx={{
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="h6"
            component="span"
            align="center"
          >
            {t('patient.label.noexams')}
          </Typography>
          <SmsFailedIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="primary"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="body1"
            component="span"
            align="center"
          >
            {t('patient.label.noexamsexplanation')}
          </Typography>
        </Box>
      ) : (
        <List dense={false}>
          {select.patientExams.map((exam) => {
            c += 1
            return (
              <ListItem key={'exam-' + exam.examid}>
                <ExamCard
                  exam={exam}
                  index={c}
                  patientid={window.location.href.split('/patient/')[1]}
                  selecting={select.selectingExams}
                />
              </ListItem>
            )
          })}
        </List>
      )}
    </Box>
  )
}