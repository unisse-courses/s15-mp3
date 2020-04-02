const UserModel = require('../models/User');


module.exports = {
    create: (req, res) =>{
        let user = new UserModel( {
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
    update: (req, res) =>{
        UserModel.update({_id: req.body._id}, req.body)
        .then(user=> {
            if(!user) res.json({success: false, result: "User does not exist"});

            res.json(user);

        })
        .catch(err=>{
            res.json({success: false, result: err});
        });
    },
    retrieve: (req, res) =>{
        UserModel.find()
        .then(result =>{
            if(!result) res.json({success: false, result: "No results found"});

            res.json({sucess: true, result: result});
        })
        .catch(err=>{
            res.json({success: false, result: err});
        });
    },
    delete: (req, res) =>{
        UserModel.remove({_id: req.body._id})
        .then(result =>{
            if(!result) res.json({success: false, result: "No user was found was found with that id"});

            res.json({sucess: true, result: result});
        })
        .catch(err=>{
            res.json({success: false, result: err});
        });
    }
}