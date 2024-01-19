import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Admin from './Admin/Admin.js'
import Home from './Home/Home.js'
import Patient from './Patient/Patient.js'
import Exam from './Exam/Exam.js'
import PasswordReset from './PasswordReset/PasswordReset.js'
import Help from './Help/Help.js'

// Services
import { serviceAuthAssessCookie } from './services/auth.services.js'

export default function App() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('App')
  }

  // Gather token from cookies
  serviceAuthAssessCookie()

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/patient/:patientid" element={<Patient />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  )
}
/*
        <Route path="/activation/:token" element={<Activation />} />
 */
