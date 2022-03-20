const router = require('express').Router();
let Animal = require('../models/AnimalReport.model');


const verifyToken = (req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        res.json("Something went wrong");
    }
    else{
        jwt.verify(token,"sdfajslbasnfdaslkzxcxmasfnecxvasnmvnoierasdn",(err,decoded)=>{
            if (err){
                res.json({auth:false,message:"Something is wrong"});
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
    
}

router.route('/api/create').post((req,res)=>{
    const reportedId = req.body.recordId;
    const name = req.body.name;
    const description = req.body.description;
    const city = req.body.city;
    const state = req.body.state;
    const address = req.body.address;
    const pincode = req.body.pincode;
    const photo = req.body.photo;
    const takenBy = 'F'
    const acceptedId = 'None'
    console.log(req.body);

    const newReport = new Animal({
        reportedId,
        name,
        description,
        city,
        state,
        address,
        pincode,
        photo,
        takenBy,
        acceptedId
    });
    newReport.save()
    .then(()=> res.json('Report added!'))
    .catch((err)=> res.status(400).json(err));
});

router.route('/api/view').get((req,res)=>{

    Animal.find()
    .then(report=>{
        res.json(report);
    })
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/api/showall').post((req,res)=>{

    Animal.find()
    .then(disaster=>{
        res.json(disaster);
    })
    .catch(err=>res.status(400).json('Error: '+err));
});


router.route('/api/accept').post((req,res)=>{
    Animal.findById({_id:req.body.id})
    .then(animal=>{
        console.log(animal)
        animal.takenBy = 'T';
        animal.acceptedId = req.body.acceptedId;
        animal.save()
        .then(()=> res.json('Animal updated!'))
        .catch((err)=> res.status(400).json(err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/api/delete').post(verifyToken,(req,res)=>{
    Disaster.remove({ _id: req.body.id }, function(err) {  
        if(err){  
            res.send(err);  
        }  
        else{    
               res.send({data:"Record has been Deleted..!!"});             
           }  
    });  
})

router.route('/api/update').post(verifyToken,(req,res)=>{
    Disaster.findById(req.body._id)
    .then(disaster=>{
        disaster.disName = req.body.disName;
        disaster.disState = req.body.disState;
        disaster.disCity = req.body.disCity;
        disaster.disAddress = req.body.disAddress;
        disaster.disPhoto = req.body.disPhoto;

        disaster.save()
        .then(()=> res.json('Disaster updated!'))
        .catch((err)=> res.status(400).json(err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})



router.route('/api/view').get((req,res)=>{
    Animal.find({})
    .then(disaster=>{
        let count = 0;
        let temp = [];
        disaster.map(dis=>{
            if(dis.takenBy == "F"){
            temp.push({
                animalId:dis._id,
                reportedId: dis.reportedId,
                name:dis.name,
                description:dis.description,
                city:dis.city,
                state:dis.state,
                address:dis.address,
                pincode:dis.pincode,
                photo:dis.photo,
                taken_by:dis.taken_by,
            })
        }
        })
        res.json(temp);
    })
})

router.route('/api/accept').post((req,res)=>{
    Animal.findById({_id:req.body.id})
    .then(animal=>{
        console.log(animal)
        animal.takenBy = 'T';
        animal.acceptedId = req.body.acceptedId;
        animal.save()
        .then(()=> res.json('Animal updated!'))
        .catch((err)=> res.status(400).json(err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router