import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import {Input, Button} from 'antd'
import LoginFacebook from './LoginFacebook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const SigninComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
              toast.error(data.error)
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/`);
                    } else {
                        Router.push(`/`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
     const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
          <div>
            <form onSubmit={handleSubmit} className='text-center'>
                   <Input
                       value={email}
                       addonBefore='Email'
                       onChange={handleChange('email')}
                       type="email"
                       size="large"
                       placeholder="Type your email"
                       className='m-1 pl-4 pr-4'
                   />
                   <Input
                       value={password}
                       addonBefore='Password'
                       onChange={handleChange('password')}
                       type="password"
                       size="large"
                       placeholder="Type your password"
                      className='m-1 pl-4 pr-4'
                   />
                    <button className='btn btn-md btn-outline-info mt-2'>Sign In</button>
            </form>
          </div>
        );
    };

    return<div>
     <ToastContainer />
             <div>
                 <div>
                    {showLoading()}
                    {showMessage()}
                    <div className='row col justify-content-center mt-3 mb-3'>
                    {/* <div className='col-md-6 text-center pt-2 pb-2'>
                        <LoginGoogle />
                      </div>*/}
                      <div className='col-md-6 text-center pt-2 pb-1'>
                        <LoginFacebook/>
                        <br />
                          <i><b>Or</b></i>
                      </div>
                    </div>

                    {showForm && signinForm()}
                    <Link href="/auth/password/forgot">
                    <a><Button primary type="link" className='ml-2'>Forgot password</Button></a>
                    </Link>
                </div>
            </div>
          </div>
};

export default SigninComponent;
