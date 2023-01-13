// const express = require("express"); type:common.js -> old method
import express from "express"; //type:module; -> latest method
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import { auth } from "./middleware/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongodb is connected");

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}



//! XML JSON Text
//! middleware = express.json() it convert json to JS object
// it is a new method every post method using js object
// app.use --> intercept --> apply express.json()
app.use(express.json());
app.use(cors());
//localhost:4000 home
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 heelo world");
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
// localhost:4000 movies

app.use("/movies", moviesRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
