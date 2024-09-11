import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import {
  serviceExamGetRemotely,
  serviceExamSaveRemotely,
} from '../services/exam.services.js'
import Appbar from '../Appbar/Appbar.js'
import ExamPVO from './ExamPVO/ExamPVO.js'
import ExamLuscher8 from './Luscher8/Luscher8.js'
import appStore from '../store.js'

export default function ExamRemote() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Exam')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    examState: useSelector((state) => state.examSlice.state),
    examType: useSelector((state) => state.examSlice.type),
    examSliceContent: useSelector((state) => state.examSlice),
  }

  // Changes
  let changes = {
    store: (inputs) => {
      console.log('changes.store', inputs)
      serviceExamSaveRemotely({
        inputs: {
          examid: appStore.getState().examSlice.examid,
          token: appStore.getState().examSlice.token,
          results: inputs.inputs.results,
        },
      })
    },
    token: (t) => {
      appStore.dispatch({
        type: 'examSlice/change',
        payload: {
          token: t,
        },
      })
    },
  }

  if (select.examState.getremotely === undefined) {
    let queryString = window.location.search.split('?')[1]
    let queries = queryString.split('&')
    let examFlowInputs = {}
    queries.forEach((query) => {
      let queryBreakdown = query.split('=')
      examFlowInputs[queryBreakdown[0]] = queryBreakdown[1]
    })
    //console.log("examFlowInputs", examFlowInputs)
    if (Object.keys(examFlowInputs).includes('token')) {
      // Aims at providing exam analysis
      if (select.examState.analysis === undefined) {
        // details not loaded nor loading
        changes.token(examFlowInputs.token)
        serviceExamGetRemotely({
          token: examFlowInputs.token,
        })
      }
    }
  }

  return (
    <Box
      data-testid="page-exam remote"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      <Appbar route="examremote" title={t('exam.label.title')} />
      <Box sx={{ height: 70 }} />
      {select.examState.getremotely === 'loaded' ||
      select.examState.getremotely === 'denied' ? (
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
            select.examState.getremotely === 'denied' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
                data-testid="page-exam-label-deniedaccess"
              >
                {t('exam.label.deniedaccess')}
              </Typography>
            ) : select.examState.storage === 'loading' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
              >
                {t('exam.label.remotestoring')}
              </Typography>
            ) : select.examState.storage === 'available' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
              >
                {t('exam.label.remotestored')}
              </Typography>
            ) : select.examState.storage === 'alreadyperformed' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
              >
                {t('exam.label.alreadyperformed')}
              </Typography>
            ) : select.examState.storage === 'error' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
              >
                {t('exam.label.storageerror')}
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
