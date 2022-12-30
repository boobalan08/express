// const express = require("express"); type:common.js -> old method
import express from "express"; //type:module; -> latest method
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT;

dotenv.config();
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongodb is connected");

//! XML JSON Text
//! middleware = express.json() it convert json to JS object
// it is a new method every post method using js object
// app.use --> intercept --> apply express.json()
app.use(express.json());

//localhost:4000 home
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 heelo world");
});

// localhost:4000 movies
app.get("/movies", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }

  //cursor = pagination || to avoid pagination | cursor -> toArray()
  const movies = await client
    .db("movie")
    .collection("movies")
    .find(request.query)
    .toArray();
  console.log(movies);
  response.send(movies);
});

// //! localhost:4000/movies/id with id
// app.get("/movies/:id", function (request, response) {
//   const { id } = request.params;
//   console.log(request.params, id);
//   //filter giving array so we use find
//   const movie = movies.find((mv) => mv.id == id);

//   console.log(movie);
//   movie
//  /  ? response.send(movie)
//     : response.status(404).send({ message: "Movie not Found" });
// });

//! localhost:4000/movies/id using mongodb
app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await client
    .db("movie")
    .collection("movies")
    .findOne({ id: id });

  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie not Found" });
});

//! Post method

app.post("/movies", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db("movie").collection("movies").insertMany(data);
  response.send(result);
});

//! DELETE method
app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const movie_delete = await client
    .db("movie")
    .collection("movies")
    .deleteOne({ id: id });

  console.log(movie_delete);
  movie_delete.deleteCount > 0
    ? response.send({ message: "movie deleted successfully" })
    : response.status(404).send({ message: "Movie not Found" });
});

//! Update API

app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const movie_update = await client
    .db("movie")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });

  console.log(movie_update);

  response.send(movie_update);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
