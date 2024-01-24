let debugProceedCheck = false

function serviceProceedCheck(serviceInputs, serciveChecks) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('serviceProceedCheck')
  }

  let serviceCheckOutcome = {
    proceed: true,
    errors: [],
    stateChanges: {
      errors: {},
    },
    confirmation: undefined,
  }

  // Check functions
  function failedCheck(check) {
    let failedOutcome = {
      proceed: false,
      errors: [],
      stateChanges: {
        errors: {},
      },
      confirmation: undefined,
    }
    failedOutcome.errors.push(check.error)
    // Fields to flag in error
    check.fieldsinerror.forEach((error) => {
      failedOutcome.stateChanges.errors[error] = true
    })
    // Trigger confirmation
    if (check.confirmation !== undefined) {
      failedOutcome.confirmation = check.confirmation
    }
    return failedOutcome
  }
  function checkField(field, check) {
    if (debugProceedCheck === true) {
      console.log('checkField')
      console.log('. check', check)
      console.log('. field', field)
    }
    let checkFieldFunctOutcome = {
      proceed: true,
      errors: [],
      stateChanges: {
        errors: {},
      },
      confirmation: undefined,
    }
    if (field === undefined || field === null) {
      checkFieldFunctOutcome = updateOutcome(
        checkFieldFunctOutcome,
        failedCheck(check)
      )
    } else {
      switch (typeof field) {
        case 'string':
          if (field === '') {
            checkFieldFunctOutcome = updateOutcome(
              checkFieldFunctOutcome,
              failedCheck(check)
            )
          }
          break
        case 'number':
          if (field === null) {
            checkFieldFunctOutcome = updateOutcome(
              checkFieldFunctOutcome,
              failedCheck(check)
            )
          }
          break
        case 'object':
          if (Object.keys(field).length === 0) {
            checkFieldFunctOutcome = updateOutcome(
              checkFieldFunctOutcome,
              failedCheck(check)
            )
          }
          break
        case 'boolean':
          if ((field !== true) & (field !== false)) {
            checkFieldFunctOutcome = updateOutcome(
              checkFieldFunctOutcome,
              failedCheck(check)
            )
          }
          break
        default:
          console.log(
            'serviceProceedCheck unmanaged field type : ',
            typeof field,
            ' of inputs ',
            field
          )
          checkFieldFunctOutcome = updateOutcome(
            checkFieldFunctOutcome,
            failedCheck(check)
          )
      }
      // Custom checks
      if (check.checkfunction !== undefined) {
        let checkfunctionOutcome = check.checkfunction(serviceInputs)
        checkFieldFunctOutcome = updateOutcome(
          checkFieldFunctOutcome,
          checkfunctionOutcome
        )
      }
      // Subsequent checks
      if (checkFieldFunctOutcome.proceed && check.subchecks !== undefined) {
        check.subchecks.forEach((subcheck) => {
          let subcheckOutcome = {}
          if (subcheck.field !== undefined) {
            subcheckOutcome = checkField(field[subcheck.field], subcheck)
          } else {
            subcheckOutcome = checkField(field, subcheck)
          }
          checkFieldFunctOutcome = updateOutcome(
            checkFieldFunctOutcome,
            subcheckOutcome
          )
        })
      }
    }
    return checkFieldFunctOutcome
  }

  // Run checks
  //console.log('serciveChecks serviceInputs', serviceInputs)
  serciveChecks.forEach((check) => {
    if (debugProceedCheck === true) {
      console.log('serciveChecks[check]', check)
    }
    let checkFieldOutcome = checkField(serviceInputs[check.field], check)
    serviceCheckOutcome = updateOutcome(serviceCheckOutcome, checkFieldOutcome)
  })

  //console.log(">> serviceCheckOutcome ", serviceCheckOutcome)

  // Outcome
  return serviceCheckOutcome
}

function appendObject(obj, append) {
  Object.keys(append).forEach((key) => {
    if (obj[key] === undefined) {
      obj[key] = append[key]
    } else {
      if (typeof obj[key] === 'object') {
        obj[key] = appendObject(obj[key], append[key])
      } else {
        obj[key] = append[key]
      }
    }
  })
  return obj
}

export function updateOutcome(outcome, suboutcome) {
  if (suboutcome.proceed === false) {
    // Outcome
    outcome.proceed = false
    // Errors
    if (suboutcome.errors !== undefined) {
      suboutcome.errors.forEach((err) => {
        if (!outcome.errors.includes(err)) {
          outcome.errors.push(err)
        }
      })
    }
    // State changes
    if (suboutcome.stateChanges !== undefined) {
      outcome.stateChanges = appendObject(
        outcome.stateChanges,
        suboutcome.stateChanges
      )
    }
    // Confirmation
    if (suboutcome.confirmation !== undefined) {
      outcome.confirmation = suboutcome.confirmation
    }
  }
  return outcome
}

export default serviceProceedCheck
