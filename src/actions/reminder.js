import * as api from '../api';

export const getReminders = () => async (dispatch) => {

    try {
        const {
            data
        } = await api.getReminders();

        dispatch({
            type: 'GET_USER_REMINDERS',
            data
        })

    } catch (error) {
        console.log(error)
    }
}

export const createReminder = (reminderData) => async (dispatch) => {

    try {
        const {
            data
        } = await api.createReminder(reminderData);

        dispatch({
            type: 'CREATE_REMINDER',
            data
        })

    } catch (error) {
        console.log(error)
    }
}


export const deleteReminder = (id) => async (dispatch) => {

    try {
        await api.deleteReminder(id);

        dispatch({
            type: 'DELETE_REMINDER',
            data : id
        })

    } catch (error) {
        console.log(error)
    }
}


export const updateReminder = (id, reminder) => async (dispatch) => {

    try {
        const {data} = await api.updateReminder(id, reminder);

        dispatch({
            type: 'UPDATE_REMINDER',
            data
        })

    } catch (error) {
        console.log(error)
    }
}


