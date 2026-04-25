


export const CreateSchema={
    user_name:{
        notEmpty:{
            errorMessage:"User_Name must to be Field "
        },
        isLength:{  
                options:{min:2,max:10},
                errorMessage:"User name length is require 5 to 10"
        },
        isString:{
            errorMessage:"User name must be a String"
        }
    },

     password:{
        notEmpty:{
            errorMessage:"password is Must Added"
        },
       
    },
    age:{
        notEmpty:{
            errorMessage:"age is Must Added"
        },
       
    }
}