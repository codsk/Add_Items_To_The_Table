import mongoose from "mongoose"
let schema=mongoose.Schema({
  "itemName":{
    type:String,
    require:true
  },
  "category":{
    type:String,
    require:true
  },
  "amount":{
    type:String,
    require:true
  }
})

const Data=mongoose.model("formData",schema)
export default Data;