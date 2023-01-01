import React, { useState } from 'react'
import { Alert, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    setError("")
    try {
      await logout()
      navigate("/login")

    }
    catch {
      setError("Failed to log out")
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email : </strong>  {currentUser && currentUser.email}
          <Link to="/update-profile" className='btn btn-info w-100 mt-3'>Update Profile</Link>
        </Card.Body>


      </Card>
      <div className='w-100 text-center mt-2'>
        <Button onClick={handleLogout} className="btn btn-info">Log Out</Button>
      </div>
    </>
  )
}

export default Dashboard
