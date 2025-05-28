import React, { useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
    const [isAuthenticated] = useState(false)

    if (!isAuthenticated) {
        return <Navigate to="/register" />
    }

    return (
        <div>
            called
            {children}
        </div>
    )
}

export default ProtectRoute