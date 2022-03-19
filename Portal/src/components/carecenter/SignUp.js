import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as Links }  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { create } from "ipfs-http-client";
import MainNavBar from './MainNavBar';
const client = create('https://ipfs.infura.io:5001/api/v0');



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Team Infura
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Input = styled('input')({
  display: 'none',
});


const theme = createTheme();

export default function CareSignUp() {

  let [AlertState,setAlert] = useState(false);
  let [documentUrl,setDocumentUrl] = useState('');
  let [documentName,setDocumentName]  = useState('');
 

  let handleSubmit = async(event) => {
    event.preventDefault();
    
      const data = new FormData(event.currentTarget);
      const username = data.get('username');
      const email =  data.get('email');
      const password = data.get('password');
      const phone = data.get('phone');
      const address = data.get('address');
      const city = data.get('city');
      const state = data.get('state');
      const pincode = data.get('pincode');
      const url = documentUrl;
      console.log(data.get('username'))
      
      if (username=='' && email=='' && password=='' && phone=='' && address=='' && city=='' && state=='' && pincode=='') {
        setAlert(true);
        setTimeout(() => {setAlert(false)},2000)
      }
      else{

        axios.post("http://localhost:5000/care/api/signup",{
          name:username,
          email:email,
          password:password,
          phone:phone,
          address:address,
          city:city,
          state:state,
          pincode:pincode,
          documentUrl:documentUrl,

        }).then(res=>{
            if(res.success){
              window.location.href = '/care/signin'
            }
        })
      }

  }
  const handleChange = async(event)=>{
    event.preventDefault();
    setDocumentName(event.target.files[0].name)
    try {
      const createdAnnual = await client.add(event.target.files[0]);
      const urlAnnual = `https://ipfs.infura.io/ipfs/${createdAnnual.path}`;
      setDocumentUrl(urlAnnual);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
    <MainNavBar/>
    {AlertState && <Alert severity="error">Something Went Wrong</Alert>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Care Center Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Center Name"
                  autoFocus
                />
              </Grid><Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone No"
                  
                  
                  autoFocus
                />
              
              </Grid><Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  name="state"
                  label="State"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pincode"
                  label="Pincode"
                  name="pincode"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"

                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={6}>
              <label htmlFor="contained-button-Tax">
                <Input accept="application/pdf" id="contained-button-Tax" type="file" onChange={handleChange} />
                <Button variant="contained" component="span">
                Upload Document
                </Button>
              </label>
              </Grid>
              <Grid item xs = {6}>
                  <Button disabled>{documentName != ''? documentName.substring(0,19):''}</Button>
              </Grid>
              
        </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link  href='/' variant="body2">
                <Links to='/'>Already have an account? Sign in</Links>
                  
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}