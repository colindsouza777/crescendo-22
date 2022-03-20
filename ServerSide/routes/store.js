const router = require('express').Router();
let Store = require('../models/StoreModel.model');
let Product = require('../models/ProductModel.model');
let User = require('../models/RandomUser.model');
let CareCenter = require('../models/CareCenter.model');

const bcrypt = require('bcrypt');


router.route('/api/signup').post((req,res)=>{
    console.log("Entered signup")
    console.log(req.body)
        const name = req.body.name;
		const phone = req.body.phone;
		const city = req.body.city;
        const address = req.body.address;
		const state = req.body.state;
		const pincode = req.body.pincode;
		const email = req.body.email;
        const verified = 'F';
        const inAppCurrency = 0;
		const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
        const verificationDocument = req.body.verificationDocument

        // name : { type: String,required:true,unique:true},
		// phone : { type: String,required:true,unique:true},
		// city : { type: String,required:true},
		// state : { type: String,required:true},
		// address : { type: String,required:true},
		// pincode : {type:String,required:true},
		// email : { type: String, unique:true},
		// password : { type: String,required:true},
		// verificationDocument:{type:String},
		// inAppCurrency : {type:String},
		// verified:{type:String}
        console.log(name)
		const newStore = new Store({
            name,
            phone,
            city,
            state,
            address,
            pincode,
            email,
            password,
            inAppCurrency,
            verified,
            verificationDocument
        });
        newStore.save()
        .then(()=>res.json({success:true}))
        .catch((err)=> {
            }
        )

})

router.route('/api/uploadItem').post((req, res) => {
    console.log(req.body)
        const name = req.body.name;
        const id = req.body.id;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const photo = req.body.photo;
        const description = req.body.description;
		

        // name : { type: String,required:true,unique:true},
		// phone : { type: String,required:true,unique:true},
		// city : { type: String,required:true},
		// state : { type: String,required:true},
		// address : { type: String,required:true},
		// pincode : {type:String,required:true},
		// email : { type: String, unique:true},
		// password : { type: String,required:true},
		// verificationDocument:{type:String},
		// inAppCurrency : {type:String},
		// verified:{type:String}
        console.log(name)
		const newProduct = new Product({
            name,
            id,
            photo,
            description,
            quantity,
            price
        });
        newProduct.save()
        .then(()=>res.json({success:true}))
        .catch((err)=> {
            }
        )
})
router.route('/api/getItems').get((req, res) => {
    console.log("getting items")
    Product.find({})
    .then(disaster=>{
        console.log(disaster)
        let count = 0;
        let temp = [];
        disaster.map(dis=>{
            temp.push({
                id : dis.id,
                product_id:dis._id,
                name : dis.name,
                description : dis.description,
                price : dis.price,
                quantity : dis.quantity,
                purchased:dis.purchased,
            })
        })
        res.json(temp);
    })
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/api/purchaseItem').post((req, res) => {
    console.log("getting items")
    Store.findOneAndUpdate(
        {id: req.body.id},
        { $inc: { "inAppCurrency" : req.body.price } }
        )
    .then(disaster=>{
        console.log(disaster)
        User.findOneAndUpdate(
            {id: req.body.user_id},
            { $inc: { "inAppCurrency" : - req.body.price } }
            )
            .then((result) => {
                console.log(result)
                res.send("done")
            })
    })
    .catch(err=>res.status(400).json('Error: '+err));
})




module.exports = router;