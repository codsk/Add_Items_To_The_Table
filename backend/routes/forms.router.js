import express from 'express'
import Data from '../model/forms.model.js'
const router=express.Router()

express.json()
router.post('/',async (req,res)=>{
  try{
    const {itemName,category,amount}=req.body
    const data=await Data.create({itemName,category,amount})
    res.status(200).json(data)
  }catch(err){
    res.status(500).json({message:err.message})
  }
})

router.get('/',async (req,res)=>{
  try{
    const data=await Data.find()
    res.status(200).json(data)
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

router.delete('/',async (req,res)=>{
  try{
    const id=req.query
    console.log(id)
    const data=await Data.deleteMany(id)
    res.status(200).json(data)
  }catch(err){
    res.status(500).json({message:err.message})
  }
})

export default router;