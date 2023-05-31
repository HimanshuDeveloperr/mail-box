import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="d-flex justify-content-center">
      <Card className="col-3 mx-auto text-center mt-5  bg-secondary shadow-lg">
        <Card.Header>SignUp</Card.Header>
        <Card.Body>
            <Form>
        <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password"  />
            </Form.Group>

            <Button variant="warning" type="submit" className='m-2'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div>
        <p>Have an account <NavLink to="/login" className="text-warning">Login</NavLink></p>
      </div>
      </Card>
      
    </div>
  );
};

export default Signup;
