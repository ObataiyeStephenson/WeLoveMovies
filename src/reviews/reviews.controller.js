const service = require("./reviews.service")

//MIDDLEWARE//
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: "Review cannot be found.",
  });
}



//CRUD //

async function destroy(req, res) {
  await service.destroy(Number(res.locals.review.review_id));
  res.sendStatus(204);
}

async function update(req, res) {
  const { reviewId } = req.params;
  const { content, score } = req.body.data;
  res.locals.review.content = content;
  res.locals.review.score = score;
  const review = await service.update(res.locals.review);
  const data = await service.readCriticReview(reviewId);
  res.json({ data: data[0] });
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
  reviewExists,
}