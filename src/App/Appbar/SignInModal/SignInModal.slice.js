import { createSlice } from '@reduxjs/toolkit'
// Reducers
import appStore from '../../store.js'

const emptyState = {
  open: false,
  disabled: false,
  loading: false,
  state: {},
  //status: 'onhold', // inactivated, notfound
  inputs: {
    login: '',
    password: '',
  },
  errors: {
    login: false,
    password: false,
  },
  nextattempt: 'HH:MM:SS',
  sendactivation: {
    //status: '',
    loading: false,
    disabled: false,
  },
  sendpassword: {
    //status: '',
    loading: false,
    disabled: false,
  },
}

const signinModalSlice = createSlice({
  name: 'signinModalSlice',
  initialState: { ...emptyState },
  reducers: {
    open: (state) => {
      state.open = true
      state.inputs.login = ''
      state.inputs.password = ''
      state.errors.login = false
      state.errors.password = false
      state.state = {}
      state.disabled = false
      state.loading = false
      //state.sendactivation.status = ''
      state.sendactivation.loading = false
      state.sendactivation.disabled = false
      //state.sendpassword.status = ''
      state.sendpassword.loading = false
      state.sendpassword.disabled = false
    },
    close: (state) => {
      state.open = false
    },
    change: (state, action) => {
      if (action.payload.open !== undefined) {
        state.open = action.payload.open
      }
      if (action.payload.state !== undefined) {
        if (action.payload.state.signingin !== undefined) {
          state.state.signingin = action.payload.state.signingin
        }
        if (action.payload.state.sendactivation !== undefined) {
          state.state.sendactivation = action.payload.state.sendactivation
        }
        if (action.payload.state.sendpassword !== undefined) {
          state.state.sendpassword = action.payload.state.sendpassword
        }
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.login !== undefined) {
          state.inputs.login = action.payload.inputs.login
        }
        if (action.payload.inputs.password !== undefined) {
          state.inputs.password = action.payload.inputs.password
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.login !== undefined) {
          state.errors.login = action.payload.errors.login
        }
        if (action.payload.errors.password !== undefined) {
          state.errors.password = action.payload.errors.password
        }
      }
      // Next attempt
      if (action.payload.nextattempt !== undefined) {
        const rightnow = new Date();
        const event = new Date(action.payload.nextattempt);
        // UX
        state.nextattempt = event.toLocaleTimeString('fr-FR')
        // Timeout
        let t = setTimeout(function () {
          appStore.dispatch({
            type: 'signinModalSlice/change',
            payload: {
              state: {
                signingin: ''
              },
              disabled: false,
            },
          })
        }, event - rightnow);
      }
      // Lock
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled
      }
      if (action.payload.loading !== undefined) {
        state.loading = action.payload.loading
      }
      // Send activation
      if (action.payload.sendactivation !== undefined) {
        if (action.payload.sendactivation.loading !== undefined) {
          state.sendactivation.loading = action.payload.sendactivation.loading
        }
        if (action.payload.sendactivation.disabled !== undefined) {
          state.sendactivation.disabled = action.payload.sendactivation.disabled
        }
      }
      // Send password
      if (action.payload.sendpassword !== undefined) {
        if (action.payload.sendpassword.loading !== undefined) {
          state.sendpassword.loading = action.payload.sendpassword.loading
        }
        if (action.payload.sendpassword.disabled !== undefined) {
          state.sendpassword.disabled = action.payload.sendpassword.disabled
        }
      }
    },
    lock: (state, action) => {
      if (action.payload === undefined) {
        action = { payload: {} }
      }
      if (Object.keys(action.payload).length === 0) {
        // Locking the modal
        state.state.signingin = "loading"
        state.disabled = true
        state.loading = true
      } else {
        switch (action.payload) {
          case 'activation':
            state.state.sendactivation = "loading"
            state.sendactivation.disabled = true
            state.sendactivation.loading = true
            state.disabled = true
            state.loading = true
            break
          case 'password':
            state.state.sendpassword = "loading"
            state.sendpassword.disabled = true
            state.sendpassword.loading = true
            state.disabled = true
            state.loading = true
            break
          case 'modal':
          default:
            state.disabled = true
            state.loading = true
            break
        }
      }
    },
    unlock: (state, action) => {
      if (action.payload === undefined) {
        action = { payload: {} }
      }
      if (Object.keys(action.payload).length === 0) {
        // Locking the modal
        state.disabled = false
        state.loading = false
      } else {
        switch (action.payload) {
          case 'activation':
            state.sendactivation.disabled = false
            state.sendactivation.loading = false
            state.disabled = false
            state.loading = false
            break
          case 'password':
            state.sendpassword.disabled = false
            state.sendpassword.loading = false
            state.disabled = false
            state.loading = false
            break
          case 'modal':
          default:
            state.disabled = false
            state.loading = false
            break
        }
      }
    },
  },
})

export default signinModalSlice.reducer
