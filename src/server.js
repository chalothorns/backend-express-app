import express from "express";

const app = express();

// our very first API endpoint!
app.get('/', (req, res) => {
  res.send("Hello Client!, I am your Server !")
});

app.listen(3000,() => {
    console.log("Server running on port 3000!");
});