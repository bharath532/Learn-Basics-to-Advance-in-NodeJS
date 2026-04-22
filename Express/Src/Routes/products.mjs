import { Router } from "express";
import { products } from '../Utils/constants.mjs';

const router =Router();



router.get('/products',(req,res)=>{

    req.session.visited=true;
    console.log(req.session.id);

    const {query:filter,value}=req;
    if(filter && value){
        return res.send(products.filter((product)=>product[filter].toLowerCase().includes(value)))
    }

     return res.send(products)
    
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