import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import { serviceComparisonGetExamList } from '../services/comparison.services.js'
import Appbar from '../Appbar/Appbar.js'
import ComparePVO from './ComparePVO/ComparePVO.js'
import appStore from '../store.js'

export default function Comparison() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Comparison')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    authloaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    comparisonState: useSelector((state) => state.comparisonSlice.state),
    comparisonType: useSelector((state) => state.comparisonSlice.type),
    comparisonContent: useSelector((state) => state.comparisonSlice.content),
  }

  // Changes
  let changes = {
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
      let comparisonInputs = {}
      queries.forEach((query) => {
        let queryBreakdown = query.split('=')
        comparisonInputs[queryBreakdown[0]] = queryBreakdown[1]
      })
      console.log("comparisonInputs", comparisonInputs)
      if (Object.keys(comparisonInputs).includes('patientid')) {
	      if (Object.keys(comparisonInputs).includes('type')) {
		      appStore.dispatch({
		        type: 'comparisonSlice/change',
		        payload: comparisonInputs.type
		      })
		      if (Object.keys(comparisonInputs).includes('examids')) {
			      let examids = []
			      let examidsstring = comparisonInputs["examids"].slice(1, -1).split(',')
			      examidsstring.forEach (eid => {
				      examids.push(eid.slice(1, -1))
			      })	      
		        if (select.comparisonState === "") {
                  console.log("fetching comparisonContent")
		          serviceComparisonGetExamList({
		            patientid: comparisonInputs.patientid,
		            type: comparisonInputs.type,
		            examids: examids,
		          })
		        }
		      }
	      }
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
        route="compare"
        title={
          t('comparison.label.title') +
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
            select.comparisonState === 'denied' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
                data-testid="page-exam-label-deniedaccess"
              >
                {t('generic.label.deniedaccess')}
              </Typography>
            ) : select.comparisonType === 'unknown' ? (
              <Typography
                sx={{ p: 2 }}
                component="span"
                variant="h5"
                gutterBottom
              >
                {t('exam.label.unknown')}
              </Typography>
            ) : select.comparisonType === 'pvo' ? (
              <ComparePVO
                content={select.comparisonContent}
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