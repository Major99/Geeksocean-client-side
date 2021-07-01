import Link from 'next/link';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate, isAuth } from '../../actions/auth';
import { FB_APP_ID } from '../../config';
import { FaFacebook } from "react-icons/fa";


const LoginFacebook = () => {
    const responseFacebook = response => {
        loginWithFacebook(response).then(data => {
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
        <div className="">
            <FacebookLogin
                cssClass='fb-btn btn'
                appId={`${FB_APP_ID}`}
                fields="name,email,picture"
                callback={responseFacebook}
                icon=<FaFacebook style={{ fontSize: "24px", marginRight:"10px", color:"#4267B2"}}/>
                textButton="Sign in with Facebook"
            />
            <style global jsx>{`
              .fb-btn{
                 box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
              }
            .metro{
               font-size: 12px;
               background-color: white!important;
               padding:9px 13px 9px 13px!important
              }
              button{
               margin:"50px!important"
              }
              .col{
                padding-left:0px!important;
                padding-right:0px!important;
              }
              `}</style>
        </div>
    );
};

export default LoginFacebook;
