import axios from "axios";

const REST_API = axios.create({
	baseURL: "http://localhost:5010",
	// headers: { token: localStorage.getItem("token") },
});
export default REST_API;