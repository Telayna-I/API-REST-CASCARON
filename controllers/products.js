const { response, request } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;

	const [total, products] = await Promise.all([
		Product.countDocuments({ status: true }),
		Product.find({ status: true })
			.populate("categorie", "name")
			.skip(Number(from))
			.limit(Number(limit)),
	]);

	res.json({ total, products });
};

const getProductById = async (req = request, res = response) => {
	const { id } = req.params;

	const product = await Product.findById({
		_id: id,
	}).populate("categorie", "name");
	res.json({ product });
};

const newProduct = async (req = request, res = response) => {
	const name = req.body.name.toUpperCase();
	const { price, description, _id, status, available, categorie } = req.body;

	try {
		const productDB = await Product.findOne({ name });
		if (productDB) {
			return res.status(401).json({
				msg: `El producto ${name} ya se encuentra registrado.`,
			});
		}
		const data = {
			name,
			price,
			description,
			categorie,
			user: req.user._id,
		};

		const product = new Product(data);

		await product.save();
		res.status(201).json({ product });
	} catch (error) {
		res.status(500).json({
			msg: "El producto no pudo ser guardado, contacte al administrador",
		});
	}
};

const updateProduct = async (req = request, res = response) => {
	const { id } = req.params;

	const { name, _id, status, user, avaiable, ...rest } = req.body;

	const product = await Product.findByIdAndUpdate(
		id,
		{
			...rest,
			name: name && name.toUpperCase(),
			user: req.user._id,
		},
		{ new: true }
	)
		.populate("user", "name")
		.populate("categorie", "name");

	res.json(product);
};

const deleteProduct = async (req = request, res = response) => {
	const { id } = req.params;

	const product = await Product.findByIdAndUpdate(
		id,
		{
			status: false,
		},
		{ new: true }
	);

	res.json({ product });
};

module.exports = {
	getProducts,
	getProductById,
	newProduct,
	updateProduct,
	deleteProduct,
};
