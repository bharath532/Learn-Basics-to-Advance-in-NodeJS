

//  this file is used to create the schema for the user and product data and we can use this schema to validate the data before sending it to the server and we can also use this schema to validate the data before fetching it from the server and we can also use this schema to validate the data before updating it in the server and we can also use this schema to validate the data before deleting it from the server
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
       
    }
  
}