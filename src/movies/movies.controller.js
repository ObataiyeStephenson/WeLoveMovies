const service = require("./movies.service");

// MIDDLEWARE //
async function movieExists(req, res, next) {
    const foundMovie = await service.read(req.params.id);
    if (foundMovie) {
      res.locals.movie = foundMovie;
      return next();
    }
    next({
      status: 404,
      message: "Movie cannot be found.",
    });
  }



// CRUD FUNCTIONS //

async function list(req, res) {
  const { is_showing } = req.query;
  is_showing
    ? res.json({ data: await service.listIfTrue() })
    : res.json({ data: await service.list() });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readTheaters( req, res){
  const { id } = req.params
  res.json({ data: await service.readTheaters(id) });
}

async function readReviews(req, res) { //for movies/:movieId/reviews
  const { movieId } = req.params;
  res.json({ data: await service.readReviews(movieId) });
}

module.exports = {
  list,
  read: [movieExists, read],
  readTheaters: [movieExists, readTheaters],
  readReviews
};
