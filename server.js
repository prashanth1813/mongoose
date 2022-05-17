var express = require('express')
var mongoose = require('mongoose')
var app=express()
var cors = require('cors');
app.use(express.json())
app.use(cors());
mongoose.connect("mongodb://localhost:27017/mydbs")
db=mongoose.connection
db.on("error",function(){console.log("error in connection")})
db.once("open",()=>{
    console.log("connection success")

})
app.listen(2000,()=>{
    console.log("server started at 2000");
})
var empSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    salary:Number,
    age:Number
})
empModel=mongoose.model("empp",empSchema)
 const empp =[
//      {
//      "_id":1,
//      "name":"cvr",
//      "salary":25000,
//      "age":36
//  },{
//      "_id":2,
//     "name":"abc",
//     "salary":20000,
//     "age":35
//  },
 {
    "_id":3,
    "name":"sai",
    "salary":46000,
    "age":26
},{
    "_id":4,
    "name":"xyz",
    "salary":25000,
    "age":23
}];
//  app.get("../frontend/index.html.", (req, res) => {
//     res.send();
//     })
app.get("/emps",(req,res)=>{
     empModel.find({}).sort({"_id":1})
     .then(result=>{
         res.send(result)
     })

})
app.post("/addemp",(req,res)=>{
    // Emp.save()
    empModel.insertMany(req.body)
    res.send("inserted")


});
app.delete("/deleteemp/:_id",(req,res)=>{
    id=parseInt(req.params._id) 
    empModel.collection.remove({"_id":id})
    res.send("deleted")
})
app.put("/updateemp/:_id",(req,res)=>{
    id=parseInt(req.params._id);
    console.log(req.body);
    empModel.collection.updateOne({ "_id": id },{ $set: { salary: parseInt(req.body.salary) }});
    res.send("Updated");
})

module.exports=empModel;