const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const getValueForNextItemSequence =
  require("../../config/pkgIds").getValueForNextItemSequence;

//  models
const Consignment = require("../../models/Consignment");
const Item = require("../../models/Item");

// @route   POST /tms/booking/postitem
// @desc     insert item
// @access   private
router.post(
  "/bookitem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newItem = new Item({
      manifestId: req.body.manifestId,
      productDetails: req.body.productDetails,
      from: req.body.from,
      quantity: req.body.quantity,
      TaxRate: req.body.TaxRate,
      to: req.body.to,
    });
    newItem
      .save()
      .then((item) => res.json(item))
      .catch((err) => console.log(err));
  }
);

// @route   POST /tms/booking/postConsignment
// @desc     insert item
// @access   private
router.post(
  "/bookconsignment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newConsignment = new Consignment({
      bookingDate: req.body.bookingDate,
      manifestId: req.body.manifestId,
      from: req.body.from,
      cityReference: req.body.cityReference,
      shippingAddress: req.body.shippingAddress,
      valueofGoods: req.body.valueofGoods,
      consignorName: req.body.consignorName,
      consigneeName: req.body.consigneeName,
      transportationMode:req.body.transportationMode,
      blockchainid:req.body.blockchainid,
      blockchainHash:req.body.blockchainHash
    });
    //console.log(JSON.stringify(newConsignment))
    newConsignment
      .save()
      .then((consignment) => res.json(consignment))
      .catch((err) => console.log(err));
  }
);

// @route   post /tms/booking/trackConsignment
// @desc     track consignment item
// @access   private
router.post('/trackconsignment',
        passport.authenticate("jwt", { session: false }),
        (req,res)=>{
          //const consNumber=req.body.consignmentNo
          const shippingBranch= req.body.shippingBranch
          Consignment.findOne({shippingAddress:shippingBranch},(err,result)=>{
            if (err) throw err;
            res.status(200).send(result)
          })
        })



// @route   POST /booking
// @desc     return all bookings made
// @access   private
router.get(
  '/allbookings',
  passport.authenticate("jwt", { session: false }),
  (req,res) =>{
      Consignment.find({},(err,result)=>{
          var bookings=[]
          result.forEach((bk)=>{
            bookings.push(bk)
        });
        if(bookings.length>0)
            res.status(200).send(bookings)
            else
            res.status(500).json({message:'Some error'})
      })
  } 
);



router.get(
  '/allItems',
  passport.authenticate("jwt", { session: false }),
  (req,res) =>{
      Item.find({},(err,result)=>{
          var items=[]
          result.forEach((bk)=>{
            items.push(bk)
        });
        if(items.length>0)
            res.status(200).send(items)
            else
            res.status(500).json({message:'Some error'})
      })
  } 
);
module.exports = router;
