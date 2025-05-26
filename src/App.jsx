import { Routes, Route } from 'react-router-dom'
import Personalise from './pages/Personalise'
import About from './pages/About'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/personalise' element={<Personalise />} />
      </Routes>
    </div>
  )
}

export default App