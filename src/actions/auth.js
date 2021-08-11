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

// export const changeTheme = (id, user) => async (dispatch) => {
//     try {
//         const {
//             data
//         } = await api.changeTheme(id,user);

//         dispatch({
//             type: 'UPDATE_THEME',
//             data
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }