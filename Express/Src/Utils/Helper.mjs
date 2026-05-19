import bcrypt from 'bcrypt'


// the higher the saltround the more secure but also more time consuming
const saltround=10;

// Hash the password using bcrypt and return the hashed password and the salt used for hashing the password and we can use this function to hash the password before saving it to the database and we can also use this function to hash the password before sending it to the server and we can also use this function to hash the password before updating it in the server and we can also use this function to hash the password before deleting it from the server
export const haspassword = (password)=>{
    const salt=bcrypt.genSaltSync(saltround);
    return  bcrypt.hash(password,salt)
}
// export the bcrypt compare function to compare the plain password with the hashed password and return true if the passwords match and false if they don't match and we can use this function to compare the password before sending it to the server and we can also use this function to compare the password before updating it in the server and we can also use this function to compare the password before deleting it from the server
export const comparepassword =(plain,hashed)=>{
   return  bcrypt.compareSync(plain,hashed)
}