const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const productRoutes = express.Router();
const path = require("path");
const multer = require("multer");



let Product = require('./product.model');

//middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/products',{useNewUrlParser:true});
const connection = mongoose.connection

connection.once('open',function(){
    console.log("Mongodb success");
})

productRoutes.route('/').get(function(req,res){
    Product.find(function(err,products){
        if(err){
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

productRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Product.findById(id,function(err,product){
        res.json(product);
    });
});


productRoutes.route('/add').post(function(req,res){
    let product = new Product(req.body);
           
    product.save()
        .then(product =>{
            res.status(200).json({'product': 'product added sucessfully '});
        })
        .catch(err =>{
            res.status(400).send('adding new product failed ');
        });
});

productRoutes.route('/upload').post(function(req,res){
    upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if(!err)
           return res.send(200).end();
     });
});

productRoutes.route('/update/:id').post(function(req,res){
    Product.findById(req.params.id, function(err,product){
        if(!product)
            res.status(404).send('data is not found');
        else
            product.product_name = req.body.product_name;
            product.product_price = req.body.product_price;
            product.product_status = req.body.product_status;
            product.product_posted_by = req.body.product_posted_by;
            product.product_image = req.body.product_image;

            product.save().then(product =>{
                res.json('Product updated');

            })
            .catch(err=>{
                res.status(400).send("update not possible");
            });
    });
});

productRoutes.route('/delete/:id').post(function(req,res){
    Product.findById(req.params.id, function(err,product){
        if(!product)
            res.status(404).send('data is not found');
        else
            
            product.remove({"_id": req.params.id})
            .then(product =>{
                res.json('Product deleted');

            })
            .catch(err=>{
                res.status(400).send("Delete not possible");
            });
    });
});

app.use('/products', productRoutes);


app.listen(PORT,function(){
    console.log("Server is running on PORT" + PORT);
});