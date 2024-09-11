import Product from '../models/product.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        console.error("Error in getting products : ", error.message);
        res.status(500).json({ success: false, msg: 'Server Error. Please try again' });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, msg: 'Please fill all fields' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, msg: 'Product created successfully', data: newProduct });
    } catch (error) {
        console.error("Error in creating product : ", error.message);
        res.status(500).json({ success: false, msg: 'Server Error. Please try again' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, msg: 'Invalid ID' });
    }
    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: 'Product deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, msg: 'Product Not Found' });
    }
}
