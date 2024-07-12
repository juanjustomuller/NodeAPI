const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

app.use(express.json())

//routes
app.use('/api/products', productRoute);

// app.get('/', (req, res) => {
//     res.send("Hello NodeAPI");
// })

app.use(errorMiddleware)


mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`El NodeApi server esta corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


  //Arquitectura MVC
