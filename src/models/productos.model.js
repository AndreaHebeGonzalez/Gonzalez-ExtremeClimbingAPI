/*
Modelo (Model):

Representa la estructura y la lógica de los datos de la aplicación.
Interactúa con la base de datos y realiza operaciones relacionadas con los datos.
No tiene conocimiento directo de la interfaz de usuario ni de cómo se presentan los datos
*/

//Importo DataTypes para definir los tipos de datos, y QueryTypes que es un objeto proporcionado por Sequelize que se utiliza para especificar el tipo de consulta que se está realizando.
const { DataTypes } = require('sequelize');


//Definicion del modelo producto 

module.exports = (bd) => {
    //Creo el modelo de productos
    const Productos = bd.define('Productos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false, //No puede ser nulo
        },          
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        caracteristicas: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        informacion_tecnica: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Productos;
}








