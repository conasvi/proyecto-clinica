var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('pacientes', { title: 'pacientes', pacientes: results, opcion:'disabled', estado:true })
        }
    });
});
router.get('/enviar/:clave', function (req, res, next) {
    const clave=req.params.clave;
    connection.query('SELECT * FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('pacientes', { title: 'pacientes',claveSeleccionada:clave,pacientes: results, opcion:'disabled', estado:false })
        }
    });
});


router.get('/agregar-pacientes', function (req, res, next) {
    res.sendFile('registro_pacientes.html', { root: 'public' })
});
router.post('/agregar', (req, res) => {
    const nombres = req.body.nombres
    const apellido=req.body.apellido
    const cedula = req.body.cedula
    const edad = req.body.edad
    const telefono = req.body.telefono
    const especialidad = req.body.especialidad;
    connection.query(`INSERT INTO pacientes(nombres,apellido,cedula,edad,telefono,especialidad) VALUES ('${nombres}','${apellido}',${cedula},${edad},${telefono},'${especialidad}');`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta ")
        } else {
            res.redirect('/pacientes')
        }
    });

})
router.post('/actualizar/:cedula', (req, res) => {
    const nombres = req.body.nombres
    const apellido=req.body.apellido
    const cedula = req.params.cedula
    const edad = req.body.edad
    const telefono = req.body.telefono
    const especialidad = req.body.especialidad;
    connection.query(`UPDATE pacientes SET nombres='${nombres}',apellido='${apellido}', edad=${edad}, telefono = ${telefono},especialidad='${especialidad}' WHERE cedula=${cedula}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta ")
        } else {
            res.redirect('/pacientes')
        }
    });

})
//eliminar macotas 
router.get('/eliminar/:cedula', function (req, res, next) { 
    const cedula = req.params.cedula 
    connection.query(`DELETE FROM cita_medicas WHERE id_paciente=${cedula}`, (error, resultados) => { 
        if (error) { 
            console.log("Error en la consulta", error) 
            res.status(500).send("Error en la consulta") 
        } else { 
            connection.query(` DELETE FROM pacientes WHERE cedula=${cedula}`, (error, resultados) => { 
                if (error) { 
                    console.log("Error en la consulta", error) 
                    res.status(500).send("Error en la consulta") 
                } else {
                    res.redirect('/pacientes') 
                } 
            }); 
        } 
    }); 
});


module.exports = router;