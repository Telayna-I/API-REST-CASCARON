const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
	const { id_token } = req.body;

	try {
		const { name, img, email } = await googleVerify(id_token);

		let user = await User.findOne({ email });

		if (!user) {
			// Crearlo
			const data = {
				name,
				email,
				password: "asd",
				img,
				google: true,
				role: "USER_ROLE",
			};
			user = new User(data);

			await user.save();
		}

		// El usuario esta en base de datos pero el status esta en false.
		if (!user.status) {
			return res
				.status(401)
				.json({ msg: "Hable con el administrador, usuario bloqueado" });
		}

		// Generar JWT

		const token = await generateJWT(user.id);

		res.json({ user, token });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msg: "El token no se pudo verificar.",
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
