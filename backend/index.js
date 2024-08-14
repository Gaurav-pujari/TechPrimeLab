const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Jwt=require("jsonwebtoken");
const { DateTime } = require('luxon');
app.use(cors()); 

require("./db/config");
const users = require("./db/User");


let login = require("./db/Login");
app.use(express.json());

jwtkey="e-comm";


app.post("/register", async (req, resp) => { 
  let user = new users(req.body);
  let result = await user.save();
  resp.send(result);
});
app.post("/login", async (req, resp) => {
 
    console.log(req.body);

   if (req.body.email && req.body.password) {
     let loginresult = await login.findOne(req.body);

    if (loginresult) {
      Jwt.sign({loginresult},jwtkey,{expiresIn:"2h"},(err,token)=>{
if(err){
resp.send("Error");
}else{

}
resp.send({loginresult,auth:token});
      })
    
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "No user found" });
  }
});




app.get("/products",async(req,resp)=>{
   let products=await users.find();
   if(products.length>0){
   resp.send(products);
   }
   else{
      resp.send({result:"No Products Found"});
   }
});


app.get('/products/:id',async(req,resp)=>{
let result=await users.findOne({_id:req.params.id});

if(result){
  resp.send(result);
}
else{
  resp.send({result:"not found"});
}
});

app.put('/product/:id',async(req,resp)=>{
let result= await users.updateOne(
  
  {_id:req.params.id},
  {
    $set:req.body
  }

)
resp.send(result);
});

app.get('/search/:key',async(req,resp)=>{

let result= await users.find({
  "$or":[
    {ThemeProject:{$regex:req.params.key }},
     { Reason:{$regex:req.params.key }},
     {Type:{$regex:req.params.key }},
     {Division:{$regex:req.params.key }},
     {Category:{$regex:req.params.key }},
     {Priority:{$regex:req.params.key }},
     {Department:{$regex:req.params.key }},
     {StartDate:{$regex:req.params.key }},
     {EndDate:{$regex:req.params.key }},
     {Location:{$regex:req.params.key }},
     {Status:{$regex:req.params.key }}
  ]
})
resp.send(result);
});






 app.get('/allprojectcounts',async(req,resp)=>{
  const today = DateTime.now().toISODate(); 
let totalproject=await users.countDocuments();
let closedproject= await users.countDocuments({Status:"Closed"});
let runningproject = await users.countDocuments({Status:"Running"});
let cancelledproject=await users.countDocuments({Status:"Cancelled"});
let closuredelay = await users.countDocuments({
  Status: "Running",
  EndDate: { $lt: today } 
});
resp.send([{totalproject:totalproject},{closedproject:closedproject},{runningproject:runningproject},{cancelledproject:cancelledproject},{closuredelay}]);


 });

  app.get('/closuredelayedprojects', async (req, resp) => {
    
        
        const today = DateTime.now().toISODate(); 
       
        let count = await users.countDocuments({
          Status: "Running",
          EndDate: { $lt: today } 
        });
        resp.send({ count:count });
    
});


app.get('/department-projects', async (req, resp) => {
  
    const result = await users.aggregate([
      {
        $group: {
          _id: '$Department',
          totalProjects: { $sum: 1 },
          closedProjects: { $sum: { $cond: [{ $eq: ['$Status', 'Closed'] }, 1, 0] } }
        }
      }
    ]);

    resp.send(result);

});

app.get('/dropdowndata/:key',async(req,resp) => {
  const priorityMap = {
    'Low': 1,
    'Medium': 2,
    'High': 3
};

const categoryMap = {
  'Quality A': 1,
  'Quality B': 2,
  'Quality C': 3,
  'Quality D': 4
};

const divisionMap={
'Filters':1,
'Compressor':2,
'Pumps':3,
'Glass':4,
'WaterHeater':5
};

const reasonMap={
  'Business':1,
  'Personal':2,
  'Dealership':3,
  'Transport':4
}

const locationMap={
  'Pune':1,
  'Mumbai':2,
  'Hyderbad':3,
  'Delhi':4
}

const departmentMap={
  "Strategy":1,
  "HR":2,
  "Maintenance":3,
  "Stores":4,
  "Quality":5,
  "Finance":6
}

const typeMap={
  "Internal":1,
  "External":2,
  "Vendor":3
}
const key=req.params.key;
if(key==='Priority')
      {

      
      const item = await users.find();
      item.sort((a, b) => priorityMap[a.Priority] - priorityMap[b.Priority]);
      resp.send(item);
      }
if(key==='Category'){
  const item = await users.find();
  item.sort((a, b) => categoryMap[a.Category] - categoryMap[b.Category]);
  resp.send(item);
}

if(key==='Division'){
  const item = await users.find();
  item.sort((a, b) => divisionMap[a.Division] - divisionMap[b.Division]);
  resp.send(item);
}

if(key==='Reason'){
  const item = await users.find();
  item.sort((a, b) => reasonMap[a.Reason] - reasonMap[b.Reason]);
  resp.send(item);
}

if(key==='Location'){
  const item = await users.find();
  item.sort((a, b) => locationMap[a.Location] - locationMap[b.Location]);
  resp.send(item);
}


if(key==='Department'){
  const item = await users.find();
  item.sort((a, b) => departmentMap[a.Department] - departmentMap[b.Department]);
  resp.send(item);
}

if(key==='Type'){
  const item = await users.find();
  item.sort((a, b) => typeMap[a.Type] - typeMap[b.Type]);
  resp.send(item);
}
});




app.listen(5000);
