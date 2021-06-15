import {
    combineReducers
} from 'redux';
import auth from './auth';
import notes from './note';


export default combineReducers({
    auth, notes
});