const { Schema, model, SchemaTypes } = require("mongoose");

const productSchema = Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio"],
		unique: true,
	},
	status: {
		type: Boolean,
		default: true,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	price: {
		type: Number,
		default: 0,
	},
	categorie: {
		type: SchemaTypes.ObjectId,
		ref: "Categorie",
		required: true,
	},
	description: {
		type: String,
	},
	img: {
		type: String,
	},
	available: { type: Boolean, default: true },
});

productSchema.methods.toJSON = function () {
	const { __v, _id, status, ...product } = this.toObject();

	return product;
};
module.exports = model("Product", productSchema);
