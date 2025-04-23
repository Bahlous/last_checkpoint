import React from 'react';
import{Card} from 'react-bootstrap';
import "../App.css";
const Footer = () => {
  return (
    <div style={{marginTop:"50px", position:"absolute", width:"100%", bottom:"-100%"}}>
    {" "}
    <Card>
    <Card.Header>See you soon</Card.Header>
    <Card.Body>
      <blockquote className="blockquote mb-0">
        <p>
        Contact US if you need something: 28042666
        </p>
        <footer className="blockquote-footer">
        &copy; 2025 rights deserved
        
        </footer>
      </blockquote>
    </Card.Body>
  </Card>
</div>
  )
}

export default Footer