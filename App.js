const exp=require('express');

const app=exp();

app.listen(3000);


app.use((req,res,next)=>{
    console.log(req.host);
    console.log(req.path);
    next();
})

app.get('/',(req,res)=>{
    // res.status(200).send('<h1> Heloo Express Js');
    res.status(200).sendFile('/docs/index.html',{root:__dirname})
})

app.get('/career',(req,res)=>{
    res.sendFile('/docs/Career.html',{root:__dirname})
})

app.get('/about',(req,res)=>{
    res.sendFile('./docs/about.html',{root:__dirname})
})


app.get('/abouts',(req,res)=>{
    res.redirect('/about')
})

app.use((req,res)=>{
    res.status(404).sendFile('/docs/NotFound.html',{root:__dirname})
})




// MiddleWare Run Concept

// Browser --> Request --> Server(Middleware) --> Response --> Browser