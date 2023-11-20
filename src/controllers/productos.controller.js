//Controladres:
/*Gestiona la lógica de la aplicación y actúa como intermediario entre el modelo y la vista.
Responde a las solicitudes del usuario, realiza operaciones en el modelo y actualiza la vista.
No debe tener lógica de presentación, debe delegar eso a la vista.*/

const productosModel = require('../models/productos.model');

//Creo controlador para buscar todos los productos
const buscarTodos = (req, res) => {
    const productos = productosModel.buscarTodos();
    //Envio los productos en el cuerpo de la respuesta
    res.send({ productos, });
};

//Creo controlador para agregar un producto (tengo que verificar que el producto no exista en la base de datos, por eso voy crear un modelo para buscar por nombre)
const agregar = (req, res) => {
    //creo una variable para almacenar el body de la solicitud
    const producto = req.body;
    //Una vez que tengo el producto se lo paso como argumento al modelo
    productosModel.agregar(producto);
    //Enviamos una respuesta al cliente en formato de objeto:
    res.send({mensaje: 'Producto agregado exitosamente'})
};



//Creo controlador para buscar un producto por su id
const buscarPorId = (req, res) => {
    //obtengo el id de la consulta que se guarda como parámetro de ruta en req.params, lo convierto a tipo number, se almacena en la bd como tipo entero
    const id = Number(req.params.id); 
    const producto = productosModel.buscarPorId(id);
    res.send(producto,);
};

//Creo controlador para actualizar un producto referenciado por id
const actualizar = (req, res) => {
    const id = Number(req.params.id);
    //Creo una constante para guardar el producto actualizado y devolverlo en la respuesta
    const nuevoProducto = productosModel.actualizar(
        id, 
        req.body.nombre, //-> undefined en caso de que no exista 
        req.body.desc,
        req.body.caract,
        req.body.precio,
        req.body.stock,
        req.body.valoracion
    );
    res.send({nuevoProducto,});
};

//Creo controlador para borrar un producto 

const borrar = (req, res) => {
    const id = Number(req.params.id);
    const respuesta = productosModel.borrar(id);
    res.send ({respuesta});
}

module.exports = {
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
}