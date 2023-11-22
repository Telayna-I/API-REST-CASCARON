const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
	const existeRole = await Role.findOne({ role });
	if (!existeRole) {
		throw new Error(
			`El rol ${role} no esta registrado en la base de datos.`
		);
	}
};

const validateEmail = async (email = "") => {
	const emailExist = await User.findOne({ email });
	if (emailExist) {
		throw new Error(`El correo ${email} ya se encuentra registrado`);
	}
};

const validateId = async (id) => {
	const idExist = await User.findById({ _id: id });
	if (!idExist) {
		throw new Error(`El ${id} no se encuentra registrado`);
	}
};

module.exports = {
	isValidRole,
	validateEmail,
	validateId,
};
