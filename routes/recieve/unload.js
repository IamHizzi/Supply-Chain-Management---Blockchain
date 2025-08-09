const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import models
const Unload = require('../../models/Unload')
const DummyUnload=require('../../models/DummyUnload')

// insert consunload
router.post('/insertunload',
            passport.authenticate('jwt',{session:false}),
            (req,res)=>{
              var data=req.body
                console.log(data)
                for(let i=0; i<data.length; i++){
                    var newun=new Unload({
                        id:data[i].id,
                        to: data[i].cityReference,
                        shippingAddress:data[i].shippingAddress,
                        manifestId:data[i].manifestId,
                        valueofGoods:data[i].valueofGoods,
                        consignorName:data[i].consignorName,
                        consigneeName:data[i].consigneeName,
                        from:data[i].from         
                    })

                    newun.save()
                    .then(unload=>{
                        res.json(unload)
                    })
                    .catch(err=>res.json(err))
                }
                insertdummy(data)
            }    
)

// all unloads
router.get(
    '/allunloads',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        Unload.find({},(err,result)=>{
            var unloads=[]
            result.forEach((bk)=>{
              unloads.push(bk)
          });
          if(unloads.length>=0)
              res.status(200).send(unloads)
              else
              res.status(500).json({message:'Some error'})
        })
    } 
  );
  

  // dummy
function insertdummy(data){
    for(let i=0; i<data.length; i++){
        var newun=new DummyUnload({
            id:data[i].id,
            to: data[i].cityReference,
            shippingAddress:data[i].shippingAddress,
            manifestId:data[i].manifestId,
            valueofGoods:data[i].valueofGoods,
            consignorName:data[i].consignorName,
            consigneeName:data[i].consigneeName,
            from:data[i].from         
        })

        newun.save()
        .then(unload=>{
            res.json(unload)
        })
        .catch(err=>res.json(err))
    }
}


// all dummy
router.get(
    '/alldummyunloads',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        DummyUnload.find({},(err,result)=>{
            var unloads=[]
            result.forEach((bk)=>{
              unloads.push(bk)
          });
          if(unloads.length>=0)
              res.status(200).send(unloads)
              else
              res.status(500).json({message:'Some error'})
        })
    } 
  );
  
// delete dummy
router.post('/deletdummyunload',
            passport.authenticate('jwt',{session: false}),
            (req,res)=>{
              var data=req.body
              DummyUnload.deleteOne({id:req.body.id}, (err,result)=>{
                if (err) throw err;
                console.log(result);
              })

            }
)

module.exports = router;