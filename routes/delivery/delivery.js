const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import models
const DeliveryModel = require('../../models/DeliveryModel')


router.post("/insertdelivery",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var data=req.body
    //console.log(data)
    const newdelivery = new DeliveryModel({
        id: data.id,
        bookingDate: data.bookingDate,
        manifestId: data.manifestId,
        to: data.to,
        Courier: data.transportCompany,
        shippingAddress: data.shippingAddress,
        consignorName: data.consignorName,
        consigneeName: data.consigneeName,
        from: data.from
    })
    //console.log(newdelivery)
    newdelivery.save()
    .then(del=>{
        res.json(del)
        console.log(del)
    })
    .catch(err=>res.json(err))
       
  }
);


// all delivries
router.get(
    '/alldeliveries',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        DeliveryModel.find({},(err,result)=>{
            var deliveries=[]
            result.forEach((bk)=>{
              deliveries.push(bk)
          });
          if(deliveries.length>=0)
              res.status(200).send(deliveries)
              else
              res.status(500).json({message:'Some error'})
        })
    } 
  );

  // delete delivery
router.post('/deletdelivery',
  passport.authenticate('jwt',{session: false}),
  (req,res)=>{
    var data=req.body
    DeliveryModel.deleteOne({id:req.body.id}, (err,result)=>{
      if (err) throw err;
      console.log(result);
    })

  }
)


module.exports = router;