// MiddleWare Run Concept

// Browser --> Request --> Server(Middleware) --> Response --> Browser
import express from 'express';
import Routes from './Routes/Routes.mjs'
const App = express();

const Port = 3000;

App.use(Routes);
App.use(express.json())

// GET
App.get('/',(req,res)=>{
    res.send({msg:"root"})
})



App.listen(Port,()=>{
    console.log(`App is run on ${Port}`);
    
});