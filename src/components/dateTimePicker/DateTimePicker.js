import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Remind at"
                type="datetime-local"
                className={classes.textField}
                onChange={timeChangeHandler}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}
