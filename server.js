const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongojs = require('mongojs');


const app = express()

var db = mongojs('scropbd', ['headlines'])

db.on('error', function (err) {
    console.log('database error', err)
})


app.use(express.json())
app.use(express.urlencoded())

app.use(express.static('public')); 

app.get('/', function (req, res) {
    res.send('at home')
})



app.get('/add', function (req, res) {
    // res.send('Hello World')

    // Make a request for a user with a given ID
    axios.get('https://www.nhl.com/')
        .then(function (response) {
            // handle success
            // console.log(response);

            console.log(response.data)

            const $ = cheerio.load(response.data)

            var headliner = [];

            $('li.related-links__item').each(function (index, element) {

                var header = $(element).find('a').text();
                var link = $(element).find('a').attr('href');


                headliner.push({
                    header: header,
                    link: link
                })             


            })

            console.log(headliner)

            

            for (var i =0; i< headliner.length; i++){


                
                db.headlines.save({
                
                    header: headliner[i].header,
                    link: headliner[i].link

                
                })


            }

            res.json(headliner)


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })




})


app.get('/all', function(req, res){

    db.headlines.find({}, function(err, data){
        if(err){
            console.log(err)
        }else{
            
            console.log(data)
            res.json(data)
        }
    })
})

app.listen(3000)

