// const express = require("express"); type:common.js -> old method
import express from "express"; //type:module; -> latest method
import { MongoClient } from "mongodb";

const app = express();
const PORT = 4000;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongodb is connected");

const movies = [
  {
    id: "100",
    name: "RRR",
    poster:
      "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
    rating: 8.8,
    summary:
      "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
    trailer: "https://www.youtube.com/embed/f_vbAtFSEc0",
  },
  {
    id: "101",
    name: "Iron man 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    rating: 7,
    summary:
      "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    trailer: "https://www.youtube.com/embed/wKtcmiifycU",
  },
  {
    id: "102",
    name: "No Country for Old Men",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    rating: 8.1,
    summary:
      "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    trailer: "https://www.youtube.com/embed/38A__WT3-o0",
  },
  {
    id: "103",
    name: "Jai Bhim",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:
      "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
  },
  {
    id: "104",
    name: "The Avengers",
    rating: 8,
    summary:
      "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    poster:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
  },
  {
    id: "105",
    name: "Interstellar",
    poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    rating: 8.6,
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: "106",
    name: "Baahubali",
    poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    rating: 8,
    summary:
      "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
  },
  {
    id: "107",
    name: "Ratatouille",
    poster:
      "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    rating: 8,
    summary:
      "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
  },
];
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
    .deleteOne({ id: id });

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
