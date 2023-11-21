//Controladres:
/*Gestiona la lógica de la aplicación y actúa como intermediario entre el modelo y la vista.
Responde a las solicitudes del usuario, realiza operaciones en el modelo y actualiza la vista.
*/

const { Productos } = require('../models/index');

//Creo controlador para buscar todos los productos 
// async va delante de la funcion que contendrá codigo asíncrono
const buscarTodos = async (req, res) => {
    try {
        const productos = await Productos.findAll(); //contiene la promesa si resuelve el resultado se almacena en productos
    //Envio los productos en el cuerpo de la respuesta, utilizo el metodo .json para eviarlo en este formato ya que los resultados de las consultas se devuelven en formato tipo objeto
    return res.json(productos);
    } catch (error) { //Si la promesa fue rechazada hubo un error y se ingresa en este bloque para imprimirlo y generar el estado de la consulta
        console.error('Se produjo un error en la busqueda de los productos', error);
        return res.status(500).json({msg:'Error interno del servidor'});
    }
};

//Creo controlador para agregar un producto (tengo que verificar que el producto no exista en la base de datos, por eso voy crear un modelo para buscar por nombre)
const agregar = async (req, res) => {
    //Obtengo los campos de la solicitud con sintaxis de desestructuracion
    const { nombre, marca, descripcion, caracteristicas, informacion_tecnica, precio, stock, categoria } = req.body;
    try {
        const nuevoProducto = await Productos.create({
            nombre, 
            marca, 
            descripcion, 
            caracteristicas, 
            informacion_tecnica, 
            precio, 
            stock, 
            categoria
        });
    //Enviamos una respuesta al cliente en formato de objeto:
    return res.status(201).json({
        msg: 'Producto agregado exitosamente',
        nuevoProducto,
    });
    } catch (error) {
        console.error('Hubo un error no pudo crearse el producto', error);
        //Error interno del servidor
        return res.status(500).json('Error interno del servidor');
    };
};


//Creo controlador para buscar un producto por su id
const buscarPorId = async (req, res) => {
    //obtengo el id de la consulta que se guarda como parámetro de ruta en req.params, lo convierto a tipo number, se almacena en la bd como tipo entero
    const id = Number(req.params.id);
      console.log('Valor de ID:', id); // Agrega este log para verificar el valor de id
    try {
        const producto = await Productos.findByPk(id);
        if(producto) {
            return res.json({
                msg: 'producto encontrado exitosamente',
                producto: producto,
            });
        } else {
            return res.status(404).json({msg: 'recurso no encontrado'});
        }
    } catch(error) {
        console.error(`Hubo un error al buscar el producto con id: ${id}`, error);
        return res.status(500).json({msg: 'Error interno del servidor'});
    }
};

//Creo controlador para actualizar un producto referenciado por id
const actualizar = async (req, res) => {
    const id = Number(req.params.id);
    const { nombre, marca, descripcion, caracteristicas, informacion_tecnica, precio, stock, categoria } = req.body;
    try {
        //Primero busco el producto por su id, y si lo encuentra lo actualizo
        const producto = await Productos.findByPk(id);
        if(producto) {
            const productoActualizado = await producto.update({
                nombre: nombre || producto.nombre, 
                marca: marca || producto.marca, 
                descripcion: descripcion || producto.descripcion, 
                caracteristicas: caracteristicas || producto.caracteristicas, 
                informacion_tecnica: informacion_tecnica || producto.informacion_tecnica, 
                precio: precio || producto.precio, 
                stock: stock || producto.stock, 
                categoria: categoria || producto.categoria,
            });
            return res.status(200).json({
                msg: 'El producto se actualizó correctamente',
                productoActualizado,
            });
        } else {
            return res.status(404).json({msg: 'Producto no encontrado'});
        };
    } catch(error) {
        console.error(`Hubo un error al actualizar el producto con id: ${id}`, error);
        return res.status(500).json('Error interno del servidor');
    }
};

//Creo controlador para borrar un producto 

const borrar = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const producto = await Productos.findByPk(id);
        if(producto) {
            productoBorrado = await producto.destroy()
            return res.json({msg: 'producto eliminado con exito'})
        } else {
            return res.status(404).json({msg: 'recurso no encontrado'});
        };
    } catch(error) {
        console.error(`Hubo un error al eliminar el producto con ID ${id}:`, error);
        return res.status(500).json({msg: 'Error interno del servidor'});
    };
};

module.exports = {
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
}

