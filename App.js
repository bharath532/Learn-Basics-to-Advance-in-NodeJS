const exp=require('express');

const app=exp();

app.listen(3000)

app.get('/',(req,res)=>{
    // res.status(200).send('<h1> Heloo Express Js');
    res.sendFile('/docs/index.html',{root:__dirname})
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
    res.sendFile('/docs/NotFound.html',{root:__dirname})
})