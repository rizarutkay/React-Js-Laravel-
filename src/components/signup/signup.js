import axios from 'axios';
import { useState,useRef,useEffect } from 'react'
import { Link,useHistory  } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner'
axios.defaults.withCredentials = true;

const Signupcomponent=()=>{

    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState('none')
    const history = useHistory()


    useEffect(() => {  
        setShow('block');setLoading(false);
      },[])

const onsubmitt=(e)=>{
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }
    setShow('none'); setLoading(true); 
    signup()
    }

    const signup = async () => {
        const requestOptions = {headers: { 'Accept':'application/json', 'Content-Type': 'application/json'}};
        await axios.get(`http://localhost:8000/sanctum/csrf-cookie`)
        var data={"name":nameRef.current.value,"password":passwordRef.current.value}
        await axios.post(`http://localhost:8000/api/member`,data,requestOptions)
        .then(res => { 
        if(res.status===201) {alert('User Created'); history.push("/"); } 
        },
        error => {setError("Failed to sign up")})
        setLoading(false); setShow('block');
        }  




return (
    <>
    <div  className='testform' style={{display:show}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onsubmitt}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/">Log In</Link>
      </div>  
      </div>


{ loading &&  <div className='centerspinner'><Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>  </div>   }

   

</>

);

}
export default Signupcomponent;