const { Router } = require("express");
const { search } = require("../controllers/search");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { hasAdminRole } = require("../middlewares/validate-Role");

const router = Router();

router.get(
	"/:collection/:term",
	[validateJWT, hasAdminRole, validateFields],
	search
);

module.exports = router;
