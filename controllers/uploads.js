const { request, response } = require("express");
const { uploadFiles } = require("../helpers");
const { User, Product } = require("../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (req = request, res = response) => {
	try {
		const fullPath = await uploadFiles(req.files, ["txt", "md", "jpg"]);
		// Solo si quiero que cuando suba un archivo cree la carpeta si no existe.

		// const fullPath = await uploadFiles(req.files, ["txt", "md", "jpg"] , 'imgs');

		res.json({ name: fullPath });
	} catch (error) {
		res.status(400).json({ msg: error });
	}
};

const uploadImageCloudinary = async (req = request, res = response) => {
	const { id, collection } = req.params;

	let modelo;

	switch (collection) {
		case "users":
			modelo = await User.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`,
				});
			}
			break;

		case "products":
			modelo = await Product.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({ msg: "No valide esto" });
			break;
	}

	if (modelo.img) {
		const imgArr = modelo.img.split("/");
		const name = imgArr[imgArr.length - 1];

		const [public_id] = name.split(".");

		await cloudinary.uploader.destroy(public_id);
	}

	const { tempFilePath } = req.files.archivo;

	const resp = await cloudinary.uploader.upload(tempFilePath);

	const { secure_url } = resp;

	modelo.img = secure_url;

	await modelo.save();

	res.json({ resp });
};

module.exports = {
	uploadFile,
	uploadImageCloudinary,
};
