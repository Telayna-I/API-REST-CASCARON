const { response, request } = require("express");
const { Categorie } = require("../models");

const getCategories = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;

	const [total, categories] = await Promise.all([
		Categorie.countDocuments({ status: true }),
		Categorie.find({ status: true })
			.populate("user", "name")
			.skip(Number(from))
			.limit(Number(limit)),
	]);

	res.json({ total, categories });
};

const getCategorieById = async (req = request, res = response) => {
	const { id } = req.params;

	const categorie = await Categorie.findById({
		_id: id,
	}).populate("user", "name");
	res.json({ categorie });
};

const newCategorie = async (req = request, res = response) => {
	const name = req.body.name.toUpperCase();

	try {
		const categorieDB = await Categorie.findOne({ name });
		if (categorieDB) {
			return res.status(401).json({
				msg: `La categoria ${name} ya se encuentra registrada.`,
			});
		}
		const data = {
			name,
			user: req.user._id,
		};

		const categorie = new Categorie(data);

		await categorie.save();
		res.status(201).json({ categorie });
	} catch (error) {
		res.status(500).json({
			msg: "La categoria no pudo ser guardada, contacte al administrador",
		});
	}
};

const putCategorie = async (req = request, res = response) => {
	const { id } = req.params;

	const name = req.body.name.toUpperCase();

	console.log(name);

	const categorie = await Categorie.findByIdAndUpdate(
		id,
		{
			name: name.toUpperCase(),
			user: req.user._id,
		},
		{ new: true }
	).populate("user", "name");

	res.json(categorie);
};

const deleteCategorie = async (req = request, res = response) => {
	const { id } = req.params;

	const categorie = await Categorie.findByIdAndUpdate(
		id,
		{
			status: false,
		},
		{ new: true }
	).populate("user", "name");

	res.json(categorie);
};

module.exports = {
	getCategories,
	getCategorieById,
	newCategorie,
	putCategorie,
	deleteCategorie,
};
