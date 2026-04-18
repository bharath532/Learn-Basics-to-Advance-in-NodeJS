


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

     age:{
        notEmpty:{
            errorMessage:"AGE is Must Added"
        },
        isLength:{
            options:{min:2 ,max:3},
            errorMessage:"Maxinum 3 Number"
        }
    }
}