const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login } = require("../controllers/auth");

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
// router.put("/", getUsers);
// router.patch("/", getUsers);
// router.delete("/", getUsers);

module.exports = router;
