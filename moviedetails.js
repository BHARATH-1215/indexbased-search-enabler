const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
//This shows the LIst of Indexes
recordRoutes.route("/Indexes").get(async function (req, res)  {
  let db_connect = dbo.getDb("sample_mflix");
  db_connect
   .collection("movies")
   .listIndexes()
   .toArray()
   .then((result) => {
     console.log(result);
     res.json(result);
    });
});

// This section will help you get a list of all the movies.
recordRoutes.route("/moviedetails").get(async function (req, res)  {
 let db_connect = dbo.getDb("sample_mflix");
 db_connect
   .collection("movies")
   .find({})
   .toArray()
   .then((result) => {
     console.log(result);
     res.json(result);
   });
});

//this section will help you get the movie data based on title 
recordRoutes.route("/moviedetails/:title").get(function (req, res) {
  let db_connect = dbo.getDb("sample_mflix")
  let myquery=(req.params.title);
  db_connect
     .collection("movies")
     .find({title:myquery})
     .toArray()
     .then((result) => {
       console.log(result);
       res.json(result);
    });
 });

// This section will help you get movie search stats based on title
/*recordRoutes.route("/moviedetails/:title").get(function (req, res) {
 let db_connect = dbo.getDb("sample_mflix")
 let myquery=(req.params.title);
 db_connect
    .collection("movies")
    .find({title:myquery})
    .explain("executionStats")
    .then((result) => {
      console.log(`Number of documents examined: ${result.executionStats.totalDocsExamined}`)
      res.json(`Number of documents examined: ${result.executionStats.totalDocsExamined}`);
   });
});*/

/* This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
 */
 
module.exports = recordRoutes;