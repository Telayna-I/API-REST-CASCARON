const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login, googleSignIn } = require("../controllers/auth");

const router = Router();

router.post(
	"/login",
	[
		check("email", "El email es obligatorio").not().isEmpty(),
		check("email", "El email no es valido").isEmail(),
		check("password", "El password es obligatorio").not().isEmpty(),
		validateFields,
	],
	login
);

router.post(
	"/google",
	[
		check("id_token", "El ID_TOKEN de google es necesario.")
			.not()
			.isEmpty(),
		validateFields,
	],
	googleSignIn
);

module.exports = router;
