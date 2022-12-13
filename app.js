
let sqlite3 = require('sqlite3').verbose();
let bodyParser = require('body-parser');
const { count } = require('console');
const express= require('express');
const { list } = require('tar');


const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const router = express.Router();
const cors = require("cors");
router.use(cors());

const port = 8000 ;

app.listen(port,()=>{
    console.log('listening on port '+ port);
})

async function main()
{
    let genres =  ["Comedy","Fantasy","Crime","Drama","Music","Adventure","History","Thriller","Animation","Family","Mystery","Biography","Action","Film-Noir","Romance","Sci-Fi","War","Western","Horror","Musical","Sport"]

    let db = new sqlite3.Database('Movies.db', sqlite3.OPEN_READWRITNE, (err) => {
    if (err) {
      return console.error( 'here');
    }
    console.log('Connected to the shipments database.');
  });


app.get('/',async (req,res)=>{
    const listt = await getall();
    res.json(listt)
})

app.get('/movies/:id',async (req,res)=>{
    const listt = await getMovie(req.params.id);
    res.json(listt)
})



function getall() {
    return new Promise((resolve,reject)=>{
        let movieList = {
            users: [{
                id: 1,
                type:'normal',
                username:'user',
                Password: 'user123'
            },{
                id: 2,
                type:'admin',
                username:'admin123',
                Password: 'admin123'
            }
        
        ]
            ,
            movies:[]}; 
        db.all(`SELECT * FROM movie`,[],(err,rows)=>{
         if(err)
         reject('not fulfilled because '+ err.message)
            rows.forEach(row=>{

                movieList.movies.push({
                    id : row.id,
                    title : row.title,
                    year : row.year,
                    runtime: row.runtime,
                    genres : row.genres,
                    director : row.director,
                    actors : row.actors,
                    plot : row.plot,
                    posterUrl : row.posterUrl
                })

            });
            resolve(movieList);
        });
        
    });
}


function getMovie(id) {
    return new Promise((resolve,reject)=>{
         sql= `SELECT * FROM Movie WHERE movie.id = ${id}; `
        db.all(sql,[],(err,rows)=>{
         if(err)
         reject('not fulfilled because '+ err.message)
          
         console.log(rows);

            
            setTimeout(()=>{
        resolve(rows)
            },1000)
        });
        
        
        
    });
}

}
// res.json()
main();