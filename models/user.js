const { Schema, model } = require("mongoose");

const userSchema = Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio."],
	},
	email: {
		type: String,
		required: [true, "El correo es obligatorio."],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La contrasña es obligatoria."],
	},
	img: {
		type: String,
	},
	role: {
		required: true,
		type: String,
		emun: {
			values: ["ADMIN_ROLE", "USER_ROLE"],
			message: "{VALUE} no definido",
		},
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

userSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

module.exports = model("User", userSchema);
