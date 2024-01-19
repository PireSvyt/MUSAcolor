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

export function debounce(func, timeout = 150) {
  /*

  Allows to to debounce a function

  Source : https://www.freecodecamp.org/news/javascript-debounce-example/

  */
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
