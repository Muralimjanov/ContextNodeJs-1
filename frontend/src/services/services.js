import axios from "axios";

axios.defaults.baseURL = "http://localhost:5557/api/"

//? create users
const registerService = (data) => {
    return axios.post("auth/register", data)
}

const loginService = (data) => {
    return axios.post("auth/login", data)
}

//? create post 
const createTodo = (text, userId) => {
    return axios.post('todo/add', { text, userId }) 
}

const todoGet = (userId) => {
    return axios.get('todo', {
        params: {
            userId: userId
        }
    })
}

const todoRemove = (id) => {
    return axios.delete(`todo/delete/${id}`) 
}

const todoCompleted = (id) => {
    return axios.patch(`todo/completed/${id}`, id)
}

const todoImportant = (id) => {
    return axios.patch(`todo/important/${id}`, id)
}


const services = {
    registerService,
    loginService,
    createTodo,
    todoGet,
    todoRemove,
    todoCompleted,
    todoImportant
}
export default services;