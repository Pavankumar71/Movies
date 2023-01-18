const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3")
const path = require("path")

const databasePath = path.join(__dirname."moviesData.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async() => {
    try {
        database:await open({,
        filename:databasePath,
        driver:sqlite3.Database,
        });
        app.listen(3000,() =>
        console.log("Server Running at http://localhost:3000/")
        );
    } catch(error) {
        console.log(`DB Error:${error.message}`);
        process.exit(1);
    }
};
initializeDbAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
    return {
        movieId:dbObject.movie_id,
        directorName:dBObject.director_id,
        movieName:dbObject.movie_name,
        leadActor:dbObject.lead_actor,
        directorId:dbObject.director_id

    };
};


//API 1//
app.get("/movies/",async(request,response)=>{
    const getMoviesQuery = `
    SELECT * FROM movie;`;
    const moviesArray = await database.all(getMoviesQuery);
    response.send(
        moviesArray.map((eachMovie) =>
        convertDbObjectToResponseObject(eachMovie)
    );
  );   
});

//API2//
app.post("/movies/", async(request,response) =>{
    const {directorId,movieName,leadActor} = request.body;
    const postMoviesQuery = `
    INSERT INTO
    movie(directorId,movieName,role)
    VALUES
    (
        ${directorId},
       '${movieName}',
        '${leadActor}'
        );`;
        const movie = await database.run(postMoviesQuery);
        response.send("Movie Successfully Added");
});
//API3//
app.get("/movies/:movieId/",async(request,response) =>{
    const{moviesId} = request.params;
    const getMovieQuery = `
    SELECT * 
    FROM movie
    WHERE movie_id = ${movieId};`;
    const movie = await database.get(getMovieQuery);
    response.send(convertDbObjectToResponseObject(movie))
});

//API4//
app.put("/movies/:movieId/",async(request.response)=>{
    const{directorId,movieName,leadActor} = request.body;
    const{movieId} = request.params;
    const updatePlayerQuery = `
    UPDATE
    movie
    SET
    movie_name = '${movieName}';
    director_id = '${directorId}
    lead_actor = '${leadActor}'
    WHERE
    movie_id = ${movieId};`;
    await database.run(updatePlayerQuery);
    response.send("Movie Details Updated")
  
});

//API5//
app.delete("/movies/:movieId/".async(request,response)=>{
    const {movieId} = request.params;
    const deleteMovieQuery = `
    DELETE FROM
    movie
    WHERE movie_id = ${movieId};`;
    await database.run("Movie Removed")
});

//API6//
app.get("/directors/",async(request,response)=>{
    const getDirectorsQuery = `
    SELECT * FROM director;`;
    const moviesArray = await database.all(getDirectorsQuery);
    response.send(
        moviesArray.map((eachDirectors) =>
        convertDbObjectToResponseObject(eachDirectors)
    );
  );   
});

//API7//
app.get("/directors/:directorId/movies/".async(request,response) => {
    const {directorsId} = request.params;
    const getMovieQuery = `SELECT
    movie_name FROM movie
    WHERE director_id = ${directorsId};`;
    let movieEle = await database.all(getMovieQuery);
    let output = movieEle.map((p) =>({
        movieName:p.movie_name,
    }));
    console.log(output);
    response.send(output);
});

module.exports = app;