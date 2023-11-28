const { request, response } = require("express");
const { Categorie, Product, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

const searchUsers = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);
	if (isMongoId) {
		const user = await User.findById(term);
		return res.json({
			results: user ? [user] : [],
		});
	}

	const regex = new RegExp(term, "i");

	const [count, users] = await Promise.all([
		User.countDocuments({
			$or: [{ name: regex }, { email: regex }],
			$and: [{ status: true }], // esto lo puedo desactivar si no quiero encontrar solo usarios activos
		}),
		User.find({
			$or: [{ name: regex }, { email: regex }],
			$and: [{ status: true }], // esto lo puedo desactivar si no quiero encontrar solo usarios activos
		}),
	]);

	return res.json({
		count,
		results: users ? [users] : [],
	});
};
const searchProducts = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);
	if (isMongoId) {
		const product = await Product.findById(term).populate(
			"categorie",
			"name"
		);
		return res.json({
			results: product ? [product] : [],
		});
	}

	const regex = new RegExp(term, "i");

	const [count, products] = await Promise.all([
		Product.countDocuments({
			$or: [{ name: regex }],
			$and: [{ status: true }], // esto lo puedo desactivar si no quiero encontrar solo usarios activos
		}),
		Product.find({
			$or: [{ name: regex }],
			$and: [{ status: true }], // esto lo puedo desactivar si no quiero encontrar solo usarios activos
		}).populate("categorie", "name"),
	]);

	return res.json({
		count,
		results: products ? [products] : [],
	});
};

const searchCategories = async (term = "", res = response) => {
	const isMongoId = ObjectId.isValid(term);
	if (isMongoId) {
		const categorie = await Categorie.findById(term);
		return res.json({
			results: categorie ? [categorie] : [],
		});
	}

	const regex = new RegExp(term, "i");

	const [count, categories] = await Promise.all([
		Categorie.countDocuments({ name: regex, status: true }),
		Categorie.find({ name: regex, status: true }),
	]);

	return res.json({
		count,
		results: categories ? [categories] : [],
	});
};

const searchProductsByCategory = async (word = "", res = response) => {
	const isMongoID = ObjectId.isValid(word);

	if (isMongoID) {
		const product = await Product.find({
			category: ObjectId(word),
		}).populate("category", "name");

		return res.json({
			results: product ? [product] : [],
		});
	}

	const regex = new RegExp(word, "i");

	const categories = await Category.find({ name: regex, status: true });

	const products = await Product.find({
		$or: [
			...categories.map((category) => ({
				category: category._id,
			})),
		],
		$and: [{ status: true }],
	}).populate("category", "name");

	res.json({
		results: products,
	});
};

module.exports = {
	searchUsers,
	searchProducts,
	searchCategories,
	searchProductsByCategory,
};
