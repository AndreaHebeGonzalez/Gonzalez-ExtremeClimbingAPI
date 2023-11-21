const { body, param } = require('express-validator');

/* 
Que validaciones tengo que hacer:

    validarId,
    validarNombre,
    validarPrecio,
    validarDesc,
    validarCaract,
    validarinformacionTecnica,
    validarStock,
    validarImg,
    validarErrores

*/

const validarId = param('id')
    .notEmpty()
    .withMessage('El id es obligatorio')
    .isInt({
    min: 0,
    })

//dentro del parentesis de body se establece el campo que se va a validar, en este caso se valida el campo nombre, es lo que esta dentro del req.body:

const validarNombre = body('nombre') //es como si se accediera a req.body.nombre . Despues de esto sigue la cadena de validación:
    .isString()//Establece la restriccion de que sea un string para validarlo. 
    .withMessage('El nombre tiene que ser un string')//Se imprime un mensaje de error en el caso de que no lo sea
   .isLength({ //Se establce para su validacion que tenga como mínimo 4 caracteres 
        min: 4,
    })
    .withMessage('El nombre tiene que tener al menos 4 caracteres');

const validarPrecio = body('precio')
    .notEmpty() //la validación notEmpty() fallará solo si el campo está presente y tiene una cadena vacía (''). Si el campo es null o undefined, la validación pasa. --> en este caso para precio si el valor es null no pasará, por definicion el campo no puede ser nulo.
    .withMessage('El Precio es obligatorio')
    .isDecimal({
    min: 0,
    decimal_digits: '1,10',
    })
    .withMessage('El precio debe ser un número decimal con un máximo de 10 dígitos en total')
    .optional({ checkFalsy: true }) //No pasa la validación si es un valor "undefined", si no lo incluyo y doy el valor undefined, no pasa la validación .isDecimal()
    .withMessage('El precio no puede ser un valor falso');

/*
notEmpty(): Asegura que el campo no esté vacío. Incluso las cadenas que consisten solo en espacios en blanco se consideran no vacías. Sin embargo, si el campo es null o undefined, notEmpty() no lo considerará vacío, y no emitirá error

checkFalsy: true: Esto significa que cualquier valor considerado 'falsy' (como null, undefined, '', false, 0, etc.) será tratado como un valor falso y, por lo tanto, si "", o null o undefined o 0, NO PASARÁ LA VALIDACIÓN

Al combinarlos, se asegura de que el campo no esté vacío y que no sea un valor 'falsy'. Esto hace que la validación sea más estricta al requerir que el campo tenga un valor que sea tanto no vacío como no 'falsy'.
*/

const validarDescripcion = body('descripcion')
.isString()
.isLength({ min: 5, max: 800 })
.withMessage('La descripción debe tener entre 5 y 800 caracteres')

const validarCaract = body('caracteristicas')
//Validación custom para el json de este campo:
    .custom((value) => { //Value tiene el valor del campo que se esta validando
        try { //Bloque susceptible a errores
            const caracteristicas = value; //Parseo el json
            console.log(caracteristicas);
            const numCaracteristicas = Object.keys(caracteristicas).length;

            if (numCaracteristicas > 10) {
                throw new Error('No puede haber más de 10 características');
            }            

            return true;

        } catch (error) {
            throw new Error('No puede haber mas de 10 items');
        }
    });


const validarinformacionTecnica = body('informacion_tecnica')
    .custom((value) => { //Value tiene el valor del campo que se esta validando
        try { //Bloque susceptible a errores
            const infoTecnica = value; //Parseo el json

            //Cuando se ejecuta throw new Error, se detiene la ejecución del código actual y el flujo de control se transfiere al bloque catch más cercano. Si no hay un bloque catch, el programa se detendrá por completo y se imprimirá un mensaje de error en la consola.

            const cantidadInfoTecnica = Object.keys(infoTecnica).length;

            if (cantidadInfoTecnica > 10) {
                throw new Error('No puede haber más de 10 características');
            }            

            return true; //Si pasa todos los condicionales se valida

        } catch (error) {
            throw new Error('No puede haber mas de 10 items');
        }
    });

const validarStock = body('stock')
.isInt({ min:0 })
.withMessage('El numero debe ser un entero positivo')


const validarActualizarNombre = validarNombre.optional();

const validarActualizarDesc = validarDescripcion.optional();

const validarActualizarCaract = validarCaract.optional();

const validarActualizarinfoTecnica = validarinformacionTecnica.optional();

const validarActualizarPrecio = validarPrecio.optional();

const validarActualizarStock = validarStock.optional();


module.exports = {
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
    
}

/*Aclaraciones: 
Al utilizar .optional() después de la validación inicial, se indica que para la operación de actualización (como PUT), el campo precio es opcional. Esto significa que si el campo no está presente en la solicitud PUT, no se aplicarán las validaciones posteriores. O dicho de otra forma (o a la inversa) si no impongo .optional(), la validación será obligatoria, eso hace que si el campo no está presente en la request, la validación falla y devolvueve error.
*/