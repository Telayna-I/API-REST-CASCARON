const { Router } = require("express");
const { check } = require("express-validator");
const {
	uploadFile,
	updateUserImg,
	showImage,
	uploadImageCloudinary,
} = require("../controllers/uploads");
const { validateJWT } = require("../middlewares/validate-JWT");
const { hasAdminRole } = require("../middlewares/validate-Role");
const { validateFields } = require("../middlewares/validate-fields");
const { validateFileUpload } = require("../middlewares/validate-file");
const { allowedCollections } = require("../helpers");

const router = Router();

router.post("/", validateFileUpload, uploadFile);

router.put(
	"/:collection/:id",
	[
		validateFileUpload,
		validateJWT,
		hasAdminRole,
		check("id", "El ID no es un ID valido de Mongo.").isMongoId(),
		check("collection").custom((c) => allowedCollections(c)),
		validateFields,
	],
	uploadImageCloudinary
);

module.exports = router;
