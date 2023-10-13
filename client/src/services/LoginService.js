import axios from "axios";

const BASE = "http://192.168.0.9:8080/api/login";

class LoginService {
    login(userData) {
        return axios.post(BASE, userData);
    }
}

export default new LoginService;