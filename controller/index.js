const jwt = require("jsonwebtoken")
const bcryptjs = require('bcryptjs')
const User = require('../model/user')

const register = (req, res, next) => {

    bcryptjs.hash(req.body.password, 10,function (err, hashedPass){
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password:hashedPass
        })
        user.save().then(user => {
            res.json({
                message: "user added successfully"
            })
        }).catch(error => {
            res.json({
                message: "an error occured!"
            })
        })
    })

}
const login=(req,res,next)=>
{
    var username=req.body.username
    var password=req.body.password
    User.findOne({$or: [{email:username},{phone:username}]}).then(user=>
        {
            if(user)
            {
           bcryptjs.compare(password,user.password,(err,result)=>
           {
               if(err)
               {
                   res.json({
                      error:err
                   })
               }if(result)
               {
                   let token=jwt.sign({name:user.name},'AzQ,PI0(',{expiresIn :'1h'})
                   res.json({
                       message :"Login Successfully",
                       token
                   })
               }else
               {
                   res.json({
                       message:"password does not match "
                   })
               }    
           })
            }
            else
            {
                res.json( {
                    message:"username not found"
                })
            }
        })
}



module.exports = {

    register,login
}



