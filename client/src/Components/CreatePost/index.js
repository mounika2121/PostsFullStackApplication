import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import {useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import Header from '../Header'
import './index.css'

const CreatePost = () => {
    const {authState} = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText: "",
    }

    let navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            navigate('/login');
          }
    },[authState.status, navigate])

    const onClickSubmit = (data) => {
        axios.post("http://localhost:3007/Posts", data, {
            headers: { accessToken: localStorage.getItem("accessToken")}
        })
            .then((response)=> {
                navigate("/");
                alert("Post Created Successfully!")
            })
            .catch((error) => {
                console.error("Error creating post:", error);
                alert(error);
            });
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required!"),
        postText: Yup.string().required("Post Text is Required!")
    })

return (
    <>
    <Header />
    <div className='createpost-top-container'>
        <h2 className='create-post-heading'>Create Your Post</h2>
        <Formik initialValues={initialValues} onSubmit={onClickSubmit} validationSchema={validationSchema} >
            <Form className='form-container'>
                <div className='input-container'>
                    <label htmlFor="title">Title:</label><br />
                    <Field className="create-input-post" placeholder="Ex.title" name="title" id="title" />
                    <ErrorMessage name="title" component="span" className='error-msg' />
                </div>
                <div className='input-container'>
                    <label htmlFor='postText'>Post:</label><br />
                    <Field className="create-input-post" placeholder="Ex.post" name="postText" id="postText" />
                    <ErrorMessage name="postText" component="span" className='error-msg' />
                </div>
                <div>
                    <button type="submit" className='login-btn'>Create Post</button>
                </div>
            </Form>
        </Formik>
    </div>
    </>
)
}

export default CreatePost
