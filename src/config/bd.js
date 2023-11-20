//Importo la clase sequelize: Sequelize es la clase principal de Sequelize que se utiliza para configurar la conexión a la base de datos.

const bd = require('sequelize');



//Instancio la clase 
const bd = new Sequelize({
    host: 'localhost',
    prompt: '3306',
    database: 'extremeclimbingbd',
    username: 'root',
    password: 'aHg0729675397',
    dialect: 'mysql'
});



module.exports = bd;
