import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../Header';
import './index.css'

const Registration = () => {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Username is Required!"),
        password: Yup.string().min(3).max(15).required("Password is Required!")
    });

    const onClickSubmit = (data) => {
        axios.post("http://localhost:3007/auth", data).then(() => {
            console.log(data);
        })
    };

    return(
        <> 
            <Header />
            <div className='createpost-top-container'>
                <h1 className='create-post-heading'>Registration</h1>
                <Formik initialValues={initialValues} onSubmit={onClickSubmit} validationSchema={validationSchema} >
                    <Form className='registration-containner'>
                    <div className='input-container'>
                        <label htmlFor='username'>UserName:</label><br />
                        <Field className="create-input-post" placeholder="Ex.ram" name="username" id="username" />
                        <ErrorMessage name="username" component="span" className='error-msg' />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='username'>Password:</label><br />
                        <Field className="create-input-post" placeholder="Your password..." name="password" id="password" type="password" />
                        <ErrorMessage name="password" component="span" className='error-msg' />
                    </div>
                    <div>
                        <button type="submit" className='login-btn'>Register</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </>
    )
}

export default Registration;