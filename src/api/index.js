import axios from 'axios';

const API = axios.create({
    // baseURL: 'https://keeper-project.herokuapp.com/'
    baseURL: 'http://localhost:5000'
})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token }`
    return req; 
})

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)
export const updateUser = (id, newUser) => API.patch(`/users/updateUser/${id}`, newUser)
export const changePassword = (id, passwordData) => API.patch(`/users/changePassword/${id}`, passwordData)

export const getNotes = () => API.get('/note')
export const createNote = (formData) => API.post('/note/add', formData)
export const deleteNote = (id) => API.delete(`/note/${id}`)
export const updateNote = (id, newNote) => API.patch(`/note/${id}`, newNote)

export const getTasks = () => API.get('/task')
export const createTask = (formData) => API.post('/task/add', formData)
export const deleteTask = (id) => API.delete(`/task/${id}`)
export const updateTask = (id, newTask) => API.patch(`/task/${id}`, newTask)
export const completeTask = (id, newTask) => API.patch(`/task/complete/${id}`, newTask)