const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import models
const Manifest = require("../../models/Manifest");
const PreManifest=require("../../models/PreManifest")
const manifestId=require("../../models/ManifestId")
const DummyManifest=require('../../models/dummyManifest')

// @route   POST /tms/loading/registermanifest
// @desc     insert manifest
// @access   private
router.post(
  "/registermanifest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newManifest = new Manifest({
      manifestDate: req.body.manifestDate,
      from: req.body.from,
      to: req.body.to,
      vehicleNo: req.body.vehicleNo,
      amount: req.body.amount,
      advancePayment: req.body.advancePayment,
      dueBalance: req.body.dueBalance,
      Remarks: req.body.Remarks,
    });
     newManifest
       .save()
       .then((manifest) => {
           res.json(manifest)
           registerdummymanifest(manifest)
        })
       .catch((err) => res.json(err));
       
  }
);

router.post(
    "/insertpremanifest",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        var data=req.body
        manifestId.findById({_id:'mftId'})
        .then(count=>{
            //console.log(count.seq)
            for(let i=0; i<data.length; i++){
                const newpm=new PreManifest({
                    id: data[i].id,
                    bookingDate:data[i].bookingDate,
                    manifestId:count.seq,
                    cityReference: data[i].cityReference,
                    transportationMode:data[i].transportationMode,
                    shippingAddress: data[i].shippingAddress,
                    valueofGoods: data[i].valueofGoods,
                    consignorName: data[i].consignorName,
                    consigneeName: data[i].consigneeName,
                    from: data[i].from,    
                })
                console.log(newpm)
                newpm.save()
                .then(pm=>{
                    res.json(pm)
                })
                .catch(err=>console.log(err))     
            }    
        })

              
    }
  );

// @route   get manifests
// @desc     return all manifests made
// @access   private
router.get(
  '/allmanifests',
  passport.authenticate("jwt", { session: false }),
  (req,res) =>{
      Manifest.find({},(err,result)=>{
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

// update manifest
router.post('/updatemanifest',
          passport.authenticate('jwt',{session:false}),
          (req,res)=>{
              var data=req.body
              Manifest.updateOne({id:data.id},
              {$set:{
                manifestDate: data.manifestDate,
                from: data.from,
                to: data.to,
                vehicleNo: data.vehicleNo,
                amount: data.amount,
                advancePayment: data.advancePayment,
                dueBalance: data.dueBalance,
                Remarks: data.Remarks,
              }},(err,result)=>{
                if (err) throw err;
                console.log(result)
              }) 
              updatedummymanifest(data)

            }
          
          
)
// delete manifest
router.post('/deletemanifest',
            passport.authenticate('jwt',{session: false}),
            (req,res)=>{
              var data=req.body
              Manifest.deleteOne({id:req.body.id}, (err,result)=>{
                if (err) throw err;
                console.log(result);
              })

              PreManifest.deleteMany({manifestId:req.body.id},(err,result)=>{
                if (err) throw err;
                console.log(result);
              })
            
            }
)

// all pre manifests
router.get(
  '/allpremanifests',
  passport.authenticate("jwt", { session: false }),
  (req,res) =>{
      PreManifest.find({},(err,result)=>{
          var premanifests=[]
          result.forEach((bk)=>{
            premanifests.push(bk)
        });
        if(premanifests.length>=0)
            res.status(200).send(premanifests)
            else
            res.status(500).json({message:'Some error'})
      })
  } 
);


// dummy
function registerdummymanifest(newManifest){

  const newmf = new DummyManifest({
        manifestDate: newManifest.manifestDate,
        from: newManifest.from,
        to: newManifest.to,
        vehicleNo: newManifest.vehicleNo,
        amount: newManifest.amount,
        advancePayment: newManifest.advancePayment,
        dueBalance: newManifest.dueBalance,
        Remarks: newManifest.Remarks,
        id:newManifest.id
      });
       newmf
         .save()
         .then((manifest) => {
             res.json(manifest)
          })
         .catch((err) => res.json(err));
         
    }

router.get(
  '/alldummymanifests',
  passport.authenticate("jwt", { session: false }),
  (req,res) =>{
      DummyManifest.find({},(err,result)=>{
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

// update manifest
function updatedummymanifest(data){
              DummyManifest.updateOne({id:data.id},
              {$set:{
                manifestDate: data.manifestDate,
                from: data.from,
                to: data.to,
                vehicleNo: data.vehicleNo,
                amount: data.amount,
                advancePayment: data.advancePayment,
                dueBalance: data.dueBalance,
                Remarks: data.Remarks,
              }},(err,result)=>{
                if (err) throw err;
                console.log(result)
              }) 
          }                        


router.post('/deletedummymanifest',
            passport.authenticate('jwt',{session: false}),
            (req,res)=>{
              var data=req.body
              DummyManifest.deleteOne({id:req.body.id}, (err,result)=>{
                if (err) throw err;
                console.log(result);
              })

            }
)
/*
DummyManifest.deleteMany({}, (err,result)=>{
  if (err) throw err;
  console.log(result);
})
*/

module.exports = router;
