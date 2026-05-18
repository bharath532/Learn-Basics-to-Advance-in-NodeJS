import { Router } from "express";
import { products } from '../Utils/constants.mjs';

const router =Router();


// get is used to fetch the data from the server and post is used to send the data to the server and put is used to update the data in the server and delete is used to delete the data from the server
router.get('/products',(req,res)=>{

    req.session.visited=true;
    console.log(req.session.id);

    const {query:filter,value}=req;
    if(filter && value){
        return res.send(products.filter((product)=>product[filter].toLowerCase().includes(value)))
    }

     return res.send(products)
     console.log(products);
     
})
router.get('/products/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
     return  res.send({msg:"Product Id invalid"})
    }

    const user=products.find(user=>user.id===id)

    if(user){
        console.log(user.p_name);
      return  res.send(user)
      
    }
    else{
       return  res.send({msg:"Product Not Avaiable"})
    }
    
     
})



export default router;