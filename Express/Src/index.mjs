// MiddleWare Run Concept

// Browser --> Request --> Server(Middleware) --> Response --> Browser
import express from 'express';
import Routes from './Routes/Routes.mjs';
import cookieparser from 'cookie-parser';
import session from 'express-session';
const App = express();

const Port = 3000;

App.use(express.json());
App.use(cookieparser("Bharath"));
App.use(session(
    {
        secret:"secert session",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:60000*6
        }
    }
))
App.use(Routes);

// GET
App.get('/',(req,res)=>{

    res.cookie("name","ALAN",{maxAge:6000*60,signed:true});
    console.log(req.session.id);
    req.sessionStore.get(req.session.id,(err,sessiondata)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(sessiondata);
        }
    })
    res.send({msg:"root"})
})



App.listen(Port,()=>{
    console.log(`App is run on ${Port}`);
    
});