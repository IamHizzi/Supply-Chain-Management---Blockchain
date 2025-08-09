const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import models
const Dispatch=require('../../models/DispatchModel')
const DummyDispatch=require('../../models/DummyDispatch')

router.post('/insertdispatch',
             passport.authenticate('jwt',{session:false}),
             (req,res)=>{
                 var data=req.body
                 //console.log(data)
                 var newdf= new Dispatch({
                     id: data.id,
                     dispatchDate: data.manifestDate,
                     from: data.from,
                     to: data.to,
                     vehicleNo:data.vehicleNo,
                     dispatchStatus:true
                 })
                 
                 newdf.save()
                 .then(df=> res.json(df))
                 .catch(err=> res.json(err))

                 registerdummydispatch(newdf)
             }               
)

// all dispatches
router.get(
    '/alldispatches',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        Dispatch.find({},(err,result)=>{
            var dispatches=[]
            result.forEach((bk)=>{
              dispatches.push(bk)
          });
          if(dispatches.length>=0)
              res.status(200).send(dispatches)
              else
              res.status(500).json({message:'Some error'})
        })
    } 
  );
  

  // dummy
function registerdummydispatch(newDispatch){

    const newmf = new DummyDispatch({
        id: newDispatch.id,
        dispatchDate: newDispatch.manifestDate,
        from: newDispatch.from,
        to: newDispatch.to,
        vehicleNo:newDispatch.vehicleNo,
        dispatchStatus:true
        });
         newmf
           .save()
           .then((manifest) => {
               res.json(manifest)
            })
           .catch((err) => res.json(err));
           
}
  
  router.get(
    '/alldummydispatches',
    passport.authenticate("jwt", { session: false }),
    (req,res) =>{
        DummyDispatch.find({},(err,result)=>{
            var manifests=[]
            result.forEach((bk)=>{
              manifests.push(bk)
          });
          if(manifests.length>=0)
              res.status(200).send(manifests)
              else
              res.status(500).json({message:'Some error'})
        })
    } 
  );
  
router.post('/deletdummydispatch',
              passport.authenticate('jwt',{session: false}),
              (req,res)=>{
                var data=req.body
               // console.log("Dummy dipatch delete",req.body)
                DummyDispatch.deleteOne({id:req.body.id}, (err,result)=>{
                  if (err) throw err;
                  console.log(result);
                  console.log("delete statemnet above")
                })
  
              }
  )
  

module.exports = router;
