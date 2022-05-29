import {
    combineReducers
} from 'redux';
import auth from './auth';
import notes from './note';
import tasks from './task'

export default combineReducers({
    auth, notes,tasks
});