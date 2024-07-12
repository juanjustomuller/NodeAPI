const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hola NodeApi")
})

app.listen(3000, () => {
    console.log("El NodeApi server esta corriendo en el puerto 3000");
})