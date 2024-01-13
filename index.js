/* Cargar express*/
const express = require('express');

/* Inicializar express*/
const app = express();

/* variable para la url */
const hostname = '127.0.0.1';

/* variable para el puerto */
const port = 3000;

/* Para poder obtener parametros req usando body */
app.use(express.json());

/*endpoints*/
app.get('/', (req, res) => {

  res.send('Hola Mundo, soy Mario U Camper. Agregando variable hostname para que se vea en el navegador.');

});

/*endpoint body antes de aquellos que usen params, de preferencia after de raiz*/
/* El uso de body debe usar return res.json({}) */
app.get('/body', (req, res) => {

    const nombre = req.body.nombre;

    const apellidomaterno = req.body.apellidomaterno;

    const edad = req.body.edad;

    return res.json({
        
        nombre: nombre,
        
        apellidomaterno: apellidomaterno,
        
        edad: edad

    });

});

/* endpoint con query (igual a usar ?id=variable en la url) */
app.get('/query', (req, res) => {

    const nombre = req.query.nombre;

    const apellidomaterno = req.query.apellidomaterno;

    const edad = req.query.edad;
    
    res.json({
        ok: true,
        msg: 'Petición GET realizada con éxito: ' + nombre + ' ' + apellidomaterno + ' with edad: ' + edad + ' años',
        data: {
            nombre: nombre,
            apellidomaterno: apellidomaterno,
            edad: edad
        },
    });
    
});
/* endpoints para CRUD */
/* endpoint GET para obtener todos los usuarios */
app.get('/usuarios', (req, res) => {

    res.json({
        success: true,
        message: 'Lista de usuarios'
    });

});

/* endpoint GET para obtener un usuario */
app.get('/usuarios/:id', (req, res) => {
    
    const id = req.params.id;

    res.json({
        success: true,
        message: `Usuario with id ${id} obtenido`,
        id: id
    });

});

/* endpoint POST para crear usuario*/
app.post('/usuarios', (req, res) => {

    const action = req.body.action;

    res.json({
        success: true,
        message: 'Usuario creado',
        action: action
    });

});

/* endpoint PUT para actualizar usuario*/
app.put('/usuarios/:id', (req, res) => {

    const action = req.body.action;

    res.json({
        success: true,
        message: 'Usuario actualizado'
    });

});

/* endpoint DELETE para eliminar usuario*/
app.delete('/usuarios/:id', (req, res) => {
 
    const action = req.body.action;

    res.json({
        success: true,
        message: 'Usuario eliminado'
    });

});

/* endpoints para manejo de archivos */
/* endpoint para crear un archivo */
app.post('/archivo/crear', (req, res) => {

    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.body.filename;

    const texto = req.body.texto;

    fs.writeFile(filename, texto, (err) => {

        if(err) {
            
            console.log(err);

            return res.json({
                result: false,
                message: 'Archivo no se puede crear. Revise permisos de escritura',
            });

        }

        console.log('Archivo creado con éxito');

        return res.json({
            result: true,
            message: 'Archivo creado con éxito',
            data: texto
        });

    });

});

/* endpoint para leer un archivo */
app.get('/archivo/leer', (req, res) => {

    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.body.filename

    const contenido = fs.readFile(filename, 'utf-8', (err, data) => {

        if(err) {
            
            console.log(err);

            return res.json({
                result: false,
                message: 'Archivo no existe o no se puede leer',
            });

        }

        console.log(`Contenido del archivo ${data}`);

        return res.json({
            result: true,
            message: 'Archivo existe',
            data: data
        });

    });

    console.log(`Contenido en el file es ${contenido}`);

});

/* endpoint para escribir un archivo */
app.put('/archivo/modificar', (req, res) => {

    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.body.filename

    const addTexto = req.body.addTexto;

    fs.appendFile(filename, addTexto, (err) => {

        if(err) {
            
            console.log(err);

            return res.json({
                result: false,
                message: 'Archivo no existe o no se puede leer ni modificar. Revise permisos de escritura',
            });

        }

        return res.json({
            result: true,
            message: 'Archivo actualizado',
            data: addTexto
        });

    });

});

/* endpoint para eliminar un archivo */
app.delete('/archivo/eliminar', (req, res) => {
    
    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.body.filename

    fs.unlink(filename, (err) => {

        if(err) {
            
            console.log(err);

            return res.json({
                result: false,
                message: 'Archivo no existe o no se puede eliminar. Revise permisos de escritura',
            });

        }

        return res.json({
            result: true,
            message: 'Archivo eliminado',
        });

    });

});

/* endpoints con parametros siempre al final */
/* endpoint con un parametro */
app.get('/:id', (req, res) => {
    
    res.send(`El id enviado es ${req.params.id}`);
    
    /* Retornar respuesta en JSON*/
    /*res.json({
        ok: true,
        msg: 'Tabla de multiplicar generada con éxito',
        data: {
            multiplicando: multiplicando,
            multiplicar: multiplicar,
            resultado: tabla
        }
    });*/
    
});

/* endpoint con dos parametros */
app.get('/:multiplicando/:multiplicar', (req, res) => {
    
    const multiplicando = req.params.multiplicando;

    const multiplicar = req.params.multiplicar;


    let tabla = '<br>';

    try { /* try catch para manejar errores */

        for(let i=1; i<=multiplicar; i++){

            tabla += `${multiplicando} x ${i} = ${multiplicando * i} <br>`;

        }

        /* Retornar respuesta en JSON */
        /*res.json({
            ok: true,
            msg: 'Tabla de multiplicar generada con éxito',
            data: {
                multiplicando: multiplicando,
                multiplicar: multiplicar,
                resultado: tabla
            }
        });*/

        res.send(`La tabla de multiplicar de ${multiplicando} hasta ${multiplicar} es ${tabla}`);

    } catch (error) {

        console.log(error);

    }
    
});

/* Iniciar App*/
app.listen(port, () => {    

  console.log(`App activa en http://${hostname}:${port}`);

});