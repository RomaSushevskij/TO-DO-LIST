import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import {useFormik} from 'formik';
import style from './Login.module.css';
import {LoginPayloadDataType} from '../../api/todolist-api';
import {useDispatch} from 'react-redux';
import {login} from '../../store/reducers/auth/authReducer';
import {useAppSelector} from '../../store/store';
import {Navigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        } as Omit<LoginPayloadDataType, 'captcha'>,
        onSubmit: (values: Omit<LoginPayloadDataType, 'captcha'>) => {
            dispatch(login(values))
            formik.resetForm()
        },
        validate: (values: Omit<LoginPayloadDataType, 'captcha'>) => {
            const errors: Partial<Omit<LoginPayloadDataType, 'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Field is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Field is required';
            } else if (values.password.length < 3) {
                errors.password = 'The password field must be at least 3 characters'
            }
            return errors;
        }
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <Grid container justifyContent={'center'} style={{minHeight: 'calc(100vh - 75px'}}>
            <Grid item>
                <Paper style={{backgroundColor: '#EBECF0', padding:' 20px'}}>
                    <form onSubmit={formik.handleSubmit} >
                        <FormControl>
                            <FormLabel>
                                <p>
                                    To log in get registered
                                    <a href={'https://social-network.samuraijs.com/'}
                                       target={'_blank'}> here <br/>
                                    </a>

                                    or use common test account credentials:
                                </p>
                                Email: <b>free@samuraijs.com</b><br/>
                                Password: <b>free</b><br/>
                            </FormLabel>
                            <FormGroup>
                                <div className={style.fieldWrapper}>
                                    <TextField label={'Email'}
                                               margin={'normal'}
                                               {...formik.getFieldProps('email')}/>
                                    {formik.errors.email && formik.touched.email &&
                                    <div className={style.messageError}>{formik.errors.email}</div>}
                                </div>
                                <div className={style.fieldWrapper}>
                                    <TextField label={'Password'}
                                               type={'password'}
                                               margin={'normal'}
                                               {...formik.getFieldProps('password')}/>
                                    {formik.errors.password && formik.touched.password &&
                                    <div className={style.messageError}>{formik.errors.password}</div>}
                                </div>
                                <FormControlLabel label={'Remember me'}
                                                  control={
                                                      <Checkbox {...formik.getFieldProps('rememberMe')}/>}
                                                  style={{marginBottom: '20px'}}/>
                                <Button variant={'contained'} type={'submit'}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}
