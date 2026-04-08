// FS - File System


const { log } = require('console');
const fs=require('fs')

// Create A File   --> mkdir
// if( !fs.existsSync('./dfile')){
//     fs.mkdir('./dfile',(err)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log("NEW FILE CREATED");
//     }
// })
// }

// else{
//     console.log("File Already exist");
// }




// Writen A file

//     fs.writeFile('./docs/sample.text','hello everyone',(err)=>{
//     if(err){
//         console.log(err.message);

//     }
//     else{
//         console.log("file is writen");
//     }
// })


// Read A file

// if(fs.existsSync('./docs/sample.text')){
//     fs.readFile('./docs/sample.text',(err,data)=>{
//         if(err){
//             console.log(err.message);
//         }
//         else{
//             console.log(data.toString());
//         }
// })
// }


// Delete A File

// if(fs.existsSync('./docs/sample.textt')){
//     fs.unlink('./docs/sample.textt',(err)=>{
//         if(err){
//             console.log(err.message);
//         }

//         else{
//             console.log("File Deleted Sucessfully");
//         }
//     })
// }
// else{
//     console.log("File Not Exist");
// }

if(fs.existsSync('./dfile')){
    fs.rmdir('./dfile',(err)=>{
        if(err){
            console.log(err.message);
        }
        else{
            console.log("Folder deleted");
        }
    })
}

else{
    console.log("Folder Not Exist");
    
}
