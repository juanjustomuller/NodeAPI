const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
const cors = require('cors')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND
//para que solo la ruta del frontend acceda al back, tmb se puede borrar y dejar solo el cors, para que cualquier ruta acceda al back
var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
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
