import path from 'path';
import productModel from '../models/product.models.js';

export default class productController{
    getProducts(req,res){
        let products = productModel.get();
        console.log(products)
        console.log(path.resolve())
        res.render('products',{products:products})
       // return res.sendFile(path.join(path.resolve(),"src","views",'product.html'));
    }

    getAddForm(req,res){
        return res.render('new-product', {errorMessage: null});
    }

    addNewProduct(req,res){
        //to access data from forms
        console.log(req.body)

        productModel.add(req.body)
        let products = productModel.get();
        return res.render('products',{products})
        
    }

    getUpdateProduct(req,res,next){
        //if product exist return view
        const id = req.params.id;
        const productFound = productModel.getById(id);

        if (productFound){
            res.render('update-product',
            {product: productFound, 
            errorMessage: null});
            //return error
        }else{
            res.status(401).send('product not found');
        }
        
    }

    postUpdateProduct(req,res){
        productModel.update(req.body)
        let products = productModel.get();
        res.render('products',{products})
    }
    deleteProduct(req,res){
        const id = req.params.id;
        
        const productFound = productModel.getById(id);
        if (!productFound){
            res.status(401).send('product not found');
        }
        productModel.delete(id)
        let products = productModel.get();
        res.render('products',{products})
    }
}

export{productController};