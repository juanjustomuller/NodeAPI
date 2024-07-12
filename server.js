const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json())

//routes
app.get("/", (req, res) => {
  res.send("Hola NodeApi");
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({}) //si lo pongo vacio me trae todo
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post("/products", async (req, res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
})

app.put("/products/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body) //primer parametro el id, y segundo la informacion del cliente que viene en req.body
        //no podemos encontrar el producto para actualizar en la base de datos
        if(!product){
            return res.status(404).json({message: `No podemos encontrar el producto con ID: ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete("/products/:id", async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message: `No podemos encontrar el producto con ID: ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose
  .connect(
    "mongodb+srv://juanjustomuller:programacion2024@nodeapi.0pvngbb.mongodb.net/?retryWrites=true&w=majority&appName=NodeAPI"
  )
  .then(() => {
    console.log("conectado a MongoDB");
    app.listen(3000, () => {
      console.log("El NodeApi server esta corriendo en el puerto 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
