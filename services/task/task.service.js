import axios from "axios";

const baseUrl = "http://192.168.1.3:3000";

export function updateTask(task) {
    return axios.put(`${baseUrl}/tasks/updateTask`, task);
}

export function createTask(task) {
    return axios.post(`${baseUrl}/tasks`, task)
}

export function getEmployees() {
    return axios.get(`${baseUrl}/employees`)
}

export function getTasksByAssignee() {
    return axios.get(`${baseUrl}/tasks/tasksByAssignee`)
}