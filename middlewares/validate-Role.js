const { request, response } = require("express");

const hasAdminRole = (req = request, res = response, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: "Se quiere verificar el rol sin validar el token primero",
		});
	}
	if (req.user.role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: "No tienes permisos para esa operacion.",
		});
	}
	next();
};

// Este middleware es un poco opcional || Yo solo dejaria que el usuario administrador elimine a otros usuarios.

const hasRole = (...roles) => {
	return (req = request, res = response, next) => {
		if (!req.user) {
			return res.status(500).json({
				msg: "Se quiere verificar el rol sin validar el token primero",
			});
		}

		if (!roles.includes(req.user.role)) {
			return res.status(401).json({
				msg: `El servicio requiere uno de estos roles ${roles}`,
			});
		}
		next();
	};
};

module.exports = {
	hasAdminRole,
	hasRole,
};
