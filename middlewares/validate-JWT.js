const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			msg: "No hay token en la peticion.",
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		const user = await User.findById({ _id: uid });

		if (!user) {
			return res
				.status(401)
				.json({ msg: "Token no valido - usuario no existe en BD" });
		}

		if (!user.status) {
			return res
				.status(401)
				.json({ msg: "Token no valido - usuario con status: false" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ msg: "Token no valido." });
	}
};

module.exports = {
	validateJWT,
};
