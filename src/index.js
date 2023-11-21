//Archivos entry point:

//Importo express
const express = require('express');

//Importo enrutadores creados en la carpeta routes para su montaje, con los enrutadores se definen las rutas (endpoints) para el manejo de las solicitudes HTTP y su conexión con los cotroladores específicos.
const productosRouter = require('./routes/productos.routes');

//Definicion del puerto para el servidor
const PUERTO = 8000;

//Importo la instancia de la base de datos para establecer conexión desde el entrypoint

const bd = require('./config/bd');

//Importo modelos para su sincronización
const { Productos } = require('./models/index');

//Middleware personalizado:
const middlewareDePrueba = (req, res, next) => {
    console.log("Llego una petición", req.body);
    next();
  };

//Se intancia la aplicación express en app:
const app = express();


/*
Se usan dos middlewares: express.json() para analizar el cuerpo de las solicitudes con formato JSON, y middlewareDePrueba definido anteriormente
*/

app.use(express.json());
app.use(middlewareDePrueba);

/*Montaje de enrutador productosRouter. Cualquier solicitud que coincida con estas rutas será manejada por este enrutador*/
app.use('/productos', productosRouter);

//Este manejador de solicitudes GET a la ruta raíz ("/")
app.get("/", (req, res) => {
    res.send("Realizaste una solicitud GET a la ruta raiz");
});



/*
.authenticate() es un método de la instancia bd que se utiliza para verificar la conexión a la base de datos y devuelve una promesa que se resolverá si la conexión es exitosa y se rechazará si hay algún problema durante la conexión
*/

async function iniciarServidor() {
  try {
    // Sincroniza el modelo con la base de datos
    await Productos.sync();
    console.log('Modelo sincronizado correctamente');
    await bd.authenticate()
    console.log('Conexión con base de datos establecida correctamente');
    //agrego escuchador al servidor en el puerto especificado
    app.listen(PUERTO, () => console.log(`Servidor corriendo en el puerto: ${PUERTO}`));

    
  } catch(error) {
    console.error('Error al conectar a la base de datos:', error);
  };
}

iniciarServidor();





