const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
	const queryParams = req.query;

	res.json({ msg: "PETICION GET - CONTROLADOR" });
};

const putUsers = (req = request, res = response) => {
	const body = req.params;
	res.json({ msg: "PETICION PUT - CONTROLADOR", body });
};

const postUsers = (req = request, res = response) => {
	const body = req.body;

	res.json({ msg: "PETICION POST - CONTROLADOR", body });
};

const patchUsers = (req = request, res = response) => {
	res.json({ msg: "PETICION PATCH - CONTROLADOR" });
};

const deleteUsers = (req = request, res = response) => {
	res.json({ msg: "PETICION DELETE - CONTROLADOR" });
};

module.exports = {
	getUsers,
	putUsers,
	postUsers,
	patchUsers,
	deleteUsers,
};
