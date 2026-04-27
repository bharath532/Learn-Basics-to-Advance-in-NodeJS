import e, { Router } from "express";
import{users} from '../Utils/constants.mjs'
import { GetUserindex } from "../Utils/middlewares.mjs";
import { CreateSchema } from '../Utils/CreateSchema.mjs';
import{matchedData,checkSchema,validationResult}from 'express-validator'
// import { createCheckSchema } from "express-validator/lib/middlewares/schema";
import { User } from "../mongoDB/user.mjs";
import { haspassword } from "../Utils/Helper.mjs";

const router=Router();

router.get("/users",(req,res)=>{

    if(req.signedCookies.name && req.signedCookies.name==="ALAN" ){
        const {query:filter,value}=req;

    if(filter&&value){
       return res.send(users.find((user)=>user[filter].toLowercase().includes(value)))
    }

    return res.send(users);
    
    }

    else{
        return res.send({msg:"your not Alan and also your not right to acces the page"})
    }
    
})

router.get('/users/:id',(req,res)=>{
    const id=parseInt( req.params.id);

    if(isNaN(id)){
        return res.status(400).send({msg:"Invaild Id"})
    }
     const user=users.find(user=>user.id===id)

     if(user){
        return res.send(user)
     }
     else{
        return res.statusCode(404).send({msg:"User Not Found"})
     }
    
})

// POST


// router.post('/users',
//     checkSchema(CreateSchema),
//     (req,res)=>{

//         const result=validationResult(req);
//         // console.log(result);
//         if(!result.isEmpty()){
//             return res.status(404).send({error:result.array()})
//         }
        
//     const body=matchedData(req);
//     const Newuser={id:users[users.length-1].id+1, ...body}
//     users.push(Newuser)
//     res.status(201).send(Newuser)    
// })

router.post('/users',
   checkSchema(CreateSchema),
   async (req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty()){
        return res.status(404).send({error:result.array()})
    }
    const body =matchedData(req);
    body.password= await haspassword(body.password)
    const newuser =new User(body);
    try{
        const saveuser=await newuser.save();
        return res.send(saveuser)
    }
    catch(err){
        console.log(err.message);
    }
})

//Put  -->UPDATED
router.put('/users/:id',GetUserindex,(req,res)=>{
    const userIndex=req.userIndex;
    const {body}=req;
    users[userIndex]={id: id, ...body}
    return res.status(200).send({msg:"User Updated"})
})

// PATCH 

router.patch('/users/:id',GetUserindex,(req,res)=>{
    
    const userIndex=req.userIndex;
    const{body}=req;

    users[userIndex]={...users[userIndex],...body};
    res.status(200).send("User Patched")
})


// DELETE 
router.delete('/users/:id',GetUserindex,(req,res)=>{
    const userIndex=req.userIndex;
    console.log(userIndex);
    users.splice(userIndex,1);
    return res.send("User Deleted")
    
})





export default router;