import express from 'express';
import {
  signUp,
  login,
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/userController.js';
import fetchUser from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/addtocart', fetchUser, addToCart);
router.post('/removefromcart', fetchUser, removeFromCart);
router.post('/getcart', fetchUser, getCart);

export default router;
