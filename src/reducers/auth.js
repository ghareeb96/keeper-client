const authReducer = (state = { authData: null , authError : null}, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data }

        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null };

        case 'AUTH_ERROR':
            return {...state, authError : action?.data }

        case 'CLEAR_ERROR':
            return {...state, authError : null }

        case 'UPDATE_USER':
            const user = JSON.parse(localStorage.getItem('profile'))
            localStorage.setItem('profile', JSON.stringify({...user, result : action?.data}))
            return { ...state, authData: {...user, result : action?.data} }


        default:
            return state;
    };
}

export default authReducer;