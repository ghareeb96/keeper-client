const noteReducer = (notes = [] , action) => {
    switch (action.type) {
        case 'CREATE':
            return  [...notes, action?.data]

        case 'GET_USER_NOTES':
            return action.data

        default:
            return notes;
    };
}

export default noteReducer;