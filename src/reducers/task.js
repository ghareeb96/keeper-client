const taskReducer = (tasks = [] , action) => {
    switch (action.type) {
        case 'CREATE_TASK':
            return  [...tasks, action?.data]

        case 'DELETE_TASK':
            return  tasks.filter(task=> task._id !== action.data);

        case 'UPDATE_TASK':
            return  tasks.map(task=> task._id === action.data._id ? action.data : task );

        case 'GET_USER_TASKS':
            return action.data

        default:
            return tasks;
    };
}

export default taskReducer;