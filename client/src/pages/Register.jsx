import React, { useState } from 'react';
import{Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {register} from "../JS/actions/authAction";
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [newUser, setNewUser] = useState({
    name:"", email:"", password:"", phone:""
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(newUser);
  const handleChange = (e) =>{
    setNewUser({...newUser, [e.target.name]: e.target.value});
  };
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(newUser, navigate ));
    navigate("/profile");
  };
  return (
    <div className='page container'>
      <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="Name" placeholder="Enter name" 
        name='name' value={newUser.name} onChange={handleChange}/>
        
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' 
        value={newUser.email} onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'
        value={newUser.password} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Phone</Form.Label>
        <Form.Control type="Number" placeholder="Phone number" name='phone'
        value={newUser.phone} onChange={handleChange}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default Register;