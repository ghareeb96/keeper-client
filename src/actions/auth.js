import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {

    try {
        const {
            data
        } = await api.signin(formData);

        dispatch({
            type: 'AUTH',
            data
        })

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {

    try {
        const {
            data
        } = await api.signup(formData);

        dispatch({
            type: 'AUTH',
            data
        })

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const updatePicture = (id, newUser) => async (dispatch) => {

    try {
        const {
            data
        } = await api.updatePicture(id, newUser);

        dispatch({
            type: 'UPDATE_PICTURE',
            data
        })

    } catch (error) {
        console.log(error)
    }
}