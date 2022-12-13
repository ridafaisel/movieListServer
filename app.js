let sqlite3 = require('sqlite3').verbose();
let bodyParser = require('body-parser');
const { count } = require('console');
const express= require('express');
const { list } = require('tar');
const app = express();

const port = 2000 ;

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
                    genres : bodyParser.json(row.genres),
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

}
// res.json()
main();