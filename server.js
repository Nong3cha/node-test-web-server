const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    var  now = new Date().toString();
    var log  = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next ) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

hbs.registerPartials(__dirname+ '/views/partials');

app.get('/home', (req, res) => {
res.render('home.hbs',{
    pageTitle:'Home page',
    currentYear : new Date().getFullYear(),
    welcomeMessage: 'Welcome'
})
});
app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle:'Home page',
        currentYear : new Date().getFullYear(),
        welcomeMessage: 'Welcome'
    })
    });

app.get('/about', (req, res) => {
   res.render('about.hbs',{
    pageTitle:'About page',
    currentYear : new Date().getFullYear()
   });
});

app.get('/bad', (req, res) => {
    
    res.send({
        errorMessage: "Unable to handle request"
    })
});

app.listen(port, ()=>{
    console.log(`server is up on port ${port} `);
    
});