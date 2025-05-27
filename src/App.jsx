import { Routes, Route } from 'react-router-dom'
import Personalise from './pages/Personalise'
import About from './pages/About'
import Home from './pages/Home'
import Registation from './pages/Registration'
import PrivacyPolicyPage from './pages/Privacy'
import UserGuidesPage from './pages/UserGuidesPage'
import ContactUsPage from './pages/Contact'
import TermsOfServicePage from './pages/TermsOfService'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/personalise' element={<Personalise />} />
        <Route path='/register' element={<Registation />} />
        <Route path='/privacy' element={<PrivacyPolicyPage />} />
        <Route path="/guides" element={<UserGuidesPage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='terms-of-service' element={<TermsOfServicePage />} />
      </Routes>
    </div>
  )
}

export default App