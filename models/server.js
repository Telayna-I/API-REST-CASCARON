const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;

		this.paths = {
			auth: "/api/auth",
			categories: "/api/categories",
			products: "/api/products",
			search: "/api/search",
			uploads: "/api/uploads",
			users: "/api/users",
		};

		// Conectar a base de datos
		this.connectDb();

		// Middlewares
		this.middlewares();

		// Rutas de mi aplicacion
		this.routes();
	}

	async connectDb() {
		await dbConection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Lectura y parseo del body
		this.app.use(express.json());
		// Directorio publico
		this.app.use(express.static("public"));

		// Carga de archivos
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				// createParentPath: true // Solo si quiero que cuando suba un archivo cree la carpeta si no existe.
			})
		);
	}

	routes() {
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.categories, require("../routes/categories"));
		this.app.use(this.paths.products, require("../routes/products"));
		this.app.use(this.paths.search, require("../routes/search"));
		this.app.use(this.paths.uploads, require("../routes/uploads"));
		this.app.use(this.paths.users, require("../routes/users"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto " + this.port);
		});
	}
}

module.exports = Server;
