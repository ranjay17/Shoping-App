import express from 'express'
import {productController} from './src/controllers/product.controller.js';
import path from 'path';
import validationMiddleware from './src/middleware/validation.middleware.js';
import ejsLayouts from 'express-ejs-layouts';
const port = 1600;
const server = express();


server.use(express.static('public'));
// PARSE FORM DATA otherwise it will not post the new product
server.use(express.urlencoded({extended: true}));

// setup the view engine
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(),"src","views"))

server.use(ejsLayouts);

//creating instance of class productController
const productControllers = new productController();
server.get('/',productControllers.getProducts)
server.get('/new',productControllers.getAddForm)
server.get('/update-product/:id', productControllers.getUpdateProduct)
server.post('/delete-product/:id', productControllers.deleteProduct)
server.post('/', validationMiddleware ,productControllers.addNewProduct);

server.post('/update-product', validationMiddleware, productControllers.postUpdateProduct);

server.use(express.static('src/views'))

server.listen(port, function(err){
    if(err){
        console.log('Error:',err);
    }else{
        console.log(`server is running on port: ${port}`);

    }
})

// view engine or template egine allow you to add dynamic content to your html files
// we can access js variables into html directly with the help of view engine





//arrays, str, map, recursion, sorching sorting, linkedlist., stack and queue