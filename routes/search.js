const { Router } = require("express");
const { search } = require("../controllers/search");
const { check } = require("express-validator");

const router = Router();

router.get("/:collection/:term", search);

module.exports = router;
