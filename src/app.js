const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');


var app = express(); // var, let, const


//Define paths for express config
const publicDirecPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../src/templates/views')
const partialsPath = path.join(__dirname,'../src/templates/partials')


//setting up handlebars and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setting up static directory to serve
app.use(express.static(publicDirecPath));



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        author: "Siddharth Harsha"
    });
});

app.get('/help',(req,res) =>{
    // res.send({
    //     name: "Andrew",
    //     age : 27
    // });
    res.render('help',{
        contact : '201-508-7600',
        address : "Charlotte, NC",
        title: 'Weather',
        author: "Siddharth Harsha"
    })
});

app.get('/about',(req,res)=>{
    //res.send("this is an about page");
    res.render('about',{
        author : "Siddharth Harsha",
        day: "Monday",
        title: 'Weather'        
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send("Invalid request");
    }else{
        //res.send(req.query.location);        
        geocode(req.query.location,(error,data) =>{
            if(error){
                return res.send({error})
            }
            console.log(data);
            forecast(data.longitude,data.latitude,(error,forecastData={}) =>{
                if(error){
                    return res.send(error);
                }
                console.log(forecastData);
                res.send({
                    forecast : forecastData,      
                    location : data.place,              
                    address: req.query.location
                                       
                });
            })
        })
    }
})

app.get('/products',(req,res) =>{
    console.log(req.query)  
    res.send({
        products : []
    })
})


app.get('*',(req,res)=>{
    //res.send("Unable to fetch info")
    res.render('404',{
        author : "Siddharth Harsha",
        message:"Sorry, the page you're looking for doesn't exist!"        
    });
})

app.get('/help/*',(req,res)=>{
    //res.send("Unable to fetch info")
    res.render('404',{
        author : "Siddharth Harsha",
        message:"Sorry, the page you're looking for doesn't exist!"
    });
})

app.listen(3000,()=>{
    console.log("server is up in 3000");
});


