import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';
import { Button, Input } from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        preSignup(user).then(data => {
            if (data.error) {
              toast.error(data.error)
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        e.preventDefault()
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} className='text-center'>
                    <Input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        size="large"
                        addonBefore='Name'
                        className='m-1 pl-4 pr-4'
                    />
                    <Input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        size="large"
                        addonBefore='Email'
                        className='m-1 pl-4 pr-4'
                    />
                    <Input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        size="large"
                        addonBefore='Password'
                        className='m-1 pl-4 pr-4'
                    />
                    <button className='btn btn-md btn-outline-info mt-2 mb-2'>Signup</button>
              <style global jsx>{`
               `}</style>
            </form>
        );
    };

    return (
        <>
             <ToastContainer />
            {showLoading()}
            {showMessage()}
            {/*<div className='row col justify-content-center'>
               <div className='col-sm-6'>
               <LoginGoogle />
               </div>
               <div className='col-sm-6'>
               <LoginFacebook />
               </div>
            </div>*/}
              <br />


              {showForm && signupForm()}

        </>
    );
};

export default SignupComponent;
