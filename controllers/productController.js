const Product = require("../models/productModel")
const asyncHandler = require('express-async-handler')

//Trae todos los productos
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}) //si lo pongo vacio me trae todo
        res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//Trae un solo producto 
const getProduct = asyncHandler (async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
        //res.status(500).json({message: error.message})
    }
})

//Crear Producto
const createProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//Actualizar Producto
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body) //primer parametro el id, y segundo la informacion del cliente que viene en req.body
        //no podemos encontrar el producto para actualizar en la base de datos
        if(!product){
            res.status(404)
            throw new Error(`No podemos encontrar el producto con ID: ${id}`)
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//Borrar Producto
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404)
            throw new Error(`No podemos encontrar el producto con ID: ${id}`)
            //res.status(404).json({message: `No podemos encontrar el producto con ID: ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}