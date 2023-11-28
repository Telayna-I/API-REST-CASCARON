const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const {
	validateProductById,
	validateCategorieById,
} = require("../helpers/db-validators");
const {
	getProducts,
	getProductById,
	newProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products");
const { hasAdminRole } = require("../middlewares/validate-Role");

const router = Router();

router.get("/", getProducts);

router.get(
	"/:id",
	[
		check(
			"id",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		check("id", "El producto no existe").custom(validateProductById),
		validateFields,
	],
	getProductById
);

router.post(
	"/",
	[
		validateJWT,
		check("name", "El nombre es requerido").not().isEmpty(),
		check("categorie", "La categoria requerida").not().isEmpty(),
		check("categorie", "La categoria no existe").custom(
			validateCategorieById
		),
		check(
			"categorie",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		validateFields,
	],
	newProduct
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id", "No enviaste el ID por params").not().isEmpty(),
		check(
			"id",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		check("id", "El producto no existe").custom(validateProductById),
		validateFields,
	],
	updateProduct
);

router.delete(
	"/:id",
	[
		validateJWT,
		hasAdminRole,
		check("id", "No enviaste el ID por params").not().isEmpty(),
		check(
			"id",
			"El id proporcionado no es un id de mongo valido"
		).isMongoId(),
		check("id", "El producto no existe").custom(validateProductById),
		validateFields,
	],
	deleteProduct
);

module.exports = router;
