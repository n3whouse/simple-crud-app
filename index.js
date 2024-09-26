const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route.js");
const app = express();

app.use(express.json());//middleware to allow JSON responses to be viewed
app.use(express.urlencoded({ extended: false })); //middleware to allow form URLs to be viewed
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); /* using trycatch to save POST requests to the DB or throw error with message. 
        Product.create awaits the request body (async await). Once received, a product model is created and saved as product. The response sends a 200 OK and the new JSON product  */





mongoose
  .connect(
    "mongodb+srv://liminalpup:CLczflwL2nGgZNoR@liminaldb.wilsy.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to LiminalDB!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
