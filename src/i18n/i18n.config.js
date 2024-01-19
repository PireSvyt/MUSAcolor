import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Language reset on refresh from cookies
import Cookies from 'js-cookie'
let language = Cookies.get('musacolor_language')
if (language === undefined) {
  language = 'frFR'
}

i18n.use(initReactI18next).init({
  fallbackLng: 'frFR',
  lng: language,
  resources: {
    frFR: {
      translations: require('./i18n.frFR.json'),
    },
    enGB: {
      translations: require('./i18n.enGB.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
})

i18n.languages = ['frFR', 'enGB']

export default i18n
