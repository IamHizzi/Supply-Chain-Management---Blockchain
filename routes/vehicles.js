const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const Vehicle=require('../models/Vehicle')

router.post(
    "/registerVehicle",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

      const newVehicle = new Vehicle({
        RegistrationNumber:req.body.RegistrationNum,
        Model:req.body.Model,
        DriverName:req.body.DriverName,
        Type:req.body.Type,
        
      });
      newVehicle
        .save()
        .then((veh) => res.json(veh))
        .catch((err) => console.log(err));
    }
  );
  

  router.get(
    '/allVehicles',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        Vehicle.find({},(err,result)=>{
            var vehicles=[]
            result.forEach((bk)=>{
              vehicles.push(bk)
          });
          if(vehicles.length>=0)
              res.status(200).send(vehicles)
              else
              res.status(500).json({message:'Some error'})
        })
    } 
  );

  
module.exports=router;