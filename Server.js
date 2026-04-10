 const http=require('http');
 const fs=require('fs');

 const Server=http.createServer((req,res)=>{
    console.log('Server Responded');
    // console.log(req.url);
    // console.log(req.method);

    // Response
    res.setHeader('Content-Type','text/html')
    // res.write('<h1>RESPONE SUCESSFULLY</ h1>')
    // res.write('\n NEXT\n')

    let path ='./docs/';

    if(req.url =='/'){
        path +='index.html';
    }
    else if(req.url == '/index'){
        res.statusCode=301;
        res.setHeader('Location','/');
        res.end();
    }
    else if(req.url=='/about'){
        path +='about.html';
    }
    else if(req.url =='/career'){
        path += 'career.html';
    }
    else{
        path+='NotFound.html';
        res.statusCode = 404;
    }


   
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err.message);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    })
    }
    
 );

 Server.listen(3000,'localhost',()=>{
    console.log("Server Active");
 })