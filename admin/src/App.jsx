import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import UserListPage from './pages/UserListPage'
import AdminLogin from './pages/AdminLogin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path='admin-login' element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

export default App