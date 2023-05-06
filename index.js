const express = require("express");
const app = express();
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(require("./routes/moviedetails"));
// get driver connection
const dbo = require("./db/conn");

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, async() => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});