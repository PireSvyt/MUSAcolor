import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import { serviceExamCreate, serviceExamGet } from '../services/exam.services.js'
import Appbar from '../Appbar/Appbar.js'
import ExamPVO from './ExamPVO/ExamPVO.js'
import ExamLuscher8 from './Luscher8/Luscher8.js'
import appStore from '../store.js'

export default function Exam() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Exam')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    authloaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    examState: useSelector((state) => state.examSlice.state),
    examType: useSelector((state) => state.examSlice.type),
    examSliceContent: useSelector((state) => state.examSlice),
  }

  // Changes
  let changes = {
    newexam: (newexamInputs) => {
      appStore.dispatch({
        type: 'examSlice/new',
        payload: {
          type: newexamInputs.type,
          patientid: newexamInputs.patientid,
        },
      })
    },
    patiendid: (newid) => {
      appStore.dispatch({
        type: 'examSlice/change',
        payload: {
          patient: newid,
        },
      })
    },
    store: (inputs) => {
      console.log('changes.store', inputs)
      serviceExamCreate(inputs)
    },
    getanalysis: () => {
      serviceExamGet({
        examid: select.examSliceContent.examid,
        patientid: select.examSliceContent.patientid,
      })
    },
  }

  if (select.authloaded === true) {
    // Auth loaded
    if (select.signedin === false) {
      // not signed in > redirection
      window.location = '/'
    } else {
      // signed in
      let queryString = window.location.search.split('?')[1]
      let queries = queryString.split('&')
      let examFlowInputs = {}
      queries.forEach((query) => {
        let queryBreakdown = query.split('=')
        examFlowInputs[queryBreakdown[0]] = queryBreakdown[1]
      })
      //console.log("examFlowInputs", examFlowInputs)
      if (Object.keys(examFlowInputs).includes('examid')) {
        // Aims at providing exam analysis
        if (select.examState.analysis === undefined) {
          // details not loaded nor loading
          serviceExamGet({
            examid: examFlowInputs.examid,
            patientid: examFlowInputs.patientid,
          })
        }
      } else {
        // Aims at performing the exam
        // Type
        let availableExamTypes = ['pvo', 'luscher8']
        let selectedExamType = 'unknown'
        if (availableExamTypes.includes(examFlowInputs.type)) {
          selectedExamType = examFlowInputs.type
        }
        // Patientid
        let selectedPatientid = undefined
        if (Object.keys(examFlowInputs).includes('patientid')) {
          selectedPatientid = examFlowInputs.patientid
        }
        // Setup test
        changes.newexam({
          type: selectedExamType,
          patientid: selectedPatientid,
        })
      }
    }
  }

  return (
    <Box
      data-testid="page-exam"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      <Appbar
        route="exam"
        title={
          t('exam.label.title') +
          ' ' +
          t(
            'exam.exams.' +
              (select.examType ? select.examType : 'unknown') +
              '.name'
          )
        }
      />
      <Box sx={{ height: 70 }} />
      {select.authloaded === true && select.signedin === true ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            m: 0,
            p: 0,
          }}
        >
          {
            // EXAM : unknown
            select.examState.analysis === 'denied' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
                data-testid="page-exam-label-deniedaccess"
              >
                {t('exam.label.deniedaccess')}
              </Typography>
            ) : select.examType === 'unknown' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
              >
                {t('exam.label.unknown')}
              </Typography>
            ) : select.examType === 'pvo' ? (
              <ExamPVO
                exam={select.examSliceContent}
                store={changes.store}
                getanalysis={changes.getanalysis}
              />
            ) : select.examType === 'luscher8' ? (
              <ExamLuscher8
                exam={select.examSliceContent}
                store={changes.store}
                getanalysis={changes.getanalysis}
              />
            ) : null
          }
        </Box>
      ) : (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  )
}
