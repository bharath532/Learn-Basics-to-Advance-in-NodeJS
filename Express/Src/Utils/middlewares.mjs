import { users } from "./constants.mjs"

export const GetUserindex=(req,res,next)=>{
    const id=parseInt(req.params.id)

    if(isNaN(id)){
        res.send("Invail User")
    }

    const userIndex=users.findIndex(user=>user.id===id)
    if(userIndex===-1){
        res.send("User Not Found")
    }
    req.userIndex=userIndex;
    next();
}