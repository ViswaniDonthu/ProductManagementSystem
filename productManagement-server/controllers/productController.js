const Product = require("../models/Product");
const AppError = require('../middlewares/AppError').default
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.getProducts = async (req, res, next) => {
  const { category, search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
 console.log(req.query);
  let query = {};
  if (category && category !== "all") query.category = category;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sortQuery = {};
  if (sortBy === "price") {
    sortQuery.price = sortOrder === "desc" ? -1 : 1;
  } else if (sortBy === "newest") {
    sortQuery.createdAt = -1;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const products = await Product.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    data: products,
    count: products.length,
    total,
  });
};
// Create product
exports.createProduct = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.category ||
    !req.body.description
  ) {
    throw new AppError("All required fields must be filled", 400);
  }
  let imageUrl = "";
  let imageId = "";
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });
    fs.unlinkSync(req.file.path);
    imageUrl = result.secure_url;
    imageId = result.public_id;
  }
  const newProduct = await Product.create({
    ...req.body,
    image: imageUrl,
    imageId: imageId,
  });
  res.status(201).json({
    success: true,
    message: "Product created",
    data: newProduct,
  });
};

// Update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError("Product not found", 404);
  let imageUrl = product.image;
  let imageId = product.imageId;
  if (req.file) {
    if (product.imageId) {
      await cloudinary.uploader.destroy(product.imageId);
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });
    fs.unlinkSync(req.file.path);
    imageUrl = result.secure_url;
    imageId = result.public_id;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image: imageUrl,
      imageId: imageId,
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "Product updated",
    data: updatedProduct,
  });
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  if (product.imageId) {
    await cloudinary.uploader.destroy(product.imageId);
  }

  res.json({ success: true, message: "Product deleted", data: product });
};

// Get categories
exports.getCategories = async (req, res) => {
  const categories = await Product.distinct("category");
  if (!categories.length) {
    throw new AppError("No categories found", 404);
  }

  res.json({ success: true, data: categories });
};
