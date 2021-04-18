import {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import auth from "../../auth";
import Spinner from 'react-bootstrap/Spinner'
import { Button} from "react-bootstrap"

axios.defaults.withCredentials = true;

const AddeditBook=({setaction,actiontype,bookid,updatetable})=>{

  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState('none')

    useEffect(() => {
        fetchBook()
      },[]);
    



    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          bbook: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      

      const fetchBook = async () => {
          if(actiontype==='Edit'){ 
          const requestOptions = {
            credentials : "include",
            headers: { 'Accept':'application/json', 'Content-Type': 'application/json', 'Authorization': auth.usertoken},
        };
        await axios.get(`http://localhost:8000/api/book/${bookid}`,requestOptions)
        .then(res => {
          var data=res.data
          setbookname(data.bookname);
          setgenre(data.genre);
          setauthor(data.author);
          setpage(data.page);
          })
        }
        setShow('block');setLoading(false);
    }
      

      const updateBook = async (id,book) => {
        const requestOptions = {
          credentials : "include",
          headers: { 'Accept':'application/json', 'Content-Type': 'application/json', 'Authorization': auth.usertoken},
      };
      var data=JSON.stringify(book)
      await axios.put(`http://localhost:8000/api/book/${id}`,data,requestOptions)
      .then(res => { 
        if(res.status===200 && res.data.id) { book.id=res.data.id; updatetable(book,'Edit') }
        else { alert('Error Editing This Task') }   } )
    }

    const addBook = async (book) => {
      const requestOptions = {
      credentials : "include",
      headers: { 'Accept':'application/json', 'Content-Type': 'application/json', 'Authorization': auth.usertoken},
    };

    var data=JSON.stringify(book)
    await axios.post(`http://localhost:8000/api/book`,data,requestOptions)
    .then(res => { 
      if(res.status===201) { book.id=res.data.id; updatetable(book,'Add') }
      else { alert('Error Adding This Task') }   } )
    }

        const classes = useStyles();
        const [open, setOpen] = useState(true);
      
        //const handleOpen = () => {setOpen(true);};
      
        const handleClose = () => {
          setOpen(false);
          setaction('');
        };

        const [bookname,setbookname] =useState('');
        const [genre,setgenre] =useState('');
        const [author,setauthor] =useState('');
        const [page,setpage] =useState('');


    const onsubmitt=(e)=>{
        e.preventDefault();
        var book=({"bookname":bookname,"genre":genre,"author":author,"page":page})

        if(actiontype==='Edit'){
        updateBook(bookid,book)
        }
        else if(actiontype==='Add'){
        addBook(book)
        }
        setbookname('');
        setgenre('');
        setauthor('');
        setpage('');

        setOpen(false);
        setaction();

        }



return(
<>

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
<Fade in={open}>

<div className={classes.paper}>

<div  style={{display:show}}>
<form id='testform' onSubmit={onsubmitt}>
<label>Product Id:</label><input  type='text' value={bookname}  onChange={(e)=>setbookname(e.target.value)}></input>
<label>Genre:</label><input  type='text' value={genre}  onChange={(e)=>setgenre(e.target.value)}></input>
<label>Adress</label><input  type='text' value={author} onChange={(e)=>setauthor(e.target.value)}></input>
<label>Page</label><input type='text' value={page}  onChange={(e)=>setpage(e.target.value)}></input> {' '}

<Button type='submit' >{actiontype}</Button>
</form>
</div>




{ loading &&  <div className='centerspinner-modal'><Spinner animation="border" role="status">
<span className="sr-only">Loading...</span>
</Spinner>  </div>   }

</div>

</Fade>





</Modal>




</>
)
}



export default AddeditBook;