// MiddleWare Run Concept

// Browser --> Request --> Server(Middleware) --> Response --> Browser
import express from 'express';

const App = express();

const Port = 3000;




const Users=[
    {id:1,user_name:"Alan"},
    {id:2,user_name:"John"},
    {id:3,user_name:"Finch"},
    {id:4,user_name:"Andrew"},
    {id:5,user_name:"HulK"},
    {id:6,user_name:"Iron Man"}
]


const products=[
    {id:1,p_name:"Phone"},
    {id:2,p_name:"Grosery"},
    {id:3,p_name:"Dress"},
    {id:4,p_name:"Fruits"},
    {id:5,p_name:"TOOLS"}
]

// GET
App.get('/',(req,res)=>{
    res.send({msg:"root"})
})


App.get('/users',(req,res)=>{
    const {query:{filter , value}} = req;

    if(filter && value){
        return   res.send(Users.filter((user)=>user[filter].toLowerCase().includes(value)))
    }

    res.send(Users) 
      
})

App.get('/users/:id',(req,res)=>{
    const id=parseInt( req.params.id);

    if(isNaN(id)){
        return res.status(400).send({msg:"Invaild Id"})
    }
     const user=Users.find(user=>user.id===id)

     if(user){
        return res.send(user)
     }
     else{
        return res.statusCode(404).send({msg:"User Not Found"})
     }
    
    
})

App.get('/products/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
     return  res.send({msg:"Product Id invalid"})
    }

    const user=product.find(user=>user.id===id)

    if(user){
        console.log(user.p_name);
      return  res.send(user)
      
    }
    else{
       return  res.send({msg:"Product Not Avaiable"})
    }
    
     
})

App.get('/products',(req,res)=>{
    const {query:filter,value}=req;
    if(filter && value){
        return res.send(products.filter((product)=>product[filter].toLowerCase().includes(value)))
    }
    else{
        return res.send(products)
        console.log(products);
        
    }
})


// POST
App.use(express.json())

App.post('/users',(req,res)=>{
    console.log(req.body);
    const {body}=req;
    const Newuser={id:Users[Users.length-1].id+1,...body}
    Users.push(Newuser)
    res.status(201).send(Newuser)    
})


// PUT

App.put('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    
    if(isNaN(id)){
        res.send('USer ID Not Valid')
    }

    const userindex=Users.findIndex(user=>user.id===id)
    if(userindex===-1){
        return res.send({msg:"User Not Found"})
    }

    const {body}=req;
    Users[userindex]={id: id, ...body}
    return res.status(200).send({msg:"User Updated"})
})

App.listen(Port,()=>{
    console.log(`App is run on ${Port}`);
    
});