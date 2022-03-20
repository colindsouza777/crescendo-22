const router = require('express').Router();
let Animal = require('../models/CareCenterAnimals.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
router.route('/api/create').post((req,res)=>{
        const centerId = req.body.centerId;
        const name = req.body.name;
		const age = req.body.age;
        const type = req.body.type;
        const description = req.body.description;
        const photo = req.body.photo;
        console.log(req.body);
        const newUser = new Animal({
            centerId,
            name,
            age,
            type,
            description,
            photo
        });
        newUser.save()
        .then(()=> res.json('Animal added!'))
        .catch((err)=> res.status(400).json(err));

})


router.route('/api/showall').post((req,res)=>{
    Animal.find()
    .then(animal=>{
        res.send(animal);
    })
})

router.route('/api/show').post((req,res)=>{
    Animal.find({centerId:req.body.id})
    .then(animal=>{
        res.send(animal);
    })
})



module.exports = router;