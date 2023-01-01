import React, { useState, useRef } from "react";
import { Card, Alert } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, { replace: true });
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef} />
            </Form.Group>

            <Button
              variant="outline-info"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Log In
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            Forgot Password <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Create an account ? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
