import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Components
import Appbar from '../Appbar/Appbar.js'

export default function Help() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Help')
  }
  // i18n
  const { t } = useTranslation()

  return (
    <Box data-testid="page-help">
      <Appbar route="help" title={t('generic.label.help')} />
      <Box sx={{ height: 80 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '80%' }}>
          {/** COOKIES */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">
                {t('help.faq.cookies.section')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/** Cookies policy */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.cookies.policy.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.cookies.policy.explanations')}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/** Cookies use */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.cookies.use.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ mb: 3, whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.cookies.use.explanations')}
                  </Typography>
                  {/** Cookies JWT */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">
                        {t('help.faq.cookies.use.jwt.section')}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        align="justify"
                        gutterBottom
                        sx={{ whiteSpace: 'pre-line' }}
                      >
                        {t('help.faq.cookies.use.jwt.explanations')}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/** Cookies language */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">
                        {t('help.faq.cookies.use.language.section')}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        align="justify"
                        gutterBottom
                        sx={{ whiteSpace: 'pre-line' }}
                      >
                        {t('help.faq.cookies.use.language.explanations')}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
          {/** SECURITY */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">
                {t('help.faq.security.section')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/** Password reset */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.security.passwordreset.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.security.passwordreset.explanations')}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/** No email on password reset */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.security.nomailpasswordreset.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.security.nomailpasswordreset.explanations')}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/** Password managementy */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.security.passwordmanagement.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.security.passwordmanagement.explanations')}
                  </Typography>
                  <Link
                    sx={{
                      typography: 'body1',
                      '& > :not(style) + :not(style)': { ml: 2 },
                    }}
                    href={
                      'https://fr.wikipedia.org/wiki/Advanced_Encryption_Standard'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('help.faq.security.passwordmanagement.source')}
                  </Link>
                </AccordionDetails>
              </Accordion>
              {/** Data storage */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.security.datastorage.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ mb: 3, whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.security.datastorage.explanations')}
                  </Typography>
                  <Link
                    sx={{
                      typography: 'body1',
                      '& > :not(style) + :not(style)': { ml: 2 },
                    }}
                    href={'https://en.wikipedia.org/wiki/Bcrypt'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('help.faq.security.datastorage.source')}
                  </Link>
                </AccordionDetails>
              </Accordion>
              {/** Data access */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t('help.faq.security.dataaccess.section')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    align="justify"
                    gutterBottom
                    sx={{ mb: 3, whiteSpace: 'pre-line' }}
                  >
                    {t('help.faq.security.dataaccess.explanations')}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
          {/** PRACTICIAN SPACE */}
          {/** PATIENT SPACE */}
          {/** THE APP */}
        </Box>
      </Box>
    </Box>
  )
}
