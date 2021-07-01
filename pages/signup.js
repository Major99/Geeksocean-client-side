import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';

const Signup = ({ router }) => {

    const head = () => (
        <Head>
            <title>Create Account |{APP_NAME}</title>
            <meta
                name="description"
                content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
            />
            <link rel="canonical" href={`${DOMAIN}`} />
            <meta property="og:title" content={`Latest tech articles | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/home-logo.svg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/home-logo.svg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );



    return (
        <Layout>
        {head()}
        <div className='row col justify-content-center'>
           <div className='col-md-6 shadow mt-5   sign'>
             <h1 className='text-center'>Create account</h1>
                        <SignupComponent />
                        </div>
                        <style jsx>{`
                          .sign{
                            margin-bottom:200px;
                          }
                          `}</style>
                    </div>
        </Layout>
    );
};

export default withRouter(Signup);
