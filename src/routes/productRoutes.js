import express from 'express';
import {
  addProduct,
  removeProduct,
  getAllProducts,
  getPopularInWomen,
  getNewCollections,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', getAllProducts);
router.get('/popularinwomen', getPopularInWomen);
router.get('/newcollections', getNewCollections);

export default router;
