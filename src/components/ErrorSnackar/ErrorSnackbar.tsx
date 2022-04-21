import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {AppThunk, useAppSelector} from '../../store/store';
import {useDispatch} from 'react-redux';
import {setAppErrorMessageAC} from '../../store/reducers/app/appReducer';
import {Dispatch} from 'redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar =() => {
    const errorMessage = useAppSelector(state => state.app.errorMessage)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorMessageAC(null))
    };

    return (
            <Snackbar open={errorMessage !== null} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
    );
}
