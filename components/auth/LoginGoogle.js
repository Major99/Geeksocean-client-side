import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';


const LoginGoogle = () => {
    const responseGoogle = response => {
        const tokenId = response.tokenId;
        const user = { tokenId };
        loginWithGoogle(user).then(data => {
            if (data.error) {
                console.log(data.error);
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

    return (
          <>
            <GoogleLogin
                className='google-btn'
                clientId={`${GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
            <style global jsx>{`
           .google-btn{
               
           }
              `}</style>
        </>
    );
};

export default LoginGoogle;
