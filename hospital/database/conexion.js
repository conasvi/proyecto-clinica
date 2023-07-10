const mysql =require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'vinasco',
    database:'clinica',
    charset:'utf8mb4'
});

connection.connect((error) => {
    if(error){
        console.error('Error al conectar a la base de datos',error);

    }
});

module.exports={connection};