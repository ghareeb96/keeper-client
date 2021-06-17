import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000'
})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token }`
    return req; 
})

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)

export const getNotes = () => API.get('/note')
export const createNote = (formData) => API.post('/note/add', formData)
export const deleteNote = (id) => API.delete(`/note/${id}`)