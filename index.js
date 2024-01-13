const express = require('express');

const app = express();

const hostname = '127.0.0.1';

const port = 3000;

/*endpoints*/
app.get('/', (req, res) => {

  res.send('Hola Mundo, soy Mario U Camper. Agregando variable hostname para que se vea en el navegador.');

});

app.get('/body', (req, res) => {

    res.json({
        
        nombre: "Mario Lara", //req.body.nombre,
        
        apellidomaterno: "Perez", // req.body.apellidomaterno,
        
        edad: 47,//req.body.edad

    });

});

app.get('/:multiplicando/:multiplicar', (req, res) => {
    
    //res.send(`El id enviado es ${req.params.id}`);
    const multiplicando = req.params.multiplicando;

    const multiplicar = req.params.multiplicar;


    let tabla = '<br>';

    try {

        for(let i=1; i<=multiplicar; i++){

            tabla += `${multiplicando} x ${i} = ${multiplicando * i} <br>`;

        }

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

    res.send(`La tabla de multiplicar de ${multiplicando} hasta ${multiplicar} es ${tabla}`);
    
});

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

/* Start App*/
app.listen(port, () => {    

  console.log(`App activa en http://${hostname}:${port}`);

});