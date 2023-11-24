const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		// Verificar si el email existe
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				msg: "Usuario / Password no son correctos - email",
			});
		}
		// Verificar si el usuario esta activo
		if (!user.status) {
			return res.status(400).json({
				msg: "Usuario / Password no son correctos - status: false",
			});
		}
		// Verificar la contrasena
		// Compara si la contrasena que viene en el req es la misma que la de la bd
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: "Usuario / Password no son correctos - password",
			});
		}

		// Generar JWT
		const token = await generateJWT(user.id);

		res.json({ msg: "PUT llego al controlador !", user, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Hable con el administrador.😒" });
	}
};

module.exports = {
	login,
};
