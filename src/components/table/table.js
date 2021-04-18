import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react'
import AddeditBook from '../addeditbook/addeditbook'
import axios from 'axios';
import auth from "../../auth";
import Spinner from 'react-bootstrap/Spinner'
import { Button} from "react-bootstrap"


axios.defaults.withCredentials = true; 

const Tablecomponent=()=>{

  const [books, setBooks] = useState([])
  const [actiontype, setactiontype] = useState('')
  const [bookid, setbookid] = useState(0)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState('hidden')



  useEffect(() => { 
    fetchBooks()
  }, [])

  const fetchBooks = async () => {  
    const requestOptions = { 
      
      headers: { 'Content-Type': 'application/json', 'Authorization': auth.usertoken},

  };
     console.log(requestOptions);
    await axios.get('http://localhost:8000/api/book',requestOptions)
    .then(res => {
    setBooks(res.data)
    })
    setShow('block');setLoading(false);

  }

  const deleteBook = async (id) => {
    const requestOptions = {
      credentials : "include",
      headers: { 'Accept':'application/json', 'Content-Type': 'application/json', 'Authorization': auth.usertoken},
  };

    await axios.delete(`http://localhost:8000/api/book/${id}`,requestOptions)
    .then(res => {
      res.data === 1 ? setBooks(books.filter((book) => book.id !== id)) : alert('Error Deleting This Task')
    })



  }

  const editrow = (id) => {
    setbookid(id);
    setactiontype('Edit');
   }

   const updatetable= (data,tip)=>{
     if(tip==='Edit')
     {  console.log(data);
        setBooks(books.map((task) =>task.id === data.id ? { ...task, 
        bookname:data.bookname, genre:data.genre,author:data.author,page:data.page } : task )   )
     }
     else if(tip==='Add')
     {
     setBooks([...books, data])
     }
   }

   const logout = async () => { 
    const requestOptions = {
    headers: { 'Accept':'application/json', 'Content-Type': 'application/json','Authorization': auth.usertoken},};
    
    var data={"name":localStorage.getItem('username'),"password":localStorage.getItem('password')}
    await axios.post(`http://localhost:8000/api/logout`,data,requestOptions)
    .then(res => { 
    if(res.status===200) {auth.logout();} 
    },
    error => {alert('Could not login')})

    }  


return (

<div>
  <div align="right"><Button type='button' onClick={()=>logout()}>Logout</Button> </div>
  <div align="left"><Button type='button' onClick={()=>setactiontype('Add')}>Yeni Sipariş Ekle</Button> </div>

  <div style={{display:show}}>
 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell>Book ID</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Page</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { books.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.bookname}</TableCell>
              <TableCell>{row.genre}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.page}</TableCell>
              <TableCell>
                <Button type='button' onClick={()=> editrow(row.id)}> Edit</Button> {' '}
                <Button type='button' onClick={() => deleteBook(row.id)}> Sil</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </div>

   
{ (actiontype==='Edit' || actiontype==='Add') && 
<AddeditBook setaction={()=>setactiontype('')} actiontype={actiontype} bookid={bookid} updatetable={updatetable} />   }

{ loading &&  <div className='centerspinner'><Spinner animation="border" role="status">
<span className="sr-only">Loading...</span>
</Spinner>  </div>   }

</div>
);
}

export default Tablecomponent;
