import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    let check = await User.findOne({ email });

    if (check) {
      return res.status(400).json({
        success: false,
        errors: 'Existing user found with same email address',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const cart = req.body.cartData;
    const user = new User({
      name: req.body.username,
      email,
      password: hashedPassword,
      cartData: cart,
    });

    await user.save();

    const data = {
      user: { id: user.id },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
      });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

//Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, errors: 'Wrong Email Id' });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, errors: 'Wrong Password' });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Add to cart

export const addToCart = async (req, res) => {
  try {
    const cartItem = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { cart: cartItem } }, // Assuming `cart` is an array in the user's schema
      { new: true }
    );
    res.json({ message: 'Added', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}; 


// Remove from cart

export const removeFromCart = async (req, res) => {
  try {
    const newCartItem = req.body;
    let userData = await User.findOne({ _id: req.user.id });

    userData.cartData = userData.cartData.filter(
      (eachCartItem) => eachCartItem.product._id !== newCartItem._id
    );

    await userData.save();
    res.status(200).json({ message: 'Item Removed', cart: userData.cartData });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const getCart = async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
};
