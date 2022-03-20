import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './NavBar';
import axios from 'axios';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { create } from "ipfs-http-client";
import Footer from './Footer';
const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const client = create('https://ipfs.infura.io:5001/api/v0');



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function ReportAnimal() {

  let [alertStateTrue,setAlertStateTrue] = React.useState(false);
  let [alertStateFalse,setAlertStateFalse] = React.useState(false);
  let [disasterPhoto,setDisasterPhoto] = React.useState('');
  let [ImgHash,setImgHash] = React.useState('');
  const [personName, setPersonName] = React.useState([]);
  const [imgName,setImgName] = React.useState('');
  const [loaded,setLoaded] = React.useState(true);
  const [person, setPerson] = React.useState({});
  useEffect(()=>{
    if (loaded){
      axios.post("http://localhost:5000/user/api/show",{
      "id_user":localStorage.getItem('id_user'),
    }).then((resu)=>{ 
        console.log(resu)
        setLoaded(false)
        setPerson(resu.data[0]);
    })
    }
    
  },[])
  

  
   const documentUpload= async (event)=>{
    try {
      const created = await client.add(event.target.files[0]);
      setImgName(event.target.files[0].name);
      
      setImgHash("https://ipfs.infura.io:5001/ipfs/"+created.path);
      
    } catch (error) {
      console.log(error.message);
    }

  }
    const handleSubmit = async(event) => {
      event.preventDefault();
      const id = localStorage.getItem('id_user');
      const data = new FormData(event.currentTarget); 
      axios.post("http://localhost:5000/user/api/document",{
        id_user:id,
        document:ImgHash
      })
    };
    const Input = styled('input')({
        display: 'none',
      });

      useEffect(() => {
        const timer = setTimeout(() => {
          if (alertStateTrue == true){
            setAlertStateTrue(false);
          }
        }, 1000);
        return () => clearTimeout(timer);
      }, [alertStateTrue]);

      useEffect(() => {
        const timer = setTimeout(() => {
          if (alertStateFalse == true){
            setAlertStateFalse(false);
          }
        }, 1000);
        return () => clearTimeout(timer);
      }, [alertStateFalse]);
      
    return (
      
      <ThemeProvider theme={theme}>
        <Navbar/>
        { alertStateTrue && <Alert severity="success" sx ={{
          marginTop:"20px", 
          width:"200px",
          marginLeft : "20px"

        }}>{"Success"}</Alert>}
        { alertStateFalse && <Alert severity="error" sx ={{
          marginTop:"20px", 
          width:"200px",
          marginLeft : "20px"

        }}>{"Something Went Wrong"}</Alert>}
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
          <Avatar variant="rounded" > P </Avatar>
            <Typography component="h1" variant="h5">
                Profile
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                disabled
                fullWidth
                id="name"
                name="name"
                value={person.name}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                value={person.phone}
                id="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                id="state"
                value={person.state}
                name="state"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                id="city"
                value={person.city}
                name="city"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                value={person.address}
                id="address"
                name="address"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                disabled
                id="pincode"
                value = {person.pincode}
                name="pincode"
                autoFocus
              />
            { person.verificationDocument == '' && 
            <label htmlFor="contained-button-file">
                <Input accept="pdf" id="contained-button-file"  type="file" onChange={documentUpload}/>
                <Button variant="contained" component="span">
                Document Upload
                </Button>
            </label>}
            <Button disabled>{imgName != undefined? imgName :''}</Button>
            <TextField
                margin="normal"
                required
                fullWidth
                id="inAppCurrency"
                name="coins"
                disabled
                value = {person.inAppCurrency}
                autoFocus
              />
              <Grid container>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
        
                </Grid>
              </Grid>
            </Box>
            
          </Box>
          
        </Container>
        <Footer/>
      </ThemeProvider>
    );
  }