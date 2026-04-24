// MiddleWare Run Concept

// Browser --> Request --> Server(Middleware) --> Response --> Browser
import express from 'express';
import Routes from './Routes/Routes.mjs';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import {Strategy as Localstrategy} from 'passport-local';
import passport from "passport";
import { users } from './Utils/constants.mjs';
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
App.use(passport.initialize());
App.use(passport.session());

passport.use( new Localstrategy(
    {usernameField:"user_name",passwordField:"password"}
    ,(user_name,password,done)=>{
    const user=users.find((user)=>user_name==user_name);
    if(!user){
        return done(null, false,{message:"invalid username"});
    }

    if(user.password!==password){
        return done(null ,false,{message:"incorrect password"})
    }
    return done(null,user)
}))

passport.serializeUser((user, done)=>{
    done(null,user.id)
})

passport.deserializeUser((id, done)=>{
    const user =users.find((u)=>u.id==id)

    done(null,user||false);
})

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



App.post("/login",(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if(err) return next(err);
        if(!user){
            return res.status(401).json({message: info?.message ||"User Not Found"})
        }

        req.logIn(user,err=>{
            if(err) return next(err);
            return res.json({message:'Login Done',user})
        })


    })(req,res,next);
})


App.listen(Port,()=>{
    console.log(`App is run on ${Port}`);
    
});