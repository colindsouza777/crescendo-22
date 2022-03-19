const router = require('express').Router();
let User = require('../models/RandomUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
router.route('/api/signup').post((req,res)=>{
        const name = req.body.name;
		const phone = req.body.phone;
		const city = req.body.city;
        const address = req.body.address;
		const state = req.body.state;
		const pincode = req.body.pincode;
		const email = req.body.email;
        const verified = 'F';
        const inAppCurrency = '0'
		const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
		const newUser = new User({
            name,
            phone,
            city,
            state,
            address,
            pincode,
            email,
            password,
            inAppCurrency,
            verified
        });
        newUser.save()
        .then(()=>res.json({success:true}))
        .catch((err)=> {
            }
        )

})

router.route('/api/signin').post((req,res)=>{
    const email = req.body.email;
    
    User.find({email:email})
    .then((users)=>{
        if (users.length > 0){
            let validatePassword = bcrypt.compareSync(req.body.password, users[0].password);
            console.log(validatePassword);
            if (validatePassword) {
                const id = users[0]._id;
                const token = jwt.sign({id},"sdfajslbasnfdaslkzxcxmasfnecxvasnmvnoierasdn",{
                    expiresIn: "1h",

                });

                res.json({auth:true,token:token,id_user:users[0]._id,name:users[0].name});
            }
            else{
                res.json({auth:false});
            }
        }else{
            res.json("Something went wrong");
        }
    })
    .catch(err=>res.status(400).json('Error: '+err));

});





router.route('/api/forgotpassword').post((req,res)=>{
    User.find({email:req.body.email})
    .then(users => {
        if (users.length > 0){
            res.send({user:true});
        }
        else{
            res.send({user:false});
        }
    })
})

router.route('/api/changePassword').post((req,res)=>{
    User.findOneAndUpdate({ngoEmail:req.body.email},{$set:{ngoPassword:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())}})
    .then(res=>{
        console.log("Password changed");
    })
    res.json({password:true});  
})

router.route('/api/show').get((req,res)=>{

    res.json({
        name:"Akhilesh",
        city:"Mumbai",
        state:"Maharashtra",
        address:"Suryadashan D wing",
        pincode:"400053",
    })
})

module.exports = router;