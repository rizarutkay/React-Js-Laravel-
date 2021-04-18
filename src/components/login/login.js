import axios from 'axios';
import { useState,useRef,useEffect } from 'react'
import auth from "../../auth";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link,useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
axios.defaults.withCredentials = true;

const Logincomponent=()=>{

    const nameRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState('none')
    const [error, setError] = useState("")

useEffect(() => {  
setShow('block');setLoading(false);
},[])

const onsubmitt=(e)=>{
    e.preventDefault()
    setShow('none'); setLoading(true); 
    login()
    }

    const login = async () => {
    await axios.get(`http://localhost:8000/sanctum/csrf-cookie`)
    const requestOptions = {headers: { 'Accept':'application/json', 'Content-Type': 'application/json'},};
    var username=nameRef.current.value; var password=passwordRef.current.value; 
    var data={"name":username,"password":password}
    await axios.post(`http://localhost:8000/api/login`,data,requestOptions)
    .then(res => { 
    if(res.status===201 && res.data.token) { var token=res.data.token; auth.login(token,username,password,() => {  history.push("/table")   })      ;} 
    },
    error => {setError("Failed to log in")})
    setLoading(false); setShow('block');
    }   




return (
    <>
    <div className='testform' style={{display:show}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont have an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>

{ loading &&  <div className='centerspinner'><Spinner animation="border" role="status">
<span className="sr-only">Loading...</span>
</Spinner>  </div>   }

</>
);

}
export default Logincomponent;