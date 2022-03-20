const router = require('express').Router();
let User = require('../models/CareCenter.model');
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
		const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
		const verified = 'F';
        const documentUrl = req.body.documentUrl;
        console.log(req.body);
        const newUser = new User({
            name,
            phone,
            city,
            state,
            address,
            pincode,
            email,
            password,
            documentUrl,
            verified
        });
        newUser.save()
        .then(()=> res.json('User added!'))
        .catch((err)=> res.status(400).json(err));

})

router.route('/api/signin').post((req,res)=>{
    const email = req.body.email;
    
    User.find({email:email})
    .then((users)=>{
        if (users.length > 0){
            let validatePassword = bcrypt.compareSync(req.body.password, users[0].password);
            console.log(validatePassword);
            if (validatePassword && users[0].verified == 'F') {
                const id = users[0]._id;
                const token = jwt.sign({id},"sdfajslbasnfdaslkzxcxmasfnecxvasnmvnoierasdn",{
                    expiresIn: "1h",

                });

                res.json({auth:true,token:token,id_user:users[0]._id,username:users[0].name});
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


router.route('/api/showall').post((req,res)=>{
    User.find()
    .then(users=>{
        res.send(users);
    })
})


module.exports = router;