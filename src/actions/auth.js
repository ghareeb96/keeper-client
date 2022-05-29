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

export const clearError = () => async (dispatch) => {
    dispatch({
        type: 'CLEAR_ERROR'
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

export const updateUser = (id, newUser) => async (dispatch) => {

    try {
        const {
            data
        } = await api.updateUser(id, newUser);
        dispatch({
            type: 'UPDATE_USER',
            data
        })

    } catch (error) {
        console.log(error)
    }
}

export const changePassword = (id, passwordData) => async (dispatch) => {

    try {
        const { data } =  await api.changePassword(id, passwordData);
       
            dispatch({
                type: 'PASSWORD_CHANGED',
                data
            })
            
        


    } catch (error) {

        dispatch({
            type: 'PASSWORD_CHANGE_ERROR',
            data: error.response.data.message
        })    
    }
}

export const googleAuth = (formData) => async (dispatch) => {
    try {
        const {
            data
        } = await api.signin(formData);


        dispatch({
            type: 'AUTH',
            data
        })

    } catch (error) {
        if (error.response.status === 404) {
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
        } else {
            dispatch({
                type: 'AUTH_ERROR',
                data: error.response.data.message
            })
        }
    }
}