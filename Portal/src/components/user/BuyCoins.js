import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link as Links} from 'react-router-dom';
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from 'axios';
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
const __DEV__ = document.domain === 'localhost'

function BuyCoins(){
    const [Amount,setAmount] = React.useState('')
    const [Data,setData] = React.useState({})
    
    function handleSubmit(event){
        event.preventDefault();
    }

      async function displayRazorpay(event) {
        event.preventDefault();
          let amount  = localStorage.getItem('coinsBuy');
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}


        axios.post('https://5a1e-182-237-154-197.ngrok.io/razorpay',{
            amount:localStorage.getItem('coinsBuy')
        }).then(res=>{
            setData(res)
            
        })

		const options = {
			key: __DEV__ ? 'rzp_test_RR5OrQYpLn3CC0' : 'PRODUCTION_KEY',
			currency: Data.data.currency,
			amount: localStorage.getItem('coinsBuy'),
			order_id: Data.data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			handler: function (response) {
				axios.post("http://localhost:5000/user/api/updateCoins",{
          id_user:localStorage.getItem('id_user'),
          coins:localStorage.getItem('coinsBuy')
        })
			},
			prefill: {
				email: 'akmore90@gmail.com',
				phone_number: '9029298389'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

    return(
      <div><Navbar/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            B
          </Avatar>
          <Typography component="h1" variant="h5">
           Buy Coins
          </Typography>
          <Box component="form" onSubmit={handleSubmit} method="post" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount"
              id="amount"
              disabled
              value={localStorage.getItem('coinsBuy')}
              onChange={(e)=>setAmount(localStorage.getItem('coinsBuy'))}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={displayRazorpay}
              sx={{ mt: 3, mb: 2 }}
            >
            Buy
            </Button>
            
          </Box>
        </Box> 

        </div>
    )
}

export default BuyCoins;