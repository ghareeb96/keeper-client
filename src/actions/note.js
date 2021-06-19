import * as api from '../api';

export const getNotes = () => async (dispatch) => {

    try {
        const {
            data
        } = await api.getNotes();

        dispatch({
            type: 'GET_USER_NOTES',
            data
        })

    } catch (error) {
        console.log(error)
    }
}

export const createNote = (noteData) => async (dispatch) => {

    try {
        const {
            data
        } = await api.createNote(noteData);

        dispatch({
            type: 'CREATE_NOTE',
            data
        })

    } catch (error) {
        console.log(error)
    }
}


export const deleteNote = (id) => async (dispatch) => {

    try {
        await api.deleteNote(id);

        dispatch({
            type: 'DELETE_NOTE',
            data : id
        })

    } catch (error) {
        console.log(error)
    }
}


export const updateNote = (id, note) => async (dispatch) => {

    try {
        const {data} = await api.updateNote(id, note);

        dispatch({
            type: 'UPDATE_NOTE',
            data
        })

    } catch (error) {
        console.log(error)
    }
}


