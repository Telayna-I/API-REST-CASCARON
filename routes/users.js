const { Router } = require("express");
const {
	getUsers,
	putUsers,
	postUsers,
	patchUsers,
	deleteUsers,
} = require("../controllers/users");

const { check } = require("express-validator");

const { validateFields } = require("./middlewares/validate-fields");

const {
	isValidRole,
	validateEmail,
	validateId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsers);

router.put(
	"/:id",
	[
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateId),
		validateFields,
	],
	putUsers
);

router.post(
	"/",
	[
		check("name", "El nombre es requerido").not().isEmpty(),
		check("email", "El email no es valido").isEmail(),
		check("email").custom(validateEmail),
		check(
			"password",
			"El password debe tener mas de 6 caracteres"
		).isLength({ min: 6 }),
		// check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("role").custom(isValidRole),
	],
	validateFields,
	postUsers
);

router.patch("/", patchUsers);

router.delete(
	"/:id",
	[
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateId),
		validateFields,
	],
	deleteUsers
);

module.exports = router;
