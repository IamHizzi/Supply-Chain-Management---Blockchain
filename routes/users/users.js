const express=require('express')
const router=express.Router()
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secret=require('../../config/keys').secret;
const passport=require('passport')

// user model
const User=require('../../models/User')

// load validation for login and signup
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');




// @route   POST /users/register
// @desc     Register user
// @access   public
router.post('/register',(req,res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            errors.email = 'Email already exists';
            res.status(400).json(errors)
        }
        else{
            const avatar=gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm',
            })
            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=> {
                    if(err) throw err;
                    newUser.password=hash
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=> console.log(err))
                })
            })

        }
    })
})



// @route   post /users/login
// @desc     login user
// @access   public
router.post('/login',(req,res) => {
    
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email=req.body.email
    const password=req.body.password

    User.findOne({email})
    .then(user=> {
        if(!user){
            errors.email='User not found'
            res.status(404).json(errors)
        }
        bcrypt.compare(password,user.password)
        .then(isMatch =>{
            if(isMatch){
                //User there
                //generate a token
                const payload={id:user.id,name:user.name,avatar:user.avatar}
                jwt.sign(payload,secret,{expiresIn:3600},(err,token)=>{
                    res.json({
                        success:true,
                        token:'Bearer ' + token
                    })
                })
            }
            else{
                errors.password = 'Password incorrect';
                res.status(400).json(errors)
            }
            
        })
    })
})


// @route   GET /users/current
// @desc     current user
// @access   protected
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      });
    }
  );

// @route   GET /allusers
// @desc     all db users
// @access   protected
router.get(
    '/alldbusers',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        User.find({},(err,users)=>{
            var userMap=[]
            users.forEach((user)=>{
                let name=user.name
                let email=user.email
                let date=user.date.toString()
                let newu={
                    name,
                    email,
                    date
                }
                userMap.push(newu)
            });
            if(userMap.length>0)
            res.status(200).send(userMap)
            else
            res.status(500).json({message:'Some error'})
        })
    } 
  );
 

module.exports=router