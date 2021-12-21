import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    await Product.remove({});

    const createdUsers = await User.insertMany(data.users);
    const seller = await User.findOne({ isSeller: true });
    const products = data.products.map((product) => ({
      ...product,
      seller: seller._id,
    }));
    const createdProducts = await Product.insertMany(products);
    res.send({ createdUsers, createdProducts });
  })
);

export default seedRouter;
