1.- Crear carpeta
    mkdir ejercicio1

2.- Entrar a la carpeta
    cd ejercicio1

3.- Establecer folder para el proyecto
    npm init -y

4.- Instalar express
    npm i express

5.- Instalar nodemon
    npm i -D nodemon

6.- modificar package.json agregando en scripts 
    "scripts": {
        "dev": "nodemon server.js"
    },
7.- touch index.js
    /* Cargar express*/
    const express = require('express');

    /* Inicializar express*/
    const app = express();

    /* variable para la url */
    const hostname = '127.0.0.1';

    /* variable para el puerto */
    const port = 3000;
    /* Iniciar App*/
    app.listen(port, () => {    

    console.log(`App activa en http://${hostname}:${port}`);

    });
8.- npm run dev

9.- Agregar endpoints
    sin params
    con params
    con query
    con body
    con files

10.- Usar postman para probar
    POST -> CREAR / AGREGAR
    GET -> OBTENER / RECUPERAR 
    PUT -> ENVIAR CAMBIOS
    DELETE -> BORRAR / ELIMINAR