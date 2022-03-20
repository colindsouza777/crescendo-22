const router = require('express').Router();
let Adoption = require('../models/AdoptionRequest.model');


router.route('/api/create').post((req,res)=>{
    
    const adopterId = req.body.adopterId;
    const adoptionCenterId = req.body.adoptionCenterId;
    const animalId = req.body.animalId;
    const documentUrl = req.body.documentUrl;
    const status ='Pending';

    const newAdoption = new Adoption({
        adopterId,
        adoptionCenterId,
        animalId,
        documentUrl,
        status
    });
    newAdoption.save()
    .then(()=> res.json('Request added!'))
    .catch((err)=> res.status(400).json(err));
});

router.route('/api/show').post((req,res)=>{

    Adoption.find({adopterId:req.body.adopterId})
    .then(disaster=>{
        res.json(disaster);
    })
    .catch(err=>res.status(400).json('Error: '+err));
});




router.route('/api/delete').post((req,res)=>{
    Disaster.remove({ _id: req.body.id }, function(err) {  
        if(err){  
            res.send(err);  
        }  
        else{    
               res.send({data:"Record has been Deleted..!!"});             
           }  
    });  
})

router.route('/api/update').post((req,res)=>{
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

module.exports = router