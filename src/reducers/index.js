import {
    combineReducers
} from 'redux';
import auth from './auth';
import notes from './note';
import reminders from './reminder';


export default combineReducers({
    auth, notes, reminders
});