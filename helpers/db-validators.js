const { Categorie, User, Role, Product } = require("../models");

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

const validateCategorie = async (name) => {
	const categorieExist = await Categorie.findOne({ name });
	if (!categorieExist) {
		throw new Error(`La categoria ${name} no se encuentra registrado`);
	}
};

const validateCategorieById = async (id) => {
	const categorieExist = await Categorie.findById({ _id: id });
	if (!categorieExist) {
		throw new Error(`La categoria no se encuentra registrada`);
	}
};

const validateProductById = async (id) => {
	const productExist = await Product.findById({ _id: id });
	if (!productExist) {
		throw new Error(`El producto no se encuentra registrado`);
	}
};

module.exports = {
	isValidRole,
	validateEmail,
	validateId,
	validateCategorie,
	validateCategorieById,
	validateProductById,
};
