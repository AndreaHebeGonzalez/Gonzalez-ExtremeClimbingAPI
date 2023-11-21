//Este controlador maneja errores de validación utilizando la biblioteca express-validator. Se ejecuta al final del array de middleware a ejecutar para manejar los posibles errores de validación que haya en las solicitudes.

//Se importa la función validationResult de la biblioteca express-validator. Esta función verifica si hay errores de validación en la solicitud.

const { validationResult } = require("express-validator");

//! CON EXPRESS-VALIDATOR LOS ERRORES SIEMPRE TIENEN QUE MANEJARSE A TRAVÉS DE VALIDATIONRESULT

//Se define la función validarErrores que toma tres parámetros: req (objeto de solicitud), res (objeto de respuesta), y next (función para pasar al siguiente middleware).
const validarErrores = (req, res, next) => {
    //validationResult(req) devuelve un objeto que contiene información sobre los errores de validación encontrados en la solicitud req
    const resultado = validationResult(req);

  //resultado.isEmpty() // Pregunta si la variable resultado que es un objeto que almacena errores de la validación está vacía, es true si no tiene errores y está vacía, como delante de  resultado.isEmpty() hay un NOT (!), esto invierte la respuesta, por tanto si está vacía sin errores el resultado del condicional es false y no entra, solo retorna

    if (!resultado.isEmpty()) {
        res.status(404).send({
            errors: resultado.array(),
        });
        return;
    }
    next();
};

module.exports = {
    validarErrores,
};