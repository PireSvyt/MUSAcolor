export function random_id(length = 8) {
  // TESTED
  var temp_id = Math.random().toString(16).substr(2, length)
  var container = document.getElementById(temp_id)
  while (container != null) {
    temp_id = Math.random().toString(16).substr(2, length)
    container = document.getElementById(temp_id)
  }
  return temp_id
}

export function random_string(length = 24) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export function validateEmail(email) {
  /*

  Return a validation of an email matched format

  Source : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

  */
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export function appendObject(obj, append) {
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

export function stringifyDate(givenDate) {
  let date = new Date(givenDate)
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  return date.toLocaleString('fr-FR', options)
  //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
}

export function toTimeString(seconds) {
  var sec_num = parseInt(seconds, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  return minutes + 'min'
  /*
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
  */
}

export const debounce = (mainFunction, delay) => {
  // https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc

  // Declare a variable called 'timer' to store the timer ID
  let timer

  // Return an anonymous function that takes in any number of arguments
  return function (...args) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer)

    // Set a new timer that will execute 'mainFunction' after the specified delay
    timer = setTimeout(() => {
      mainFunction(...args)
    }, delay)
  }
}

export function throttle(mainFunction, delay) {
  // https://dev.to/jeetvora331/throttling-in-javascript-easiest-explanation-1081

  let timerFlag = null // Variable to keep track of the timer

  // Returning a throttled version
  return (...args) => {
    if (timerFlag === null) {
      // If there is no timer currently running
      mainFunction(...args) // Execute the main function
      timerFlag = setTimeout(() => {
        // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null // Clear the timerFlag to allow the main function to be executed again
      }, delay)
    }
  }
}
