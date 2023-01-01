import React , { useRef, useState }from 'react'
import { Alert, Card, Form, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'



const UpdateProfile = () => {
  const { currentUser } = useAuth()
  const {updateUserEmail,updateUserPassword}=useAuth()
  
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const navigate=useNavigate()
  const handleSubmit =  (e) => {
    e.preventDefault()
    if(passwordRef.current.value!==passwordConfirmationRef.current.value){
      return setError("Passwords do not match")
    }

    const promises=[]
    setLoading(true)
    setError("")
     
    if(emailRef.current.value!== currentUser.email){
      promises.push(updateUserEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
      promises.push(updateUserPassword(passwordRef.current.value))
    }
    Promise.all(promises).then(()=>{
      navigate("/")
    }).catch(()=>{
      setError("Failed to update account")
    }).finally(()=>{
      setLoading(false)
    })
   
    
    
  }
 
  return (
    <>
    <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>Update Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}

        <Form onSubmit={handleSubmit}>

          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control type="email" id="email" ref={emailRef} defaultValue={ currentUser?.email} required/>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id="password" ref={passwordRef} />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password-confirmation">Password Confirmation</Form.Label>
            <Form.Control type="password" id="password-confirmation" ref={passwordConfirmationRef} />
          </Form.Group>

          <Button variant='outline-info' type='submit' className='w-100 mt-3' disabled={loading}>Update</Button>
        </Form>
      </Card.Body>

    </Card>
    <div className='w-100 text-center mt-2 '>
      <Link to="/">Cancel</Link>

    </div>
    </>
  )
}

export default UpdateProfile
