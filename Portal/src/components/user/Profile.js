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

  const [username,setName] = React.useState('');
  const [phone,setPhone] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [address,setAddress] = React.useState('');
  const [city,setCity] = React.useState('');
  const [pincode,setPincode] = React.useState('');
  const [state,setState] = React.useState('');
  const [inAppCurrency,setInAppCurrency] = React.useState('');
  
  const Data = ()=>{
    axios.get('http://localhost:5000/user/api/show')
    .then(res=>{
      setName(res.data[0].name);
      setPhone(res.data[0].phone);
      setEmail(res.data[0].email);
      setAddress(res.data[0].address);
      setCity(res.data[0].city);
      setPincode(res.data[0].pincode);
      setState(res.data[0].state);

    })
  }
  const disImageUpload= async (event)=>{
    
    try {
      const created = await client.add(event.target.files[0]);
      setImgHash(created.path);     
      setImgName(event.target.files[0].name);
    } catch (error) {
      console.log(error.message);
    }

  }
    const handleSubmit = async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget); 
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
        {Data()}
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
                label="Name"
                name="name"
                value={"Akhilesh"}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                value={"9029298389"}
                id="phone"
                label="Phone"
                name="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                id="state"
                value={"Maharashtra"}
                label="State"
                name="state"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                id="city"
                value={"Mumbai"}
                label="City"
                name="city"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                disabled
                fullWidth
                value={"Suryadashan D ,wing"}
                id="address"
                label="Address"
                name="address"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                disabled
                id="pincode"
                value = {400012}
                label="Pincode"
                name="pincode"
                autoFocus
              />
      
            <label htmlFor="contained-button-file">
                <Input accept="pdf" id="contained-button-file"  type="file" onChange={disImageUpload}/>
                <Button variant="contained" component="span">
                Document Upload
                </Button>
            </label>
            <Button disabled>{imgName != undefined? imgName :''}</Button>
            <TextField
                margin="normal"
                required
                fullWidth
                id="inAppCurrency"
                label="Coins"
                name="coins"
                disabled
                value = {localStorage.getItem('coinsBuy')}
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