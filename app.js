require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const { hashPassword } = require("./auth.js");

//MOVIES

//GET
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//POST
app.post("/api/movies", movieHandlers.postMovie);

//PUT
app.put("/api/movies/:id", movieHandlers.updateMovie);

//DELETE
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

//USERS

//GET
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

//POST
app.post("/api/users", hashPassword, usersHandlers.postUsers);

//PUT
app.put("/api/users/:id", usersHandlers.updateUsers);

//DELETE
app.delete("/api/users/:id", usersHandlers.deleteUsers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
