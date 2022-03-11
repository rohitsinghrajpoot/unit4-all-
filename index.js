const express = require("express")

const mongoose = require("mongoose")
 
const app= express()

app.use(express.json())

const connect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/assignment")
}

 const sectionSchema = new mongoose.Schema(
     {
     Section :{type:String,required:true}
 },
  {
timestamps: true
  }   
    
)
const Section = mongoose.model("section",sectionSchema)

const bookSchema = new mongoose.Schema(
    {
        book_name:{type:String,required:false},
        book_author:{type:String,required:false},
    
    
    //   sectionid:{
    //       type:mongoose.Schema.Types.ObjectId,
    //       ref:"section",
    //       required:true,
    //   },
    },
    {
        timestamps:true
    },
     
)
const Book = mongoose.model("book",bookSchema)

const authorSchema =mongoose.Schema(
    {
        author_firstname:{type:String,required:false},
        author_lastname:{type:String,required:false},
    
    // bookid: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"book",
    //     required:true ,
    // },
    // sectionid:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"section",
    //     required:true,
    // },
},
    {
        timestamps:true
    }
)
const Author = mongoose.model("author",authorSchema)
//section crud
// get,post,patch,delete
app.get("/users", async (req,res)=>{
    try{
     const sections= await Section.find().lean().exec()

     return res.status(200).send({sections:sections})
    }catch(err){
       return res.status(500).send({message:"something went wrong"})
    }
})

app.post("/users", async (req,res)=>{
    try{
     const section = await Section.create(req.body)

     return res.status(201).send({section:section})
    }catch(err){
       return res.status(500).send({message:err.message})
    }
})


app.patch("/users/:id", async (req,res)=>{
    try{
     const section= await Section.findByIdAndUpdate(req.params.id,req.body,{
         new:true
        })

     return res.status(201).send({section})
    }catch(err){
       return res.status(500).send({message:err.message})
    }
})

app.delete("/users/:id", async (req,res)=>{
    try{
     const section= await Section.findByIdAndDelete(req.params.id)

     return res.status(201).send({section})
    }catch(err){
       return res.status(500).send({message:err.message})
    }
})


app.listen(3400, async ()=>{
   try{
       await connect()
   } catch(err){
       console.log(err)
   }
   console.log("listening on port 3400")
})