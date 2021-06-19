import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));



export default function DateAndTimePickers({ timeChangeHandler }) {

    // const date = new Date().toISOString().substr(0, 19)
    
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Remind at"
                type="datetime-local"
                className={classes.textField}
                // defaultValue= {date}
                onChange={timeChangeHandler}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}
