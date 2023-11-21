//Importo la instancia de sequelize para pasarla como argumento en la carga del modelo
const bd = require('../config/bd');

//Importo la funcion flecha que crea el modelo productos de producto.model.js, luego la ejecuto para cargar el modelo pasandole como parámetro la instancia de sequelize y lo exporto para que sea usado en productos.controller

const productosModel = require('./productos.model');  

//Cargo el modelo de productos en la constante Productos, esta va a ser usada para realizar las consultas a la base de datos

const Productos = productosModel(bd);


//Relaciones entre modelos

// ...

//Exportacion de modelos
module.exports = {
    Productos, //Lo importo en productos.controller y index.js (entry point)
};

