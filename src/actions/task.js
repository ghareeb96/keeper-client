import * as api from '../api';

export const getTasks = () => async (dispatch) => {

    try {
        const {
            data
        } = await api.getTasks();

        dispatch({
            type: 'GET_USER_TASKS',
            data
        })

    } catch (error) {
        console.log(error)
    }
}

export const createTask = (taskData) => async (dispatch) => {

    try {
        const {
            data
        } = await api.createTask(taskData);

        dispatch({
            type: 'CREATE_TASK',
            data
        })

    } catch (error) {
        console.log(error)
    }
}


export const deleteTask = (id) => async (dispatch) => {

    try {
        await api.deleteTask(id);

        dispatch({
            type: 'DELETE_TASK',
            data : id
        })

    } catch (error) {
        console.log(error)
    }
}


export const updateTask = (id, task) => async (dispatch) => {

    try {
        const {data} = await api.updateTask(id, task);

        dispatch({
            type: 'UPDATE_TASK',
            data
        })

    } catch (error) {
        console.log(error)
    }
}


