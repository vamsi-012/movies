const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "moviesData.db");

const app = express();
app.use(express.json());
let database = null;

const initializeDBAndServer = async () => {
  try {
    datebase = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// Get Movies API

app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
        SELECT 
            *
        FROM 
            movie;
    `;
  const moviesArray = await database.all(getMoviesQuery);
  response.send(moviesArray);
});
