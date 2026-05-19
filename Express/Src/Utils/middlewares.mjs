import { users } from "./constants.mjs"
// this is short middleware to get the user index from the users array and we can use this middleware in the routes that require the user index to get the user index from the users array and we can also use this middleware to get the user index from the users array before updating or deleting the user from the users array
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