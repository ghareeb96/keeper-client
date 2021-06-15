import * as api from '../api';

export const createNote = (noteData) => async (dispatch) => {

    try {
        const {
            data
        } = await api.createNote(noteData);

        dispatch({
            type: 'CREATE',
            data
        })

    } catch (error) {
        console.log(error)
    }
}

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
