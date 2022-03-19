import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as Links} from 'react-router-dom';
import axios from 'axios';

import { init } from '@emailjs/browser';
import emailjs from '@emailjs/browser';
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

function sendmail(toName,Email,Message,Status){
  init("-0kS_d-eKhLpZ3bVH");
  const serviceId = 'service_ify6n7p';
  const templateId = 'template_hy5dhoh';
  const templateParams = {
    to_name: toName,
    email  :Email,
    message: Message,
    status:Status
  };
    emailjs.send(serviceId, templateId, templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
}

export default function Forgotpassword() {

    const [open, setOpen] = React.useState(true);

    const [emailPresent,setEmailPresent] = React.useState(false);
    const [errorAlert,setErrorAlert] = React.useState(false);
    const [codeRest,setCodeRest] = React.useState('');
    const [requestStatus,setRequestStatus] = React.useState(false);
    const [verifiedEmail,setVerifiedEmail] = React.useState(false);
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (requestStatus == false){
        axios.post("http://localhost:5000/ngoUser/api/forgotpassword",{
            ngoEmail:data.get('email')
        }).then(res=>{
            if(res.data.user ){
                setEmailPresent(true);
                const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                setCodeRest(code.toString());
                setRequestStatus(true);
                sendmail("Hello",data.get('email'),"Code for password rest is "+code.toString(),"");
            }else{
                console.log(errorAlert)
                setErrorAlert(true);
                setRequestStatus(false);
                setTimeout(() => {window.location.href='/ngo/forgotpassword'},2000);
            }
        })
    }else{
      if(codeRest == data.get('code')){
        setEmailPresent(false)
        setVerifiedEmail(true);
      }else{
        axios.post("http://localhost:5000/ngoUser/api/changePassword",{
          ngoEmail:data.get('email'),
          ngoPassword:data.get('password')
        }).then(res =>{
          sendmail("Hello",data.get('email'),"Your password has been changed","");
        })

      }
    }
      
  };


  const handleChange = (event) => {
    const data = new FormData(event.currentTarget);
    console.log(data);
    const email = data.get('email');
    setEmailPresent(email);
  }


  function handleEmailVerifiaction(){
    return(
        <Box>
          <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Enter Code Received"
              name="code"
              autoFocus
            />
        </Box>
    )
  }

  function handleNewPassword(){
    return(
        <Box>
          <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="New Password"
              name="password"
              autoFocus
            />
        </Box>
    )
  }

  
  return (
    <ThemeProvider theme={theme}>
        {errorAlert &&  <Collapse in={open}><Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
              
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong
        </Alert></Collapse>}
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
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            {emailPresent && handleEmailVerifiaction()}
            {verifiedEmail && handleNewPassword()}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}  
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                <Links to = '/signup'>
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