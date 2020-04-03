const User = require('../models/User');


module.exports = {
    create: (req, res) =>{
        let user = new User( {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            country: req.body.country,
            sex: req.body.gender,
        });
        
        user.save()
        .then(result => {
            res.json({success: true, result: result});
        }) 
        .catch(err => {
            res.json({success: false, result: err});
        })
    },

    insertweight: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
        {   $push: { "weights": {
            value: parseFloat(req.body.weight),
            date: new Date()
        }}
      })
      .then(user=> {
        if(!req.user) console.log('user do not exists');
    
        console.log('success');
    
        })
        .catch(err=>{
            console.log(err)
        });
    },

    inserBMI: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
        {   $push: { "BMIs": {
            value: parseFloat(req.body.BMI),
            date: new Date()
        }}
      })
      .then(user=> {
        if(!req.user) console.log('user do not exists');
    
        console.log('success');
    
        })
        .catch(err=>{
            console.log(err)
        });
    },

    inserBFP: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
        {   $push: { "weights": {
            value: parseFloat(req.body.BFP),
            date: new Date()
        }}
      })
      .then(user=> {
        if(!req.user) console.log('user do not exists');
    
        console.log('success');
    
        })
        .catch(err=>{
            console.log(err)
        });
    },
    retrieve: (req, res) =>{
        User.find()
        .then(result =>{
            if(!result) res.json({success: false, result: "No results found"});

            res.json({sucess: true, result: result});
        })
        .catch(err=>{
            res.json({success: false, result: err});
        });
    },
    delete: (req, res) =>{
        User.remove({_id: req.body._id})
        .then(result =>{
            if(!result) res.json({success: false, result: "No user was found was found with that id"});

            res.json({sucess: true, result: result});
        })
        .catch(err=>{
            res.json({success: false, result: err});
        });
    }
}