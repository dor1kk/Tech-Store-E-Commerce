const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductsById);

module.exports = router;
