const reminderReducer = (reminders = [] , action) => {
    switch (action.type) {
        case 'CREATE_REMINDER':
            return  [...reminders, action?.data]

        case 'DELETE_REMINDER':
            return  reminders.filter(reminder=> reminder._id !== action.data);

        case 'UPDATE_REMINDER':
            return  reminders.map(reminder=> reminder._id === action.data._id ? action.data : reminder );

        case 'GET_USER_REMINDERS':
            return action.data

        default:
            return reminders;
    };
}

export default reminderReducer;