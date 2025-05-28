import { Routes, Route } from 'react-router-dom'
import Personalise from './pages/Personalise'
import About from './pages/About'
import Home from './pages/Home'
import Registation from './pages/Registration'
import PrivacyPolicyPage from './pages/Privacy'
import UserGuidesPage from './pages/UserGuidesPage'
import ContactUsPage from './pages/Contact'
import TermsOfServicePage from './pages/TermsOfService'
import ProtectRoute from './hooks/ProtectRoute'
import Dashboard from './pages/Dashboard'
import PreviewVideo from './pages/PreviewVideo'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/personalise' element={<ProtectRoute><Personalise /></ProtectRoute>} /> */}
        <Route path='/personalise' element={<Personalise />} />
        <Route path='/register' element={<Registation />} />
        <Route path='/privacy' element={<PrivacyPolicyPage />} />
        <Route path="/guides" element={<UserGuidesPage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='terms-of-service' element={<TermsOfServicePage />} />
        <Route path='/dashboard' element={<ProtectRoute>
          <Dashboard />
        </ProtectRoute>} />
        <Route path='/preview' element={<PreviewVideo />} />
      </Routes>
    </div>
  )
}

export default App