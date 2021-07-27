import * as api from '../api';

export const signin = (formData) => async (dispatch) => {

    try {
        const {
            data
        } = await api.signin(formData);

        dispatch({
            type: 'AUTH',
            data
        })

    } catch (error) {


        dispatch({
            type: 'AUTH_ERROR',
            data: error.response.data.message
        })



    }
}

export const clearError = () => async (dispatch)=>{
    console.log("reached")
    dispatch({
        type : 'CLEAR_ERROR'
    })
}

export const signup = (formData) => async (dispatch) => {

    try {
        const {
            data
        } = await api.signup(formData);

        dispatch({
            type: 'AUTH',
            data
        })

    } catch (error) {
        dispatch({
            type: 'AUTH_ERROR',
            data: error.response.data.message
        })
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