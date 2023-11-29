const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFiles = (
	files,
	allowedExtensions = ["png", "jpg", "jpeg", "gif"],
	folder = ""
) => {
	return new Promise((resolve, reject) => {
		const { archivo } = files;

		const nombreCortado = archivo.name.split(".");
		const extension = nombreCortado[nombreCortado.length - 1];

		//Validar la extensiones

		if (!allowedExtensions.includes(extension)) {
			return reject(
				`La extension ${extension} no esta permitida. Las permitidas son : ${allowedExtensions}`
			);
		}

		const tempName = uuidv4() + "." + extension;
		const uploadPath = path.join(
			__dirname,
			"../uploads/",
			folder,
			tempName
		);

		archivo.mv(uploadPath, (err) => {
			if (err) {
				return reject(err);
			}

			resolve(tempName);
		});
	});
};

module.exports = {
	uploadFiles,
};
