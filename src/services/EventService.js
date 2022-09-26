import axios from "axios";

/*
	axios.create() 
	Creación de una nueva instancia de axios con una configuración personalizada

	Configuración de Petición
	'baseURL': Es conveniente establecer un `baseURL` en una instancia de axios para pasar URLs relativas a los métodos de esta
	`withCredentials` : Indica cuando o no se pueden hacer peticiones cross-site Access-Control usando credenciales - Control de acceso HTTP (CORS)
	`headers` son las cabeceras personalizadas a ser enviadas
		`accept` : anuncia que tipo de contenido el cliente puede procesar,
		`content-type` : indica el media type (en-US) del recurso.
*/
const apiClient = axios.create({
	baseURL: "https://rickandmortyapi.com/api/character",
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

export default {
	getEvents() {
		return apiClient.get("/");
	},
	getEventsPage(page) {
		return apiClient.get("?page=" + page);
	},
	getEvent(id) {
		return apiClient.get("/" + id);
	},
	getEventName(name) {
		return apiClient.get("?name" + name);
	}
};
