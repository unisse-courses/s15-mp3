const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {

    insertweight: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
        {   $push: { "weights": {
            value: parseFloat(req.body.weight),
            date: new Date()
        }}
      })
      .then(user=> {
        if(!req.user) console.log('user do not exists');
    
        res.redirect('/users/weight');
    
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
    
        res.redirect('/users/bmi');
    
        })
        .catch(err=>{
            console.log(err)
        });
    },

    inserBFP: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
        {   $push: { "BFPs": {
            value: parseFloat(req.body.BFP),
            date: new Date()
        }}
      })
      .then(user=> {
        if(!req.user) console.log('user do not exists');
    
        res.redirect('/users/bodyfat');
    
        })
        .catch(err=>{
            console.log(err)
        });
    },
    updateuser: (req, res) =>{
        const { firstname, lastname, heightfeet, heightinch, gender, country, email, username, opsw, npsw, npswrepeat} = req.body;

        if(opsw !== '' || npsw !== '' || npswrepeat !== '')
        {
            console.log('passopen');

            User.findOne({_id: req.user._id})
            .then(user =>{
                if (user){
                    console.log("user exists");
                    
                    bcrypt.compare(opsw, user.password, (err, isMatch)=>{
                        if (err) throw err;
    
                        if(isMatch){
                            console.log('password match');
                            if(npsw !== npswrepeat){
                                console.log("new passwords dont match");
                            }
                            else{
                                //Hash Password
                                bcrypt.genSalt(10, (err, salt) =>  
                                bcrypt.hash(npsw, salt, (err, hash)=>{
                                if(err) throw err;
                               User.updateOne({_id: req.user._id}, 
                                {   $set: { 
                                    firstname: firstname,
                                    lastname: lastname,
                                    heightfeet: heightfeet,
                                    heightinch: heightinch,
                                    sex: gender,
                                    country: country,
                                    email: email,
                                    username: username,
                                    password: hash
                                }
                              })
                              .then(user=> {
                                if(!req.user) console.log('user do not exists');
                            
                                res.redirect('/users/account');
                            
                                })
                                .catch(err=>{
                                    console.log(err)
                                });
                                
                                    }))
                            }
                        }else
                        {
                            console.log('password dont match');
                        }
                    });
                }else{
                    res.send('update failed');
                }
            });
            
        }
        else {
            console.log('close pass');
            User.updateOne({_id: req.user._id}, 
                {   $set: { 
                    firstname: firstname,
                    lastname: lastname,
                    heightfeet: heightfeet,
                    heightinch: heightinch,
                    sex: gender,
                    country: country,
                    email: email,
                    username: username
                }
              })
              .then(user=> {
                if(!req.user) console.log('user do not exists');
            
                res.redirect('/users/account');
            
                })
                .catch(err=>{
                    console.log(err)
                });
        }
    },
    editweight: (req, res) =>{
        User.updateOne({_id: req.user._id, weights: {$elemMatch:{_id:req.params.id}}}, 
            {   $set: { 
                "weights.$.value": req.params.newinput
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('weight input edited');
            res.redirect('/users/account#allweight');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    editBMI: (req, res) =>{
        User.updateOne({_id: req.user._id, BMIs: {$elemMatch:{_id:req.params.id}}}, 
            {   $set: { 
                "BMIs.$.value": req.params.newinput
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('BMI input edited');
            res.redirect('/users/account#allBMI');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    editBFP: (req, res) =>{
        User.updateOne({_id: req.user._id, BFPs: {$elemMatch:{_id:req.params.id}}}, 
            {   $set: { 
                "BFPs.$.value": req.params.newinput
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('BFP input edited');
            res.redirect('/users/account#allBFP');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteweight: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $pull: { 
                "weights": {
                    _id: req.params.id
                }
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('weight input deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteBMI: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $pull: { 
                "BMIs": {
                    _id: req.params.id
                }
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('BMI input deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteBFP: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $pull: { 
                "BFPs": {
                    _id: req.params.id
                }
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('BFP input deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteaccount: (req, res) =>{
        User.remove({_id: req.user._id})
        .then(result =>{
            if(!result) res.json({success: false, result: "No user was found was found with that id"});

            console.log('user removed success');
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        });
    },
    deleteinputs: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $set: { 
                weights: [],
                BMIs: [],
                BFPs: []
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('inputs deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteweightinputs: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $set: { 
                weights: []
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('weight inputs deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteBMIinputs: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $set: { 
                BMIs: []
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('BMI inputs deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    },
    deleteBFPinputs: (req, res) =>{
        User.updateOne({_id: req.user._id}, 
            {   $set: { 
                BFPs: []
            }
          })
          .then(user=> {
            if(!req.user) console.log('user do not exists');
        
            console.log('BFP inputs deleted');
            res.redirect('/users/account');
        
            })
            .catch(err=>{
                console.log(err)
            });
    }
    // retrieve: (req, res) =>{
    //     User.find()
    //     .then(result =>{
    //         if(!result) res.json({success: false, result: "No results found"});

    //         res.json({sucess: true, result: result});
    //     })
    //     .catch(err=>{
    //         res.json({success: false, result: err});
    //     });
    // },
    
}