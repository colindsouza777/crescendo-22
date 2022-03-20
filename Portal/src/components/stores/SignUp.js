import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as Links }  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import MainNavBar from './MainNavBar';
import { create } from "ipfs-http-client";
import { styled } from '@mui/material/styles';



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


const client = create('https://ipfs.infura.io:5001/api/v0');

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme();

export default function SignUp() {

  const [ImgHash, setImgHash] = useState("")

  const uploadImage = async (event) => {
    try {
      const created = await client.add(event.target.files[0]);
      setImgHash(created.path);     
    } catch (error) {
      console.log(error.message);
    }
  }


  let handleSubmit = async(event) => {
    event.preventDefault();

    
    
      const data = new FormData(event.currentTarget);
      const name = data.get('username');
      const email =  data.get('email');
      const password = data.get('password');
      const phone = data.get('phone');
      const address = data.get('address');
      const city = data.get('city');
      const state = data.get('state');
      const pincode = data.get('pincode');
      const verificationDocument = data.get('verificationDocument');
      const inAppCurrency = 0;
      const verified = false;
      

      
      if (name=='' && email=='' && password=='' && phone=='' && address=='') {
        setAlert(true);
        setTimeout(() => {setAlert(false)},2000)
      }else{
        axios.post("http://localhost:5000/store/api/signup",{
          name,
          email,
          password,
          phone,
          address,
          city,
          state,
          pincode,
          verificationDocument,
          inAppCurrency,
          verified

        }).then(res=>{
          if(res.data.success){
            window.location.href='/';
          }else{
            setAlert(true);
            setTimeout(() => {setAlert(false)},2000)  
          }
        })
      }

  }
  let [AlertState,setAlert] = useState(false);
  
  
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Organization Name"
                  name="username"
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
              </Grid>
              <Grid item xs={12}>
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
                  id="pincode"
                  name="pincode"
                  label="Pincode"
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
              <label style={{marginTop:"20px"}} htmlFor="contained-button-file">
                <Input  accept="image/jpeg" id="contained-button-file"  type="file" onChange={uploadImage}/>
                <Button variant="contained" component="span">
                Photo Upload
                </Button>
            </label>
              
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