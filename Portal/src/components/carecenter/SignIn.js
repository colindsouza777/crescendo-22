import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as Links} from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';
import axios from 'axios';
import Footer from './Footer';
import MainNavBar from './MainNavBar';

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



const theme = createTheme();

export default function CareSignIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
      const email =  data.get('email');
      const password = data.get('password');
      if(email == '' && password == ''){
        setAlert(true);
        setTimeout(() => {setAlert(false) ;window.location.href='/'},2000)
      }
      else{
        console.log("here")
        axios.post('http://localhost:5000/care/api/signin',{
          email:email,
          password:password
        }).then(res=>{
          console.log(res)
          if(res.data.auth){
            localStorage.setItem('token',res.data.token);
            window.location.href="/carecenter/home"
          }else{
            setAlert(true);
            // setTimeout(() => {setAlert(false) ;window.location.href='/carecenter/signin'},2000)
          }
        })
      }
     
  };
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
            Care Center Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/care/forgotpassword" variant="body2">
                  <Links to='/care/forgotpassword'>
                  Forgot password?
                  </Links>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/carecenter/signup" variant="body2">
                <Links to = '/carecenter/signup'>
                {"Don't have an account? Sign Up"}
                </Links>
                  
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}