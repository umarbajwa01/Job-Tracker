import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  // Still checking localStorage on initial load — don't redirect yet,
  // or we'd incorrectly kick out a genuinely logged-in user.
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute