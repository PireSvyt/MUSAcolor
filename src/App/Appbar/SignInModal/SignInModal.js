import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Services
import {
  serviceAuthSignIn,
  serviceAuthSendPassword,
} from '../../services/auth.services.js'
// Reducers
import appStore from '../../store.js'

export default function SignInModal() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("SignInModal");
  }
  // i18n
  const { t } = useTranslation()

  // Constants
  const componentHeight = window.innerHeight - 115

  // Selects
  const select = {
    open: useSelector((state) => state.signinModalSlice.open),
    userState: useSelector((state) => state.signinModalSlice.state),
    disabled: useSelector((state) => state.signinModalSlice.disabled),
    loading: useSelector((state) => state.signinModalSlice.loading),
    inputs: useSelector((state) => state.signinModalSlice.inputs),
    errors: useSelector((state) => state.signinModalSlice.errors),
    //sendactivation :  useSelector((state) => state.signinModalSlice.sendactivation),
    sendpassword: useSelector((state) => state.signinModalSlice.sendpassword),
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'signinModalSlice/close',
      })
    },
    login: (e) => {
      appStore.dispatch({
        type: 'signinModalSlice/change',
        payload: {
          inputs: {
            login: e.target.value,
          },
          errors: {
            login: false,
          },
        },
      })
    },
    password: (e) => {
      appStore.dispatch({
        type: 'signinModalSlice/change',
        payload: {
          inputs: {
            password: e.target.value,
          },
          errors: {
            password: false,
          },
        },
      })
    },
    signin: () => {
      console.log('SignInModal.signin')
      serviceAuthSignIn()
    },
    /*gotosignup: () => {
      appStore.dispatch({
        type: "signupModalSlice/open",
      });
      changes.close()
    },*/
    /*sendactivation: () => {
      console.log("SignInModal.sendactivation");
      serviceAuthSendActivation()
    },*/
    resetpassword: () => {
      console.log('SignInModal.resetpassword')
      serviceAuthSendPassword()
    },
  }

  // Render
  return (
    <Box>
      <Dialog
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-sign in"
      >
        <DialogTitle>{t('signin.label.title')}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
          }}
        >
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <FormControl>
              <TextField
                name="login"
                required
                label={t('generic.input.email')}
                variant="standard"
                value={select.inputs.login}
                onChange={changes.login}
                autoComplete="off"
                type="email"
                error={select.errors.login}
                data-testid="modal-sign in-input-login"
              />
              <TextField
                name="password"
                required
                label={t('generic.input.password')}
                variant="standard"
                value={select.inputs.password}
                onChange={changes.password}
                autoComplete="off"
                type="password"
                error={select.errors.password}
                data-testid="modal-sign in-input-password"
              />
              <LoadingButton
                variant="outlined"
                onClick={changes.resetpassword}
                sx={{ mt: 2, mb: 1 }}
                disabled={
                  select.sendpassword.disbaled ||
                  select.userState.sendpassword === 'available'
                }
                loading={select.sendpassword.loading}
                data-testid="modal-sign in-button-reset password"
              >
                {t('signin.button.resetpassword')}
              </LoadingButton>

              {select.userState.signingin === 'notfound' ||
              select.userState.sendpassword === 'notfound' ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  data-testid="modal-sign in-box-error on finding account"
                >
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 1,
                      whiteSpace: 'pre-line',
                    }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t('signin.label.notfoundaccount')}
                  </Typography>
                  {/*<Button
                    variant="contained"
                    sx={{ mt: 1, width: "100%" }}
                    onClick={changes.gotosignup}
                    data-testid="modal-sign in-button-open sign up modal"
                  >
                    {t("signin.button.gotosignup")}
                  </Button>*/}
                </Box>
              ) : null}

              {select.userState.sendpassword === 'available' ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  data-testid="modal-sign in-box-password sent"
                >
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 1,
                      whiteSpace: 'pre-line',
                    }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t('signin.label.successsendingpassword')}
                  </Typography>
                </Box>
              ) : null}
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="modal-sign in-button-close"
            onClick={changes.close}
          >
            {t('generic.button.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={changes.signin}
            disabled={select.disabled || select.userState.signingin === 'inactivated'}
            loading={select.loading}
            data-testid="modal-sign in-button-proceed"
          >
            {t('generic.button.proceed')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

/**
 * 

              {select.userState.sendactivation === "available" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  data-testid="modal-sign in-box-activation sent"
                >
                  <Typography
                    sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t("signin.label.successresendingactivation")}
                  </Typography>
                </Box>
              ) : null}
 

              {select.userState.signingin === "inactivated" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  data-testid="modal-sign in-box-inactive account"
                >
                  <Typography
                    sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
                    variant="body1"
                    component="span"
                    align="center"
                  >
                    {t("signin.label.inactiveaccount")}
                  </Typography>
                  <LoadingButton
                    variant="contained"
                    sx={{ mt: 1, width: "100%" }}
                    onClick={changes.sendactivation}
                    disabled={
                      select.sendactivation.disabled || select.userState.sendactivation === "available"
                    }
                    loading={select.sendactivation.loading}
                    data-testid="modal-sign in-button-send activation"
                  >
                    {t("signin.button.resendactivationemail")}
                  </LoadingButton>
                </Box>
              ) : null}
 * 
 */
