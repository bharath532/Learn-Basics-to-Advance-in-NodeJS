import bcrypt from 'bcrypt'

const saltround=10;

export const haspassword = (password)=>{
    const salt=bcrypt.genSaltSync(saltround);
    return  bcrypt.hash(password,salt)
}

export const comparepassword =(plain,hashed)=>{
   return  bcrypt.compareSync(plain,hashed)
}