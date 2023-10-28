import axios from "axios";

const baseUrl = "http://192.168.1.3:3000";

export function sendMessage(message) {
    return axios.post(`${baseUrl}/messages`, message);
}

