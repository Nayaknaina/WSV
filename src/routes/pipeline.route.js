const express = require('express');
const router = express.Router();
const logIncollection = require("../models/admin.model.js");
const pipelineModel = require('../models/admin.model.js')

const jwt = require("jsonwebtoken");




router.post('/',async (req,res)=>{
  console.log("we are here");
  
  const {title,color} = req.body

  const token = req.cookies["360Followers"];
  const userData = jwt.decode(token);
   console.log(userData);
   
  if (!userData) {
    return res.redirect("/login");
  }
  const user = await logIncollection.findById(userData.id);

  const pipeline = new pipelineModel({ uid:user._id, color, title ,cid:user.cid });
    await pipeline.save();
    console.log(pipeline);
    

    res.redirect('/dashboard')
  
  })

router.get('/del/:id',async(req,res)=>{
  const {id} = req.params
  let pipeline = await pipelineModel.findByIdAndDelete(id)
  // console.log(pipeline);
  res.redirect('/dashboard')
})

router.get('/update/:id',async(req,res)=>{
  const {id} = req.params
  let pipeline = await pipelineModel.findById(id)

  console.log(pipeline);
  res.redirect('/dashboard')
})



module.exports = router;