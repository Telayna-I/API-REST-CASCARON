const { request, response } = require("express");
const {
	searchCategories,
	searchProducts,
	searchUsers,
} = require("../helpers/db-searchs");

const allowedCollections = ["categories", "products", "roles", "users"];

const search = async (req = request, res = response) => {
	const { collection, term } = req.params;

	if (!allowedCollections.includes(collection)) {
		res.status(400).json({
			msg: `Las colecciones permitidas son: ${allowedCollections}`,
		});
	}

	switch (collection) {
		case "categories":
			searchCategories(term, res);
			break;

		case "products":
			searchProducts(term, res);
			break;

		case "users":
			searchUsers(term, res);
			break;

		default:
			res.status(500).json({
				msg: "Esta busqueda no esta disponible.",
			});
	}
};

module.exports = {
	search,
};
