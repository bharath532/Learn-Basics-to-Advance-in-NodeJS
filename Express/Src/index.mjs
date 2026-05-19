// MiddleWare Run Concept

// Browser --> Request --> Server(Middleware) --> Response --> Browser
import express from 'express';
import Routes from './Routes/Routes.mjs';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import {Strategy as Localstrategy} from 'passport-local';
import passport from "passport";
import { users } from './Utils/constants.mjs';
import mongoose from 'mongoose';
import { User } from './mongoDB/user.mjs';
import { comparepassword } from './Utils/Helper.mjs';
const App = express();

const Port = 3000;

App.use(express.json());
App.use(cookieparser("Bharath"));
// connect to mongodb using mongoose and we are using the local mongodb and we are using the Express database and we are using the mongoose connect method to connect to the mongodb and we are using the then method to log the message "DB Connected" if the connection is successful and we are using the catch method to log the error message if the connection is not successful
mongoose.connect('mongodb://localhost/Express')
.then(()=>{console.log("DB Connected")})
.catch((err)=>console.log("Not Connected"))


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
// we are using the local strategy for authentication and we are using the username and password for authentication and we are using the user_name and password fields for authentication and we are using the comparepassword function to compare the plain password with the hashed password and return true if the passwords match and false if they don't match and we can use this function to compare the password before sending it to the server and we can also use this function to compare the password before updating it in the server and we can also use this function to compare the password before deleting it from the server
passport.use( new Localstrategy(
    {usernameField:"user_name",passwordField:"password"}
    ,async(user_name,password,done)=>{
        try{
        const user= await User.findOne({user_name:user_name})
         if(!user){
        return done(null, false,{message:"invalid username"});
    }

    if(comparepassword(password , user.password)){
        return done(null ,false,{message:"incorrect password"})
    }
    return done(null, user)
    }
    catch(err){
        console.log(err);
    }
    return done(err,false)
}))
// passport serializeUser and deserializeUser methods are used to serialize the user object and store it in the session and deserialize the user object from the session and we are using the user id to serialize and deserialize the user object and we are using the User model to find the user by id and return the user object if found and return false if not found and we can use this method to serialize the user object before sending it to the server and we can also use this method to deserialize the user object before updating it in the server and we can also use this method to deserialize the user object before deleting it from the server
passport.serializeUser((user, done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id, done)=>{
    try{
        const user = await User.findById({id})
         done(null,user);
    }
    catch(err){
        console.log(err);
        done(err,false)
    }
    
})

App.use(Routes);
// get in node js is used to get the data from the server and we are using the root route to get the data from the server and we are using the res.send method to send the data to the client and we are using the res.cookie method to set the cookie in the browser and we are using the req.sessionStore.get method to get the session data from the session store and we are logging the session data in the console and we are sending the response to the client with a message "root"
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