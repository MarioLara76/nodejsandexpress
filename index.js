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
app.get('/body', (req, res) => {

    const nombre = req.body.nombre;

    const apellidomaterno = req.body.apellidomaterno;

    const edad = req.body.edad;

    res.json({
        
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

/* endpoint para crear un archivo */
app.get('/archivo/crear', (req, res) => {

    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    fs.writeFile('archivo.txt', 'Hola Mundo', (err) => {

        if(err) 
            
            throw err;

        console.log('Archivo creado con éxito');

        res.send({
            result: true,
            message: 'Archivo creado con éxito',
        });

    });

});

/* endpoint para leer un archivo */
app.get('/archivo/leer', (req, res) => {

    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.params.filename

    fs.readFile('archivo.txt', 'utf-8', (err, data) => {

        if(err) throw err;

        console.log(`Contenido del archivo ${data}`);

        res.send({
            result: true,
            message: 'Archivo existe',
            data: data
        });

    });

});

/* endpoint para escribir un archivo */
app.get('/archivo/modificar', (req, res) => {

    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.params.filename

    const addTexto = "\nAgregar contenido al archivo otra vez";

    fs.appendFile('archivo.txt', addTexto, (err) => {

        if(err) throw err;

        res.send({
            result: true,
            message: 'Archivo actualizado',
            data: addTexto
        });

    });

});

/* endpoint para eliminar un archivo */
app.get('/archivo/eliminar', (req, res) => {
    
    const fs = require('fs'); /* importar libreria fs para leer y escribir archivos */

    const filename = req.params.filename

    fs.unlink('archivo.txt', (err) => {

        if(err) throw err;

        res.send({
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