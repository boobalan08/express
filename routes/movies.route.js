import express from "express";
import { auth } from "../middleware/auth.js";
import {
  moviesGet,
  moviesGetById,
  moviesPost,
  moviesDeleteById,
  moviesUpdateById,
} from "../services/movies.service.js";

const router = express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }

  //cursor = pagination || to avoid pagination | cursor -> toArray()
  const movies = await moviesGet(request);
  console.log(movies);
  response.send(movies);
});

//! localhost:4000/movies/id using mongodb
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await moviesGetById(id);

  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie not Found" });
});

//! Post method

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await moviesPost(data);
  response.send(result);
});

//! DELETE method
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const movie_delete = await moviesDeleteById(id);

  console.log(movie_delete);
  movie_delete.deleteCount > 0
    ? response.send({ message: "movie deleted successfully" })
    : response.status(404).send({ message: "Movie not Found" });
});

//! Update API

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const movie_update = await moviesUpdateById(id, data);

  console.log(movie_update);

  response.send(movie_update);
});

export default router;
