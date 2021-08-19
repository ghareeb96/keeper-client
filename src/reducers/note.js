const noteReducer = (notes = null , action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return  [action?.data, ...notes]

        case 'DELETE_NOTE':
            return  notes.filter(note=> note._id !== action.data);

        case 'UPDATE_NOTE':
            return  notes.map(note=> note._id === action.data._id ? action.data : note );

        case 'GET_USER_NOTES':
            return action.data.reverse()

        case 'LOGOUT':
                return notes = null

        default:
            return notes;
    };
}

export default noteReducer;