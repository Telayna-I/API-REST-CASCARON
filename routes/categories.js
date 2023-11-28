const { Router } = require("express");
const {
	getCategories,
	newCategorie,
	getCategorieById,
	putCategorie,
	deleteCategorie,
} = require("../controllers/categories");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const {
	validateCategorieById,
	isValidRole,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", getCategories);

router.get(
	"/:id",
	[
		check("id", "No enviaste el ID por params").not().isEmpty(),
		check(
			"id",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		check("id", "La categoria no existe").custom(validateCategorieById),
		validateFields,
	],
	getCategorieById
);

router.post(
	"/",
	[
		validateJWT,
		check("name", "El nombre es requerido").not().isEmpty(),
		validateFields,
	],
	newCategorie
);

router.put(
	"/:id",
	[
		validateJWT,
		check("name", "El nombre es obligatorio.").not().isEmpty(),
		check("id", "No enviaste el ID por params").not().isEmpty(),
		check(
			"id",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		check("id", "La categoria no existe").custom(validateCategorieById),
		validateFields,
	],
	putCategorie
);

router.delete(
	"/:id",
	[
		validateJWT,
		isValidRole,
		check("id", "No enviaste el ID por params").not().isEmpty(),
		check(
			"id",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		check("id", "La categoria no existe").custom(validateCategorieById),
		validateFields,
	],
	deleteCategorie
);

module.exports = router;
