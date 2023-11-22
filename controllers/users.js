const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;

	// Forma mas lenta de pedir los datos

	// const users = await User.find({ status: true })
	// 	.skip(Number(from))
	// 	.limit(Number(limit));

	// const total = await User.countDocuments({ status: true });

	// Lanzar las promesas juntas para que no se haga cola y tarde mas.

	const [total, users] = await Promise.all([
		User.countDocuments({ status: true }),
		User.find({ status: true }).skip(Number(from)).limit(Number(limit)),
	]);

	res.json({ total, users });
};

const putUsers = async (req = request, res = response) => {
	const { id } = req.params;

	const { _id, role, password, google, email, ...rest } = req.body;

	if (password) {
		const salt = bcryptjs.genSaltSync(10);
		rest.password = bcryptjs.hashSync(password, salt);
	}

	const user = await User.findByIdAndUpdate(id, rest);

	res.json({ msg: "PETICION PUT - CONTROLADOR", user });
};

const postUsers = async (req = request, res = response) => {
	const { name, email, password, role } = req.body;
	const user = new User({ name, email, password, role });

	// Encriptar
	const salt = bcryptjs.genSaltSync(10);
	user.password = bcryptjs.hashSync(password, salt);
	// Guardar en DB
	await user.save();

	res.json({ msg: "PETICION POST - CONTROLADOR", user });
};

const patchUsers = (req = request, res = response) => {
	res.json({ msg: "PETICION PATCH - CONTROLADOR" });
};

const deleteUsers = async (req = request, res = response) => {
	const { id } = req.params;

	const user = await User.findByIdAndUpdate(id, { status: false });

	res.json({ msg: "PETICION DELETE - CONTROLADOR", user });
};

module.exports = {
	getUsers,
	putUsers,
	postUsers,
	patchUsers,
	deleteUsers,
};
