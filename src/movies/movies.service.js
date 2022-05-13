const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// Knex tables
function list() {
  return knex("movies").select("*");
}
function listIfTrue() {
  return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true });
}
function read(id) {
  return knex("movies").select("*").where({ movie_id: id }).first();
}

function readTheaters(id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ movie_id: id, is_showing: true });
}

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((result) => {
      const returnList = [];
      result.forEach((item) => {
        const itemWithCritic = addCritic(item);
        returnList.push(itemWithCritic);
      });
      return returnList;
    });
}

module.exports = {
  list,
  listIfTrue,
  read,
  readTheaters,
  readReviews,
};