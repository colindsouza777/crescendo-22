const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const readline = require('readline')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const fs = require('fs')
mongoose.connect(process.env.React_App_ATLAS_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true	
})

const connection = mongoose.connection;
connection.once('open',()=>{
	console.log("MongoDB database connection established successfully");
})

const razorpay = new Razorpay({
	'key_id': process.env.React_App_API_Razorpay_Id,
	'key_secret': process.env.React_App_API_Razorpay_Secret
})




const app = express()
app.use(cors())
app.use(bodyParser.json({extended:true}))



app.post('/verification', (req, res) => {
	// do a validation
	const secret = "password";

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		console.log(req.body.payload["payment"]);
		// process it	
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = req.body.amount
	const currency = 'INR'
	console.log(amount)
	const options = {
		amount: amount*100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})


const careCenterRouter = require('./routes/careCenter');
app.use('/care',careCenterRouter);

const randomUserRouter = require('./routes/randomUser');
app.use('/user',randomUserRouter);

const animalReport = require('./routes/animalReport');
app.use('/animal',animalReport);

const animals = require('./routes/careCenterAnimal');
app.use('/animals',animals);

const adoption = require('./routes/adoptionRequest');
app.use('/adoption',adoption);

app.listen(process.env.React_App_Server_Port, () => {
	console.log('Server up at 5000')
})