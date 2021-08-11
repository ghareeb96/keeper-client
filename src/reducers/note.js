const noteReducer = (notes = [] , action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return  [...notes, action?.data]

        case 'DELETE_NOTE':
            return  notes.filter(note=> note._id !== action.data);

        case 'UPDATE_NOTE':
            return  notes.map(note=> note._id === action.data._id ? action.data : note );

        case 'GET_USER_NOTES':
            return action.data

        case 'LOGOUT':
                console.log('reached')
                return notes = []

        default:
            return notes;
    };
}

export default noteReducer;