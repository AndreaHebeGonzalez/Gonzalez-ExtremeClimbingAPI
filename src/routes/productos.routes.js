/*
En enrutador define las rutas de la aplicación y conecta las solicitudes HTTP con los controladores apropiados.
Actúa como un enrutador para dirigir las solicitudes a los controladores correspondientes
*/

//Se importa el objeto Router desde express para crear instancias de rutas.
const { Router } = require('express');

//Creación de la Instancia del Enrutador
const productosRouter = Router();

//Se deben importar los controladores para asociarlos a las rutas correspondientes
const productosController = require('../controllers/productos.controller');
/*
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
    
*/

//Importo el middleware validador de errores:
const { validarErrores } = require('../middlewares/validadorerr.middleware');

//Importo funciones de validación creadas en carpeta middlewares
const { 
    validarId,
    validarNombre,
    validarPrecio,
    validarDescripcion,
    validarCaract,
    validarinformacionTecnica,
    validarStock,
    //Validaciones de operaciones de actualización
    validarActualizarNombre,
    validarActualizarDesc,
    validarActualizarCaract,
    validarActualizarinfoTecnica,
    validarActualizarPrecio,
    validarActualizarStock,
} = require('../middlewares/productos.middleware');

//Creo los endpoint para el manejo de solicitudes HTTP:

//En cada solicitud se pasa la referencia a las funciones controlodaras,  La ejecución se realiza automáticamente por Express cuando una solicitud coincide con la ruta definida. 

productosRouter.get("/", productosController.buscarTodos);


productosRouter.post("/", [validarNombre,  validarPrecio, validarDescripcion, validarCaract, validarinformacionTecnica, validarStock, validarErrores], productosController.agregar
);

productosRouter.get(
    "/:id",
    [validarId, validarErrores],
    productosController.buscarPorId
);

productosRouter.put(
    "/:id",
    [
    validarId, 
    validarActualizarNombre, 
    validarActualizarDesc,
    validarActualizarCaract,
    validarActualizarinfoTecnica,
    validarActualizarPrecio,
    validarActualizarStock,
    validarErrores
    ],
    productosController.actualizar
);

productosRouter.delete(
    "/:id",
    /* [validarId, validarErrores], */
    productosController.borrar
);

module.exports = productosRouter; //Se importa en el entrypoint