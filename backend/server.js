import express from 'express'
import connectDB from './db/dbs.js'
import cors from 'cors'
import router from './routes/forms.router.js'
import path from 'path'
const app=express()


app.use(cors())
app.use(express.json())

const __dirname=path.resolve()
app.use('/api/formData',router)
if (process.env.NODE_ENV ==='production'){
  console.log("production")
  app.use(express.static(path.join(__dirname,'client/my-app/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','my-app','build','index.html'))
  })
}

app.listen(7000,()=>{
  connectDB()
  console.log("server is running at 7000")
})