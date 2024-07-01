import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    size: req.body.size,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
};

export const removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
};

export const getAllProducts = async (req, res) => {
  let products = await Product.find({});
  res.send(products);
};

export const getPopularInWomen = async (req, res) => {
  let products = await Product.find({ category: 'women' });
  let popularInWomen = products.slice(0, 4);
  res.send(popularInWomen);
};

export const getNewCollections = async (req, res) => {
  let products = await Product.find({});
  let newCollection = products.slice(1).slice(-8);
  res.send(newCollection);
};
