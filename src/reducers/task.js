const taskReducer = (tasks = null , action) => {
    switch (action.type) {
        case 'CREATE_TASK':
            return  [action?.data, ...tasks]

        case 'DELETE_TASK':
            return  tasks.filter(task=> task._id !== action.data);

        case 'UPDATE_TASK':
            return  tasks.map(task=> task._id === action.data._id ? action.data : task );

        case 'GET_USER_TASKS':
            return action.data.reverse()

            case 'LOGOUT':
                return tasks = null

        default:
            return tasks;
    };
}

export default taskReducer;