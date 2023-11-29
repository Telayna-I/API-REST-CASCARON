const dbValidators = require("./db-validators");
const dbSearchs = require("./db-searchs");
const generateJwt = require("./generate-JWT");
const googleVerify = require("./google-verify");
const uploadFiles = require("./upload-file");

module.exports = {
	...dbValidators,
	...dbSearchs,
	...generateJwt,
	...googleVerify,
	...uploadFiles,
};
