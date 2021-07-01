import Head from 'next/head';
import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';


const Privacy = ({ router }) => {

  const head = () => (
      <Head>
          <title>Privacy Policy |{APP_NAME}</title>
          <meta
              name="description"
              content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
          />
          <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
          <meta property="og:title" content={`Privacy Policy| ${APP_NAME}`} />
          <meta
              property="og:description"
              content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
          <meta property="og:site_name" content={`${APP_NAME}`} />

          <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
          <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
  );


  return <>
  {head()}
    <Layout>
    <div className='container'>
    <h2>Privacy Policy</h2>
    <p>Your privacy is important to us. It is Geeksocean.com pvt ltd's policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://geeksocean.com">https://geeksocean.com</a>, and other sites we own and operate.</p>
    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
    <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
    <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
    <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
    <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
    <p>This policy is effective as of 27 March 2020.</p>
   </div>

    </Layout>
       </>
     }


export default withRouter(Privacy);
