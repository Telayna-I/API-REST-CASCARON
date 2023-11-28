const { Schema, model } = require("mongoose");

const categorieSchema = Schema({
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
});

categorieSchema.methods.toJSON = function () {
	const { __v, _id, status, ...categorie } = this.toObject();

	return categorie;
};
module.exports = model("Categorie", categorieSchema);
